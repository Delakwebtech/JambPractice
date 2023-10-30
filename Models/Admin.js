const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const adminSchema = new mongoose.Schema({
  username: {
    type: String,
    unique: true,
    required: true,
  },
  password: {
    type: String,
    required: true,
    select: false,
  },
});

// Encrypt password using bcrypt
adminSchema.pre('save', async function (next) {
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
})

// Sign JWT and return
adminSchema.methods.getSignedJwtToken = function () {
  return jwt.sign({ id: this._id }, '1q2w3e4r123@', {
    expiresIn: '1d'
  });
};

// Match admin entered password to hashed password in database 
adminSchema.methods.matchPassword = async function (enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password)
}

module.exports = mongoose.model('Admin', adminSchema);
