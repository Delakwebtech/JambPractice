const express = require('express');
const router = express.Router();
const { login, getMe } = require('../Controllers/authController');
const { protect } = require('../middlewares/authenticationMiddleware');

// Define authentication routes
router.post('/login', login);
router.get('/me', protect, getMe);

module.exports = router;
