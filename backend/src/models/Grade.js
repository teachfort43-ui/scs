const mongoose = require('mongoose');

const gradeSchema = new mongoose.Schema({
  student: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Student',
    required: true
  },
  subject: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Subject',
    required: true
  },
  exam: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Exam'
  },
  class: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Class',
    required: true
  },
  academicYear: {
    type: String,
    required: true
  },
  term: {
    type: String,
    enum: ['term1', 'term2', 'term3', 'final'],
    required: true
  },
  marks: {
    classwork: { type: Number, default: 0 },
    homework: { type: Number, default: 0 },
    midterm: { type: Number, default: 0 },
    final: { type: Number, default: 0 },
    practical: { type: Number, default: 0 },
    project: { type: Number, default: 0 }
  },
  totalMarks: {
    type: Number,
    default: 0
  },
  obtainedMarks: {
    type: Number,
    default: 0
  },
  percentage: {
    type: Number,
    default: 0
  },
  grade: {
    type: String,
    enum: ['A+', 'A', 'B+', 'B', 'C+', 'C', 'D', 'F', 'N/A']
  },
  remarks: String,
  enteredBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Teacher'
  },
  isPublished: {
    type: Boolean,
    default: false
  }
}, {
  timestamps: true
});

// Indexes
gradeSchema.index({ student: 1, academicYear: 1, term: 1 });
gradeSchema.index({ subject: 1, academicYear: 1 });

module.exports = mongoose.model('Grade', gradeSchema);
