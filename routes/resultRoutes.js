const express = require('express');
const router = express.Router();
const resultController = require('../Controllers/resultController');
const { protect } = require('../middlewares/authenticationMiddleware');

// Define result routes
router.get('/student/:examinationNumber', protect, resultController.examinationNumber);
router.get('/admin/dashboard', protect, resultController.adminDashboard);
router.get('/admin/all-results', protect, resultController.getAllResults);
router.get('/admin/student-result/:examinationNumber', protect, resultController.getStudentResultAdmin);

module.exports = router;
