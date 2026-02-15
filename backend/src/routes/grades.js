const express = require('express');
const router = express.Router();
const Grade = require('../models/Grade');
const { protect, authorize } = require('../middleware/auth');

// Helper function to calculate grade
const calculateGrade = (percentage) => {
  if (percentage >= 90) return 'A+';
  if (percentage >= 80) return 'A';
  if (percentage >= 70) return 'B+';
  if (percentage >= 60) return 'B';
  if (percentage >= 50) return 'C+';
  if (percentage >= 40) return 'C';
  if (percentage >= 30) return 'D';
  return 'F';
};

// @route   POST /api/v1/grades
// @desc    Create or update grades
// @access  Private (Teacher/Admin)
router.post('/', protect, authorize('super_admin', 'principal', 'teacher'), async (req, res) => {
  try {
    const { student, subject, exam, class: classId, academicYear, term, marks, enteredBy } = req.body;

    // Calculate total and obtained marks
    const totalMarks = Object.values(marks).reduce((a, b) => a + b, 0);
    const obtainedMarks = totalMarks;
    const percentage = (obtainedMarks / totalMarks) * 100;
    const grade = calculateGrade(percentage);

    // Check if grade already exists
    const existingGrade = await Grade.findOne({
      student,
      subject,
      academicYear,
      term
    });

    if (existingGrade) {
      // Update
      existingGrade.marks = marks;
      existingGrade.totalMarks = totalMarks;
      existingGrade.obtainedMarks = obtainedMarks;
      existingGrade.percentage = percentage;
      existingGrade.grade = grade;
      existingGrade.exam = exam;
      existingGrade.enteredBy = enteredBy || req.user._id;
      await existingGrade.save();

      return res.json({
        success: true,
        data: existingGrade,
        message: 'Grade updated'
      });
    }

    // Create new
    const gradeRecord = await Grade.create({
      student,
      subject,
      exam,
      class: classId,
      academicYear,
      term,
      marks,
      totalMarks,
      obtainedMarks,
      percentage,
      grade,
      enteredBy: enteredBy || req.user._id
    });

    res.status(201).json({
      success: true,
      data: gradeRecord
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
});

// @route   GET /api/v1/grades
// @desc    Get grades
// @access  Private
router.get('/', protect, async (req, res) => {
  try {
    const { student, subject, class: classId, academicYear, term, isPublished } = req.query;
    
    let query = {};
    
    if (student) query.student = student;
    if (subject) query.subject = subject;
    if (classId) query.class = classId;
    if (academicYear) query.academicYear = academicYear;
    if (term) query.term = term;
    if (isPublished !== undefined) query.isPublished = isPublished === 'true';

    const grades = await Grade.find(query)
      .populate('student')
      .populate({
        path: 'student',
        populate: { path: 'user', select: 'firstName lastName' }
      })
      .populate('subject', 'name code')
      .populate('class', 'name numericName')
      .populate('enteredBy', 'user')
      .sort({ createdAt: -1 });

    res.json({
      success: true,
      data: grades
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
});

// @route   GET /api/v1/grades/student/:studentId
// @desc    Get grades for a student
// @access  Private
router.get('/student/:studentId', protect, async (req, res) => {
  try {
    const { academicYear, term } = req.query;
    
    let query = { student: req.params.studentId };
    
    if (academicYear) query.academicYear = academicYear;
    if (term) query.term = term;

    const grades = await Grade.find(query)
      .populate('subject', 'name code')
      .populate('class', 'name numericName')
      .sort({ term: 1 });

    // Calculate GPA
    let totalPoints = 0;
    grades.forEach(g => {
      const gradePoints = {
        'A+': 4.0, 'A': 4.0, 'B+': 3.5, 'B': 3.0,
        'C+': 2.5, 'C': 2.0, 'D': 1.0, 'F': 0.0
      };
      totalPoints += gradePoints[g.grade] || 0;
    });

    const gpa = grades.length > 0 ? (totalPoints / grades.length).toFixed(2) : 0;

    res.json({
      success: true,
      data: {
        grades,
        gpa,
        summary: {
          totalSubjects: grades.length,
          averagePercentage: grades.length > 0 
            ? (grades.reduce((sum, g) => sum + g.percentage, 0) / grades.length).toFixed(2)
            : 0
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

// @route   PUT /api/v1/grades/:id/publish
// @desc    Publish grades
// @access  Private (Admin only)
router.put('/:id/publish', protect, authorize('super_admin', 'principal'), async (req, res) => {
  try {
    const grade = await Grade.findByIdAndUpdate(
      req.params.id,
      { isPublished: true },
      { new: true }
    );

    if (!grade) {
      return res.status(404).json({
        success: false,
        message: 'Grade not found'
      });
    }

    res.json({
      success: true,
      data: grade,
      message: 'Grade published'
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
});

module.exports = router;
