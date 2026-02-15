const express = require('express');
const router = express.Router();
const { protect, authorize } = require('../middleware/auth');

// @route   GET /api/v1/timetable
// @desc    Get timetable
// @access  Private
router.get('/', protect, async (req, res) => {
  try {
    const { class: classId, teacher } = req.query;
    res.json({ success: true, data: [], message: 'Timetable endpoint', classId, teacher });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

// @route   POST /api/v1/timetable
// @desc    Create timetable entry
// @access  Private
router.post('/', protect, authorize('super_admin', 'principal'), async (req, res) => {
  try {
    res.status(201).json({ success: true, data: req.body, message: 'Timetable created' });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

module.exports = router;
