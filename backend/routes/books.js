const express = require('express');
const router = express.Router();
const {
  getBooks,
  getBook,
  createBook,
  updateBook,
  deleteBook,
  addReview,
  downloadBook,
  getRelatedBooks
} = require('../controllers/bookController');
const { protect, authorize } = require('../middleware/auth');

router.route('/')
  .get(getBooks)
  .post(protect, authorize('admin'), createBook);

router.route('/:id')
  .get(getBook)
  .put(protect, authorize('admin'), updateBook)
  .delete(protect, authorize('admin'), deleteBook);

router.post('/:id/reviews', protect, addReview);
router.get('/:id/download', protect, downloadBook);
router.get('/:id/related', getRelatedBooks);

module.exports = router;
