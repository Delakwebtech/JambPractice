const Student = require('../Models/Student');
const Admin = require('../Models/Admin');

// Login user
const login = async (req, res) => {
  const { username, password } = req.body;

  if (!username || !password) {
    return res.status(400).json({ message: 'Please provide a username and password' });
  }

  let user;

  // Check for admin
  user = await Admin.findOne({ username }).select('+password');

  if (user && (await user.matchPassword(password))) {
    sendTokenResponse(user, 200, 'adminToken', res);
    return;
  }

  // Check for student using examinationNumber as username
  user = await Student.findOne({ examinationNumber: username }).select('+password');

  if (user && (await user.matchPassword(password))) {
    sendTokenResponse(user, 200, 'studentToken', res);
    return;
  }

  return res.status(401).json({ message: 'Invalid Credentials' });
};

// Get token from model, create cookie and send response
const sendTokenResponse = (user, statusCode, tokenName, res) => {
  // Create Token
  const token = user.getSignedJwtToken();

  const options = {
    expires: new Date(Date.now() + 1 * 24 * 60 * 60 * 1000),
    httpOnly: true,
  };

  res
    .status(statusCode)
    .cookie(tokenName, token, options)
    .json({
      success: true,
      [tokenName]: token,
    });
};

// Get current logged in user
const getMe = async (req, res) => {
  let admin, student;

  if (req.student) {
    student = await Student.findById(req.student.id);
  }

  if (req.admin) {
    admin = await Admin.findById(req.admin.id);
  }

  res.status(200).json({
    success: true,
    data: { admin, student },
  });
};


module.exports = { login, getMe };
