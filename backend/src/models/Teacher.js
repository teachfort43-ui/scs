const mongoose = require('mongoose');

const teacherSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  employeeId: {
    type: String,
    required: true,
    unique: true
  },
  department: {
    type: String,
    required: true
  },
  designation: {
    type: String,
    enum: ['principal', 'vice_principal', 'head_of_department', 'senior_teacher', 'teacher', 'assistant_teacher', 'tutor'],
    default: 'teacher'
  },
  subjects: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Subject'
  }],
  classes: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Class'
  }],
  qualifications: [{
    degree: String,
    institution: String,
    year: Number,
    grade: String
  }],
  experience: {
    totalYears: Number,
    previousSchools: [{
      name: String,
      position: String,
      duration: String
    }]
  },
  salary: {
    basic: Number,
    allowances: Number,
    bankAccount: {
      accountNumber: String,
      bankName: String,
      branch: String
    }
  },
  dateOfJoining: {
    type: Date,
    default: Date.now
  },
  isClassTeacher: {
    type: Boolean,
    default: false
  },
  classTeacherOf: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Class'
  },
  emergencyContact: {
    name: String,
    phone: String,
    relation: String
  },
  isActive: {
    type: Boolean,
    default: true
  }
}, {
  timestamps: true
});

// Index for faster queries
teacherSchema.index({ employeeId: 1 });
teacherSchema.index({ department: 1 });

module.exports = mongoose.model('Teacher', teacherSchema);
