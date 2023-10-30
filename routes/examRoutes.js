const express = require('express');
const router = express.Router();
const examController = require('../Controllers/examController');
const { protect } = require('../middlewares/authenticationMiddleware');

// Define exam routes
router.get('/subjects', protect, examController.subjects);
router.post('/start', protect, examController.start);

module.exports = router;
