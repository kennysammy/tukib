const Book = require('../models/Book');
const Category = require('../models/Category');
const User = require('../models/User');

// @desc    Get all books with filtering, sorting, and pagination
// @route   GET /api/books
// @access  Public
exports.getBooks = async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 12;
    const skip = (page - 1) * limit;

    // Build query
    let query = {};

    // Filter by category
    if (req.query.category) {
      query.category = req.query.category;
    }

    // Filter by author
    if (req.query.author) {
      query.author = { $regex: req.query.author, $options: 'i' };
    }

    // Search
    if (req.query.search) {
      query.$or = [
        { title: { $regex: req.query.search, $options: 'i' } },
        { author: { $regex: req.query.search, $options: 'i' } },
        { description: { $regex: req.query.search, $options: 'i' } }
      ];
    }

    // Filter by featured
    if (req.query.featured === 'true') {
      query.isFeatured = true;
    }

    // Sorting
    let sort = {};
    if (req.query.sort) {
      const sortFields = req.query.sort.split(',');
      sortFields.forEach(field => {
        if (field.startsWith('-')) {
          sort[field.substring(1)] = -1;
        } else {
          sort[field] = 1;
        }
      });
    } else {
      sort.createdAt = -1; // Default sort by newest
    }

    const books = await Book.find(query)
      .populate('category', 'name slug color')
      .populate('createdBy', 'name')
      .sort(sort)
      .limit(limit)
      .skip(skip);

    const total = await Book.countDocuments(query);

    res.status(200).json({
      success: true,
      count: books.length,
      total,
      pages: Math.ceil(total / limit),
      currentPage: page,
      data: books
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

// @desc    Get single book
// @route   GET /api/books/:id
// @access  Public
exports.getBook = async (req, res) => {
  try {
    const book = await Book.findById(req.params.id)
      .populate('category', 'name slug color')
      .populate('createdBy', 'name avatar')
      .populate('reviews.user', 'name avatar');

    if (!book) {
      return res.status(404).json({
        success: false,
        message: 'Book not found'
      });
    }

    // Increment views
    book.views += 1;
    await book.save();

    res.status(200).json({
      success: true,
      data: book
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

// @desc    Create new book
// @route   POST /api/books
// @access  Private/Admin
exports.createBook = async (req, res) => {
  try {
    req.body.createdBy = req.user.id;

    const book = await Book.create(req.body);

    // Update category books count
    await Category.findByIdAndUpdate(book.category, {
      $inc: { booksCount: 1 }
    });

    res.status(201).json({
      success: true,
      data: book
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

// @desc    Update book
// @route   PUT /api/books/:id
// @access  Private/Admin
exports.updateBook = async (req, res) => {
  try {
    let book = await Book.findById(req.params.id);

    if (!book) {
      return res.status(404).json({
        success: false,
        message: 'Book not found'
      });
    }

    // Update category count if category changed
    if (req.body.category && req.body.category !== book.category.toString()) {
      await Category.findByIdAndUpdate(book.category, {
        $inc: { booksCount: -1 }
      });
      await Category.findByIdAndUpdate(req.body.category, {
        $inc: { booksCount: 1 }
      });
    }

    book = await Book.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true
    });

    res.status(200).json({
      success: true,
      data: book
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

// @desc    Delete book
// @route   DELETE /api/books/:id
// @access  Private/Admin
exports.deleteBook = async (req, res) => {
  try {
    const book = await Book.findById(req.params.id);

    if (!book) {
      return res.status(404).json({
        success: false,
        message: 'Book not found'
      });
    }

    // Update category count
    await Category.findByIdAndUpdate(book.category, {
      $inc: { booksCount: -1 }
    });

    await book.deleteOne();

    res.status(200).json({
      success: true,
      message: 'Book deleted successfully'
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

// @desc    Add review to book
// @route   POST /api/books/:id/reviews
// @access  Private
exports.addReview = async (req, res) => {
  try {
    const { rating, comment } = req.body;

    const book = await Book.findById(req.params.id);

    if (!book) {
      return res.status(404).json({
        success: false,
        message: 'Book not found'
      });
    }

    // Check if user already reviewed
    const alreadyReviewed = book.reviews.find(
      r => r.user.toString() === req.user.id
    );

    if (alreadyReviewed) {
      return res.status(400).json({
        success: false,
        message: 'You have already reviewed this book'
      });
    }

    const review = {
      user: req.user.id,
      rating: Number(rating),
      comment
    };

    book.reviews.push(review);
    book.calculateAverageRating();

    await book.save();

    res.status(201).json({
      success: true,
      message: 'Review added successfully',
      data: book
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

// @desc    Download book
// @route   GET /api/books/:id/download
// @access  Private
exports.downloadBook = async (req, res) => {
  try {
    const book = await Book.findById(req.params.id);

    if (!book) {
      return res.status(404).json({
        success: false,
        message: 'Book not found'
      });
    }

    // Increment downloads
    book.downloads += 1;
    await book.save();

    // Add to user's download history
    await User.findByIdAndUpdate(req.user.id, {
      $push: {
        downloads: {
          book: book._id,
          downloadedAt: Date.now()
        }
      }
    });

    res.status(200).json({
      success: true,
      data: {
        fileUrl: book.fileUrl,
        fileName: `${book.title}.${book.fileFormat.toLowerCase()}`
      }
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

// @desc    Get related books
// @route   GET /api/books/:id/related
// @access  Public
exports.getRelatedBooks = async (req, res) => {
  try {
    const book = await Book.findById(req.params.id);

    if (!book) {
      return res.status(404).json({
        success: false,
        message: 'Book not found'
      });
    }

    const relatedBooks = await Book.find({
      _id: { $ne: book._id },
      category: book.category
    })
      .populate('category', 'name slug color')
      .limit(6)
      .sort('-ratings.average');

    res.status(200).json({
      success: true,
      data: relatedBooks
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};
