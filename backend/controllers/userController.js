const User = require('../models/User');

// @desc    Get all users
// @route   GET /api/users
// @access  Private/Admin
exports.getUsers = async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 20;
    const skip = (page - 1) * limit;

    const users = await User.find()
      .select('-password')
      .limit(limit)
      .skip(skip)
      .sort('-createdAt');

    const total = await User.countDocuments();

    res.status(200).json({
      success: true,
      count: users.length,
      total,
      pages: Math.ceil(total / limit),
      currentPage: page,
      data: users
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

// @desc    Get single user
// @route   GET /api/users/:id
// @access  Private/Admin
exports.getUser = async (req, res) => {
  try {
    const user = await User.findById(req.params.id)
      .select('-password')
      .populate('favoriteBooks')
      .populate('readingHistory.book')
      .populate('downloads.book');

    if (!user) {
      return res.status(404).json({
        success: false,
        message: 'User not found'
      });
    }

    res.status(200).json({
      success: true,
      data: user
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

// @desc    Update user
// @route   PUT /api/users/:id
// @access  Private/Admin
exports.updateUser = async (req, res) => {
  try {
    const user = await User.findByIdAndUpdate(
      req.params.id,
      req.body,
      {
        new: true,
        runValidators: true
      }
    ).select('-password');

    if (!user) {
      return res.status(404).json({
        success: false,
        message: 'User not found'
      });
    }

    res.status(200).json({
      success: true,
      data: user
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

// @desc    Delete user
// @route   DELETE /api/users/:id
// @access  Private/Admin
exports.deleteUser = async (req, res) => {
  try {
    const user = await User.findById(req.params.id);

    if (!user) {
      return res.status(404).json({
        success: false,
        message: 'User not found'
      });
    }

    await user.deleteOne();

    res.status(200).json({
      success: true,
      message: 'User deleted successfully'
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

// @desc    Add book to favorites
// @route   POST /api/users/favorites/:bookId
// @access  Private
exports.addToFavorites = async (req, res) => {
  try {
    const user = await User.findById(req.user.id);

    if (user.favoriteBooks.includes(req.params.bookId)) {
      return res.status(400).json({
        success: false,
        message: 'Book already in favorites'
      });
    }

    user.favoriteBooks.push(req.params.bookId);
    await user.save();

    res.status(200).json({
      success: true,
      message: 'Book added to favorites',
      data: user.favoriteBooks
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

// @desc    Remove book from favorites
// @route   DELETE /api/users/favorites/:bookId
// @access  Private
exports.removeFromFavorites = async (req, res) => {
  try {
    const user = await User.findById(req.user.id);

    user.favoriteBooks = user.favoriteBooks.filter(
      bookId => bookId.toString() !== req.params.bookId
    );
    await user.save();

    res.status(200).json({
      success: true,
      message: 'Book removed from favorites',
      data: user.favoriteBooks
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

// @desc    Update reading progress
// @route   PUT /api/users/reading-history/:bookId
// @access  Private
exports.updateReadingProgress = async (req, res) => {
  try {
    const { progress } = req.body;
    const user = await User.findById(req.user.id);

    const existingHistory = user.readingHistory.find(
      h => h.book.toString() === req.params.bookId
    );

    if (existingHistory) {
      existingHistory.progress = progress;
      existingHistory.lastRead = Date.now();
    } else {
      user.readingHistory.push({
        book: req.params.bookId,
        progress,
        lastRead: Date.now()
      });
    }

    await user.save();

    res.status(200).json({
      success: true,
      message: 'Reading progress updated',
      data: user.readingHistory
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};
