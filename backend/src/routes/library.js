const express = require('express');
const router = express.Router();
const { protect, authorize } = require('../middleware/auth');

// @route   GET /api/v1/library/books
// @desc    Get all books
// @access  Private
router.get('/books', protect, async (req, res) => {
  try {
    res.json({ success: true, data: [], message: 'Books endpoint' });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

// @route   POST /api/v1/library/books
// @desc    Add book
// @access  Private
router.post('/books', protect, authorize('super_admin', 'principal', 'librarian'), async (req, res) => {
  try {
    res.status(201).json({ success: true, data: req.body, message: 'Book added' });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

// @route   POST /api/v1/library/issue
// @desc    Issue book
// @access  Private
router.post('/issue', protect, authorize('super_admin', 'principal', 'librarian'), async (req, res) => {
  try {
    res.status(201).json({ success: true, data: req.body, message: 'Book issued' });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

// @route   POST /api/v1/library/return
// @desc    Return book
// @access  Private
router.post('/return', protect, authorize('super_admin', 'principal', 'librarian'), async (req, res) => {
  try {
    res.json({ success: true, data: req.body, message: 'Book returned' });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

module.exports = router;
