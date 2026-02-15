const express = require('express');
const router = express.Router();
const Class = require('../models/Class');
const { protect, authorize } = require('../middleware/auth');

// @route   GET /api/v1/classes
// @desc    Get all classes
// @access  Private
router.get('/', protect, async (req, res) => {
  try {
    const { academicYear, isActive = true } = req.query;
    
    let query = { isActive: isActive === 'true' };
    if (academicYear) query.academicYear = academicYear;

    const classes = await Class.find(query)
      .populate('sections.classTeacher', 'user')
      .sort({ numericName: 1 });

    res.json({
      success: true,
      data: classes
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
});

// @route   GET /api/v1/classes/:id
// @desc    Get class by ID
// @access  Private
router.get('/:id', protect, async (req, res) => {
  try {
    const classData = await Class.findById(req.params.id)
      .populate('sections.classTeacher', 'user');

    if (!classData) {
      return res.status(404).json({
        success: false,
        message: 'Class not found'
      });
    }

    res.json({
      success: true,
      data: classData
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
});

// @route   POST /api/v1/classes
// @desc    Create new class
// @access  Private (Admin only)
router.post('/', protect, authorize('super_admin', 'principal', 'registrar'), async (req, res) => {
  try {
    const { name, numericName, sections, academicYear, stream } = req.body;

    // Check if class already exists
    const existingClass = await Class.findOne({ 
      name, 
      academicYear 
    });

    if (existingClass) {
      return res.status(400).json({
        success: false,
        message: 'Class already exists for this academic year'
      });
    }

    const classData = await Class.create({
      name,
      numericName,
      sections,
      academicYear,
      stream
    });

    res.status(201).json({
      success: true,
      data: classData
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
});

// @route   PUT /api/v1/classes/:id
// @desc    Update class
// @access  Private
router.put('/:id', protect, authorize('super_admin', 'principal', 'registrar'), async (req, res) => {
  try {
    const classData = await Class.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );

    if (!classData) {
      return res.status(404).json({
        success: false,
        message: 'Class not found'
      });
    }

    res.json({
      success: true,
      data: classData
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
});

// @route   DELETE /api/v1/classes/:id
// @desc    Delete class
// @access  Private (Admin only)
router.delete('/:id', protect, authorize('super_admin'), async (req, res) => {
  try {
    const classData = await Class.findByIdAndUpdate(
      req.params.id,
      { isActive: false },
      { new: true }
    );

    if (!classData) {
      return res.status(404).json({
        success: false,
        message: 'Class not found'
      });
    }

    res.json({
      success: true,
      message: 'Class deleted'
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
});

module.exports = router;
