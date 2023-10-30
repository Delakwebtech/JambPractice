const Result = require('../Models/Result');


// Get student's result
const examinationNumber =  async (req, res) => {
  if (req.userRole !== 'student') {
    return res.status(403).json({ message: 'Unauthorized User' });
  }
  const examinationNumber = req.params.examinationNumber;

  const result = await Result.findOne({ examinationNumber });

  if (!result) {
    return res.status(404).json({ message: 'Result not found' });
  }

  res.json({ result });
};

// Admin dashboard route
const adminDashboard = (req, res) => {
  if (req.userRole !== 'admin') {
    return res.status(403).json({ message: 'Unauthorized User' });
  }
  // Logic to fetch admin dashboard data
  res.status(200).json({ message: 'dashboardData' });
};

// View all student results
const getAllResults = async (req, res) => {
  if (req.userRole !== 'admin') {
    return res.status(403).json({ message: 'Unauthorized User' });
  }
  const results = await Result.find();
  res.status(200).json({ message: 'All Students Result' });
};

// View individual student result
const getStudentResultAdmin = async (req, res) => {
  if (req.userRole !== 'admin') {
    return res.status(403).json({ message: 'Unauthorized User' });
  }
  const examinationNumber = req.params.examinationNumber;

  const result = await Result.findOne({ examinationNumber });

  if (!result) {
    return res.status(404).json({ message: 'Result not found' });
  }

  res.json({ result });
};

module.exports = { examinationNumber, adminDashboard, getAllResults, getStudentResultAdmin };
