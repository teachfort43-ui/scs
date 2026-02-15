const express = require('express');
const router = express.Router();
const { protect, authorize } = require('../middleware/auth');

// @route   GET /api/v1/exams
// @desc    Get all exams
// @access  Private
router.get('/', protect, async (req, res) => {
  try {
    res.json({ success: true, data: [], message: 'Exams endpoint - to be implemented' });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

// @route   POST /api/v1/exams
// @desc    Create exam
// @access  Private
router.post('/', protect, authorize('super_admin', 'principal', 'teacher'), async (req, res) => {
  try {
    res.status(201).json({ success: true, data: req.body, message: 'Exam created' });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

module.exports = router;
