const express = require('express');
const router = express.Router();
const Teacher = require('../models/Teacher');
const User = require('../models/User');
const { protect, authorize } = require('../middleware/auth');

// @route   GET /api/v1/teachers
// @desc    Get all teachers
// @access  Private
router.get('/', protect, async (req, res) => {
  try {
    const { department, designation, isActive = true, search, page = 1, limit = 20 } = req.query;
    
    let query = { isActive: isActive === 'true' };
    
    if (department) query.department = department;
    if (designation) query.designation = designation;

    const teachers = await Teacher.find(query)
      .populate('user', 'firstName lastName email phone profilePhoto gender')
      .populate('classTeacherOf', 'name numericName')
      .populate('subjects', 'name code')
      .skip((page - 1) * limit)
      .limit(parseInt(limit))
      .sort({ createdAt: -1 });

    const total = await Teacher.countDocuments(query);

    res.json({
      success: true,
      data: teachers,
      pagination: {
        page: parseInt(page),
        limit: parseInt(limit),
        total,
        pages: Math.ceil(total / limit)
      }
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
});

// @route   GET /api/v1/teachers/:id
// @desc    Get teacher by ID
// @access  Private
router.get('/:id', protect, async (req, res) => {
  try {
    const teacher = await Teacher.findById(req.params.id)
      .populate('user', 'firstName lastName email phone profilePhoto gender dateOfBirth address')
      .populate('classTeacherOf', 'name numericName')
      .populate('subjects', 'name code class')
      .populate('classes', 'name numericName');

    if (!teacher) {
      return res.status(404).json({
        success: false,
        message: 'Teacher not found'
      });
    }

    res.json({
      success: true,
      data: teacher
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
});

// @route   POST /api/v1/teachers
// @desc    Create new teacher
// @access  Private (Admin only)
router.post('/', protect, authorize('super_admin', 'principal'), async (req, res) => {
  try {
    const {
      firstName, lastName, email, phone, gender, dateOfBirth, address,
      employeeId, department, designation, qualifications, experience, salary,
      dateOfJoining, emergencyContact
    } = req.body;

    // Create user first
    const user = await User.create({
      firstName,
      lastName,
      email,
      phone,
      password: 'teacher123', // Default password
      gender,
      dateOfBirth,
      address,
      role: 'teacher'
    });

    // Create teacher record
    const teacher = await Teacher.create({
      user: user._id,
      employeeId,
      department,
      designation,
      qualifications,
      experience,
      salary,
      dateOfJoining,
      emergencyContact
    });

    const populatedTeacher = await Teacher.findById(teacher._id)
      .populate('user', 'firstName lastName email phone profilePhoto')
      .populate('classTeacherOf', 'name numericName');

    res.status(201).json({
      success: true,
      data: populatedTeacher
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
});

// @route   PUT /api/v1/teachers/:id
// @desc    Update teacher
// @access  Private
router.put('/:id', protect, async (req, res) => {
  try {
    const teacher = await Teacher.findById(req.params.id);
    
    if (!teacher) {
      return res.status(404).json({
        success: false,
        message: 'Teacher not found'
      });
    }

    // Update user data
    const userFields = {};
    if (req.body.firstName) userFields.firstName = req.body.firstName;
    if (req.body.lastName) userFields.lastName = req.body.lastName;
    if (req.body.email) userFields.email = req.body.email;
    if (req.body.phone) userFields.phone = req.body.phone;
    if (req.body.gender) userFields.gender = req.body.gender;
    if (req.body.dateOfBirth) userFields.dateOfBirth = req.body.dateOfBirth;
    if (req.body.address) userFields.address = req.body.address;
    if (req.body.profilePhoto) userFields.profilePhoto = req.body.profilePhoto;

    if (Object.keys(userFields).length > 0) {
      await User.findByIdAndUpdate(teacher.user, userFields);
    }

    // Update teacher data
    const teacherFields = {};
    const allowedFields = [
      'department', 'designation', 'subjects', 'classes', 'qualifications',
      'experience', 'salary', 'isClassTeacher', 'classTeacherOf', 'emergencyContact', 'isActive'
    ];

    allowedFields.forEach(field => {
      if (req.body[field] !== undefined) {
        teacherFields[field] = req.body[field];
      }
    });

    const updatedTeacher = await Teacher.findByIdAndUpdate(
      req.params.id,
      teacherFields,
      { new: true, runValidators: true }
    ).populate('user', 'firstName lastName email phone profilePhoto')
     .populate('classTeacherOf', 'name numericName');

    res.json({
      success: true,
      data: updatedTeacher
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
});

// @route   GET /api/v1/teachers/department/:department
// @desc    Get teachers by department
// @access  Private
router.get('/department/:department', protect, async (req, res) => {
  try {
    const teachers = await Teacher.find({ 
      department: req.params.department,
      isActive: true
    })
      .populate('user', 'firstName lastName email phone profilePhoto')
      .sort({ 'user.firstName': 1 });

    res.json({
      success: true,
      data: teachers
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
});

module.exports = router;
