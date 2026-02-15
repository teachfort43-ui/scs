const mongoose = require('mongoose');

const classSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    enum: ['Nursery', 'KG', 'Pre-Primary', 'Class 1', 'Class 2', 'Class 3', 'Class 4', 'Class 5', 
           'Class 6', 'Class 7', 'Class 8', 'Class 9', 'Class 10', 'Class 11', 'Class 12']
  },
  numericName: {
    type: Number,
    required: true
  },
  sections: [{
    name: {
      type: String,
      enum: ['A', 'B', 'C', 'D']
    },
    capacity: {
      type: Number,
      default: 40
    },
    classTeacher: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Teacher'
    }
  }],
  academicYear: {
    type: String,
    required: true
  },
  stream: {
    type: String,
    enum: ['general', 'science', 'commerce', 'arts', null],
    default: null
  },
  isActive: {
    type: Boolean,
    default: true
  }
}, {
  timestamps: true
});

// Index
classSchema.index({ numericName: 1, academicYear: 1 });

module.exports = mongoose.model('Class', classSchema);
