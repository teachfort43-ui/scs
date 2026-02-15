const mongoose = require('mongoose');

const studentSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  studentId: {
    type: String,
    required: true,
    unique: true
  },
  rollNumber: {
    type: String,
    required: true
  },
  class: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Class',
    required: true
  },
  section: {
    type: String,
    enum: ['A', 'B', 'C', 'D', null],
    default: null
  },
  academicYear: {
    type: String,
    required: true
  },
  admissionDate: {
    type: Date,
    default: Date.now
  },
  previousSchool: {
    name: String,
    address: String,
    transferCertificate: String
  },
  fatherName: {
    type: String,
    required: true
  },
  fatherPhone: String,
  fatherOccupation: String,
  motherName: {
    type: String,
    required: true
  },
  motherPhone: String,
  motherOccupation: String,
  guardianName: String,
  guardianPhone: String,
  guardianRelation: String,
  guardianAddress: String,
  emergencyContact: {
    name: String,
    phone: String,
    relation: String
  },
  bloodGroup: {
    type: String,
    enum: ['A+', 'A-', 'B+', 'B-', 'O+', 'O-', 'AB+', 'AB-', 'N/A']
  },
  medicalConditions: String,
  allergies: String,
  transportAssigned: {
    type: Boolean,
    default: false
  },
  transportRoute: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'TransportRoute'
  },
  hostelAssigned: {
    type: Boolean,
    default: false
  },
  hostelRoom: String,
  status: {
    type: String,
    enum: ['active', 'transferred', 'withdrawn', 'graduated', 'suspended'],
    default: 'active'
  },
  withdrawalDate: Date,
  withdrawalReason: String
}, {
  timestamps: true
});

// Index for faster queries
studentSchema.index({ studentId: 1 });
studentSchema.index({ rollNumber: 1 });
studentSchema.index({ class: 1, section: 1 });

// Virtual for full name
studentSchema.virtual('fullName').get(function() {
  return `${this.user?.firstName || ''} ${this.user?.lastName || ''}`.trim();
});

module.exports = mongoose.model('Student', studentSchema);
