const express = require('express');
const router = express.Router();
const {
  getUsers,
  getUser,
  updateUser,
  deleteUser,
  addToFavorites,
  removeFromFavorites,
  updateReadingProgress
} = require('../controllers/userController');
const { protect, authorize } = require('../middleware/auth');

// Admin routes
router.route('/')
  .get(protect, authorize('admin'), getUsers);

router.route('/:id')
  .get(protect, authorize('admin'), getUser)
  .put(protect, authorize('admin'), updateUser)
  .delete(protect, authorize('admin'), deleteUser);

// User routes
router.post('/favorites/:bookId', protect, addToFavorites);
router.delete('/favorites/:bookId', protect, removeFromFavorites);
router.put('/reading-history/:bookId', protect, updateReadingProgress);

module.exports = router;
