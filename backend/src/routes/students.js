const express = require('express');
const router = express.Router();
const Student = require('../models/Student');
const User = require('../models/User');
const { protect, authorize } = require('../middleware/auth');

// @route   GET /api/v1/students
// @desc    Get all students
// @access  Private
router.get('/', protect, async (req, res) => {
  try {
    const { class: classId, section, academicYear, search, status = 'active', page = 1, limit = 20 } = req.query;
    
    let query = { status };
    
    if (classId) query.class = classId;
    if (section) query.section = section;
    if (academicYear) query.academicYear = academicYear;

    const students = await Student.find(query)
      .populate('user', 'firstName lastName email phone profilePhoto gender dateOfBirth address')
      .populate('class', 'name numericName')
      .skip((page - 1) * limit)
      .limit(parseInt(limit))
      .sort({ createdAt: -1 });

    const total = await Student.countDocuments(query);

    res.json({
      success: true,
      data: students,
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

// @route   GET /api/v1/students/:id
// @desc    Get student by ID
// @access  Private
router.get('/:id', protect, async (req, res) => {
  try {
    const student = await Student.findById(req.params.id)
      .populate('user', 'firstName lastName email phone profilePhoto gender dateOfBirth address')
      .populate('class', 'name numericName')
      .populate('transportRoute');

    if (!student) {
      return res.status(404).json({
        success: false,
        message: 'Student not found'
      });
    }

    res.json({
      success: true,
      data: student
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
});

// @route   POST /api/v1/students
// @desc    Create new student
// @access  Private (Admin/Registrar)
router.post('/', protect, authorize('super_admin', 'principal', 'registrar'), async (req, res) => {
  try {
    const {
      firstName, lastName, email, phone, gender, dateOfBirth, address,
      studentId, rollNumber, class: classId, section, academicYear,
      fatherName, fatherPhone, fatherOccupation, motherName, motherPhone, motherOccupation,
      guardianName, guardianPhone, guardianRelation, guardianAddress,
      bloodGroup, medicalConditions, allergies
    } = req.body;

    // Create user first
    const user = await User.create({
      firstName,
      lastName,
      email,
      phone,
      password: 'student123', // Default password
      gender,
      dateOfBirth,
      address,
      role: 'student'
    });

    // Create student record
    const student = await Student.create({
      user: user._id,
      studentId,
      rollNumber,
      class: classId,
      section,
      academicYear,
      fatherName,
      fatherPhone,
      fatherOccupation,
      motherName,
      motherPhone,
      motherOccupation,
      guardianName,
      guardianPhone,
      guardianRelation,
      guardianAddress,
      bloodGroup,
      medicalConditions,
      allergies
    });

    const populatedStudent = await Student.findById(student._id)
      .populate('user', 'firstName lastName email phone profilePhoto')
      .populate('class', 'name numericName');

    res.status(201).json({
      success: true,
      data: populatedStudent
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
});

// @route   PUT /api/v1/students/:id
// @desc    Update student
// @access  Private
router.put('/:id', protect, async (req, res) => {
  try {
    const student = await Student.findById(req.params.id);
    
    if (!student) {
      return res.status(404).json({
        success: false,
        message: 'Student not found'
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

    if (Object.keys(userFields).length > 0) {
      await User.findByIdAndUpdate(student.user, userFields);
    }

    // Update student data
    const studentFields = {};
    const allowedFields = [
      'rollNumber', 'section', 'fatherName', 'fatherPhone', 'fatherOccupation',
      'motherName', 'motherPhone', 'motherOccupation', 'guardianName', 'guardianPhone',
      'guardianRelation', 'guardianAddress', 'bloodGroup', 'medicalConditions',
      'allergies', 'transportAssigned', 'transportRoute', 'status'
    ];

    allowedFields.forEach(field => {
      if (req.body[field] !== undefined) {
        studentFields[field] = req.body[field];
      }
    });

    const updatedStudent = await Student.findByIdAndUpdate(
      req.params.id,
      studentFields,
      { new: true, runValidators: true }
    ).populate('user', 'firstName lastName email phone profilePhoto')
     .populate('class', 'name numericName');

    res.json({
      success: true,
      data: updatedStudent
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
});

// @route   GET /api/v1/students/class/:classId
// @desc    Get students by class
// @access  Private
router.get('/class/:classId', protect, async (req, res) => {
  try {
    const students = await Student.find({ 
      class: req.params.classId,
      status: 'active'
    })
      .populate('user', 'firstName lastName email phone profilePhoto')
      .sort({ rollNumber: 1 });

    res.json({
      success: true,
      data: students
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
});

module.exports = router;
