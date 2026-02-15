const mongoose = require('mongoose');

const attendanceSchema = new mongoose.Schema({
  student: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Student',
    required: true
  },
  class: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Class',
    required: true
  },
  date: {
    type: Date,
    required: true
  },
  status: {
    type: String,
    enum: ['present', 'absent', 'late', 'excused', 'holiday'],
    default: 'present'
  },
  period: {
    type: Number,
    min: 1,
    max: 10
  },
  subject: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Subject'
  },
  markedBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Teacher'
  },
  remarks: String,
  academicYear: {
    type: String,
    required: true
  }
}, {
  timestamps: true
});

// Compound index for efficient queries
attendanceSchema.index({ student: 1, date: 1 });
attendanceSchema.index({ class: 1, date: 1 });

module.exports = mongoose.model('Attendance', attendanceSchema);
