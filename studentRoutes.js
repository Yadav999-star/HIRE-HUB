const express = require('express');
const router = express.Router();
const Student = require('../models/student');

// POST - Register a new student
router.post('/register', async (req, res) => {
  try {
    const { name, email, specialization, cgpa } = req.body;

    // Validate required fields
    if (!name || !email || !specialization || !cgpa) {
      return res.status(400).json({
        success: false,
        message: 'Please provide all required fields'
      });
    }

    // Check if student already exists
    const existingStudent = await Student.findOne({ email });
    if (existingStudent) {
      return res.status(400).json({
        success: false,
        message: 'Student with this email already exists'
      });
    }

    // Create new student
    const student = new Student({
      name,
      email,
      specialization,
      cgpa
    });

    await student.save();

    res.status(201).json({
      success: true,
      message: 'Student registered successfully',
      data: student
    });
  } catch (error) {
    if (error.name === 'ValidationError') {
      return res.status(400).json({
        success: false,
        message: Object.values(error.errors).map(val => val.message).join(', ')
      });
    }
    
    res.status(500).json({
      success: false,
      message: 'Server error',
      error: error.message
    });
  }
});

// GET - Get all students with optional specialization filter
router.get('/students', async (req, res) => {
  try {
    const { specialization } = req.query;
    let query = {};
    
    // If specialization is provided, add it to the query
    if (specialization) {
      query.specialization = specialization;
    }
    
    const students = await Student.find(query).select('-__v');
    
    res.status(200).json({
      success: true,
      count: students.length,
      data: students
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Server error',
      error: error.message
    });
  }
});

module.exports = router; 