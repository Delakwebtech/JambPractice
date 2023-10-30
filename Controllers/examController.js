const Student = require('../Models/Student');
const Result = require('../Models/Result');

// Get subjects route
const subjects = async (req, res) => {
  try {
    // Logic to retrieve available subjects
    const subjects = require('../data/subjects.json');
    res.json({ subjects });
  } catch (error) {
    res.status(500).json({ message: 'Failed to retrieve subjects' });
  }
};


// Start exam route
const start = async (req, res) => {
  try {
    if (req.userRole !== 'student') {
      return res.status(403).json({ message: 'Only student can start exams' });
    }

    const selectedSubjects = req.body.subjects;

    // Logic to start the exam
    const examStartTime = new Date();

    // Save exam details in the database
    const newResult = new Result({
      examinationNumber: req.username,
      subjects: selectedSubjects,
      scores: [],
    });

    await newResult.save();
    res.json({ message: 'Exam started', startTime: examStartTime });
  } catch (error) {
    res.status(500).json({ message: 'Failed to start exam' });
  }
};


module.exports = { subjects, start };
