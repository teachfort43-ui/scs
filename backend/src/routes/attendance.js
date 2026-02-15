const express = require('express');
const router = express.Router();
const Attendance = require('../models/Attendance');
const Student = require('../models/Student');
const { protect, authorize } = require('../middleware/auth');

// @route   POST /api/v1/attendance/mark
// @desc    Mark attendance for students
// @access  Private (Teacher/Admin)
router.post('/mark', protect, authorize('super_admin', 'principal', 'teacher'), async (req, res) => {
  try {
    const { class: classId, date, period, subject, attendanceList, markedBy } = req.body;

    const results = [];

    for (const record of attendanceList) {
      const { student, status, remarks } = record;

      // Check if attendance already marked
      const existingAttendance = await Attendance.findOne({
        student,
        class: classId,
        date: new Date(date),
        period
      });

      if (existingAttendance) {
        // Update existing
        existingAttendance.status = status;
        existingAttendance.remarks = remarks;
        existingAttendance.markedBy = markedBy || req.user._id;
        await existingAttendance.save();
        results.push(existingAttendance);
      } else {
        // Create new
        const studentData = await Student.findById(student);
        const attendance = await Attendance.create({
          student,
          class: classId,
          date: new Date(date),
          period,
          subject,
          status,
          remarks,
          markedBy: markedBy || req.user._id,
          academicYear: studentData.academicYear
        });
        results.push(attendance);
      }
    }

    res.json({
      success: true,
      data: results,
      message: `Attendance marked for ${results.length} students`
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
});

// @route   GET /api/v1/attendance
// @desc    Get attendance records
// @access  Private
router.get('/', protect, async (req, res) => {
  try {
    const { class: classId, student, date, startDate, endDate, subject, academicYear, page = 1, limit = 50 } = req.query;
    
    let query = {};
    
    if (classId) query.class = classId;
    if (student) query.student = student;
    if (subject) query.subject = subject;
    if (academicYear) query.academicYear = academicYear;
    if (date) query.date = new Date(date);
    if (startDate && endDate) {
      query.date = { $gte: new Date(startDate), $lte: new Date(endDate) };
    }

    const attendance = await Attendance.find(query)
      .populate('student', 'studentId rollNumber')
      .populate({
        path: 'student',
        populate: { path: 'user', select: 'firstName lastName' }
      })
      .populate('class', 'name numericName')
      .populate('subject', 'name code')
      .populate('markedBy', 'user')
      .skip((page - 1) * limit)
      .limit(parseInt(limit))
      .sort({ date: -1 });

    const total = await Attendance.countDocuments(query);

    res.json({
      success: true,
      data: attendance,
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

// @route   GET /api/v1/attendance/student/:studentId
// @desc    Get attendance for a student
// @access  Private
router.get('/student/:studentId', protect, async (req, res) => {
  try {
    const { startDate, endDate, academicYear } = req.query;
    
    let query = { student: req.params.studentId };
    
    if (startDate && endDate) {
      query.date = { $gte: new Date(startDate), $lte: new Date(endDate) };
    }
    if (academicYear) query.academicYear = academicYear;

    const attendance = await Attendance.find(query)
      .populate('class', 'name numericName')
      .populate('subject', 'name code')
      .sort({ date: -1 });

    // Calculate statistics
    const total = attendance.length;
    const present = attendance.filter(a => a.status === 'present').length;
    const absent = attendance.filter(a => a.status === 'absent').length;
    const late = attendance.filter(a => a.status === 'late').length;
    const excused = attendance.filter(a => a.status === 'excused').length;

    res.json({
      success: true,
      data: {
        records: attendance,
        statistics: {
          total,
          present,
          absent,
          late,
          excused,
          percentage: total > 0 ? ((present + late + excused) / total * 100).toFixed(2) : 0
        }
      }
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
});

// @route   GET /api/v1/attendance/class/:classId
// @desc    Get attendance for a class on a specific date
// @access  Private
router.get('/class/:classId', protect, async (req, res) => {
  try {
    const { date, period } = req.query;
    
    let query = { class: req.params.classId };
    
    if (date) query.date = new Date(date);
    if (period) query.period = parseInt(period);

    const attendance = await Attendance.find(query)
      .populate({
        path: 'student',
        populate: { path: 'user', select: 'firstName lastName' }
      })
      .populate('student.user', 'firstName lastName')
      .sort({ 'student.rollNumber': 1 });

    res.json({
      success: true,
      data: attendance
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
});

module.exports = router;
