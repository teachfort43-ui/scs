const express = require('express');
const router = express.Router();
const Subject = require('../models/Subject');
const { protect, authorize } = require('../middleware/auth');

// @route   GET /api/v1/subjects
// @desc    Get all subjects
// @access  Private
router.get('/', protect, async (req, res) => {
  try {
    const { class: classId, department, isActive = true } = req.query;
    
    let query = { isActive: isActive === 'true' };
    if (classId) query.class = classId;
    if (department) query.department = department;

    const subjects = await Subject.find(query)
      .populate('class', 'name numericName')
      .populate('teacher', 'user')
      .populate({
        path: 'teacher',
        populate: {
          path: 'user',
          select: 'firstName lastName'
        }
      })
      .sort({ class: 1, name: 1 });

    res.json({
      success: true,
      data: subjects
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
});

// @route   GET /api/v1/subjects/:id
// @desc    Get subject by ID
// @access  Private
router.get('/:id', protect, async (req, res) => {
  try {
    const subject = await Subject.findById(req.params.id)
      .populate('class', 'name numericName')
      .populate({
        path: 'teacher',
        populate: {
          path: 'user',
          select: 'firstName lastName email'
        }
      });

    if (!subject) {
      return res.status(404).json({
        success: false,
        message: 'Subject not found'
      });
    }

    res.json({
      success: true,
      data: subject
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
});

// @route   POST /api/v1/subjects
// @desc    Create new subject
// @access  Private (Admin/Teacher)
router.post('/', protect, authorize('super_admin', 'principal', 'teacher'), async (req, res) => {
  try {
    const { name, code, type, class: classId, department, teacher, credits, passingMarks, totalMarks } = req.body;

    const subject = await Subject.create({
      name,
      code,
      type,
      class: classId,
      department,
      teacher,
      credits,
      passingMarks,
      totalMarks
    });

    const populatedSubject = await Subject.findById(subject._id)
      .populate('class', 'name numericName')
      .populate({
        path: 'teacher',
        populate: { path: 'user', select: 'firstName lastName' }
      });

    res.status(201).json({
      success: true,
      data: populatedSubject
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
});

// @route   PUT /api/v1/subjects/:id
// @desc    Update subject
// @access  Private
router.put('/:id', protect, authorize('super_admin', 'principal', 'teacher'), async (req, res) => {
  try {
    const subject = await Subject.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    ).populate('class', 'name numericName');

    if (!subject) {
      return res.status(404).json({
        success: false,
        message: 'Subject not found'
      });
    }

    res.json({
      success: true,
      data: subject
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
});

// @route   GET /api/v1/subjects/class/:classId
// @desc    Get subjects by class
// @access  Private
router.get('/class/:classId', protect, async (req, res) => {
  try {
    const subjects = await Subject.find({ 
      class: req.params.classId,
      isActive: true
    })
      .populate('teacher', 'user')
      .populate({
        path: 'teacher',
        populate: { path: 'user', select: 'firstName lastName' }
      })
      .sort({ name: 1 });

    res.json({
      success: true,
      data: subjects
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
});

module.exports = router;
