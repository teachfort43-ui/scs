const express = require('express');
const router = express.Router();
const { Fee, Payment } = require('../models/Fee');
const Student = require('../models/Student');
const { protect, authorize } = require('../middleware/auth');

// Generate receipt number
const generateReceiptNumber = () => {
  return 'RCP' + Date.now() + Math.floor(Math.random() * 1000);
};

// @route   GET /api/v1/fees
// @desc    Get fee structures
// @access  Private
router.get('/', protect, async (req, res) => {
  try {
    const { class: classId, academicYear, feeType, isActive = true } = req.query;
    
    let query = { isActive: isActive === 'true' };
    if (classId) query.class = classId;
    if (academicYear) query.academicYear = academicYear;
    if (feeType) query.feeType = feeType;

    const fees = await Fee.find(query)
      .populate('class', 'name numericName')
      .sort({ dueDate: 1 });

    res.json({
      success: true,
      data: fees
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
});

// @route   POST /api/v1/fees
// @desc    Create fee structure
// @access  Private (Admin/Accountant)
router.post('/', protect, authorize('super_admin', 'principal', 'accountant'), async (req, res) => {
  try {
    const { name, class: classId, academicYear, feeType, amount, dueDate, lateFee, description } = req.body;

    const fee = await Fee.create({
      name,
      class: classId,
      academicYear,
      feeType,
      amount,
      dueDate,
      lateFee,
      description
    });

    res.status(201).json({
      success: true,
      data: fee
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
});

// @route   PUT /api/v1/fees/:id
// @desc    Update fee structure
// @access  Private
router.put('/:id', protect, authorize('super_admin', 'principal', 'accountant'), async (req, res) => {
  try {
    const fee = await Fee.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );

    if (!fee) {
      return res.status(404).json({
        success: false,
        message: 'Fee not found'
      });
    }

    res.json({
      success: true,
      data: fee
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
});

// @route   POST /api/v1/fees/collect
// @desc    Collect fee payment
// @access  Private (Admin/Accountant)
router.post('/collect', protect, authorize('super_admin', 'principal', 'accountant'), async (req, res) => {
  try {
    const { student, fee: feeId, amountPaid, paymentMethod, paymentDate, transactionId, remarks } = req.body;

    // Get fee details
    const fee = await Fee.findById(feeId);
    if (!fee) {
      return res.status(404).json({
        success: false,
        message: 'Fee not found'
      });
    }

    // Check if payment already exists
    const existingPayment = await Payment.findOne({ student, fee: feeId });

    const totalPaid = existingPayment ? existingPayment.amountPaid + amountPaid : amountPaid;
    const isComplete = totalPaid >= fee.amount;

    const paymentData = {
      student,
      fee: feeId,
      academicYear: fee.academicYear,
      amountPaid: totalPaid,
      paymentMethod,
      paymentDate: paymentDate || Date.now(),
      transactionId,
      receiptNumber: generateReceiptNumber(),
      status: isComplete ? 'completed' : 'pending',
      remarks,
      recordedBy: req.user._id
    };

    let payment;
    if (existingPayment) {
      existingPayment.amountPaid = totalPaid;
      existingPayment.paymentMethod = paymentMethod;
      existingPayment.transactionId = transactionId;
      existingPayment.status = isComplete ? 'completed' : 'pending';
      await existingPayment.save();
      payment = existingPayment;
    } else {
      payment = await Payment.create(paymentData);
    }

    res.status(201).json({
      success: true,
      data: payment,
      message: isComplete ? 'Fee fully paid' : 'Partial payment recorded'
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
});

// @route   GET /api/v1/fees/outstanding
// @desc    Get outstanding fees
// @access  Private
router.get('/outstanding', protect, async (req, res) => {
  try {
    const { class: classId, academicYear } = req.query;
    
    // Get all fees
    let feeQuery = { isActive: true };
    if (classId) feeQuery.class = classId;
    if (academicYear) feeQuery.academicYear = academicYear;
    
    const fees = await Fee.find(feeQuery).populate('class', 'name numericName');
    
    const outstanding = [];
    
    for (const fee of fees) {
      // Get all payments for this fee
      const payments = await Payment.find({ fee: fee._id, status: 'completed' });
      
      // Get all students in this class
      const students = await Student.find({ 
        class: fee.class._id, 
        status: 'active',
        academicYear: fee.academicYear 
      });
      
      for (const student of students) {
        const studentPayment = payments.find(p => p.student.toString() === student._id.toString());
        const paid = studentPayment ? studentPayment.amountPaid : 0;
        const due = fee.amount - paid;
        
        if (due > 0) {
          outstanding.push({
            student: await Student.findById(student._id)
              .populate('user', 'firstName lastName'),
            fee,
            amountDue: fee.amount,
            amountPaid: paid,
            amountOutstanding: due,
            isOverdue: new Date() > fee.dueDate
          });
        }
      }
    }

    res.json({
      success: true,
      data: outstanding
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
});

// @route   GET /api/v1/fees/payments
// @desc    Get payment records
// @access  Private
router.get('/payments', protect, async (req, res) => {
  try {
    const { student, fee: feeId, academicYear, status, page = 1, limit = 50 } = req.query;
    
    let query = {};
    if (student) query.student = student;
    if (feeId) query.fee = feeId;
    if (academicYear) query.academicYear = academicYear;
    if (status) query.status = status;

    const payments = await Payment.find(query)
      .populate('student')
      .populate({
        path: 'student',
        populate: { path: 'user', select: 'firstName lastName' }
      })
      .populate('fee', 'name amount')
      .populate('recordedBy', 'user')
      .skip((page - 1) * limit)
      .limit(parseInt(limit))
      .sort({ paymentDate: -1 });

    const total = await Payment.countDocuments(query);

    res.json({
      success: true,
      data: payments,
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

module.exports = router;
