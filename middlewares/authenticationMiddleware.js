const jwt = require('jsonwebtoken');
const student = require('../Models/Student');
const admin = require('../Models/Admin');

exports.protect = async (req, res, next) => {
  let token;

  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith('Bearer')
  ) {
    token = req.headers.authorization.split(' ')[1];
  }

  // Make sure token exists
  if (!token) {
    return res
      .status(401)
      .json({ message: 'Not authorized to access this route' });
  }

  try {
    // Verify token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // Check if the user is an admin
    const isAdmin = await admin.findById(decoded.id);

    // Check if the user is a student
    const isStudent = await student.findById(decoded.id);

    if (!isAdmin && !isStudent) {
      return res
        .status(401)
        .json({ message: 'Not authorized to access this route' });
    }

    // Set user role in the request object
    req.userRole = isAdmin ? 'admin' : 'student';

    next();
  } catch (err) {
    return res
      .status(401)
      .json({ message: 'Not authorized to access this route' });
  }
};


