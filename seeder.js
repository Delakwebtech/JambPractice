const mongoose = require('mongoose');
const fs = require('fs');
const path = require('path');
const dotenv = require('dotenv');

// Load env vars
dotenv.config({path: './config/config.env'});

// Load models
const Student = require('./Models/Student'); // Import your Student model
const Admin = require('./Models/Admin');   // Import your Admin model

// Connect to DB
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
});

// Read JSON file
const admin = JSON.parse(fs.readFileSync(`${__dirname}/data/admin.json`, 'utf-8'));
const students = JSON.parse(fs.readFileSync(`${__dirname}/data/students.json`, 'utf-8'));
const subjects = JSON.parse(fs.readFileSync(`${__dirname}/data/subjects.json`, 'utf-8'));


// Import into DB
const importData = async () => {
  try {
      await admin.create(admin);
      await students.create(students);
      await subjects.create(subjects);

      console.log('Data Imported....');
      process.exit();
  } catch (err) {
      console.log(err);
  }
};

// Delete data
const deleteData = async () => {
  try {
      await admin.deleteMany();
      await students.deleteMany();
      await subjects.deleteMany();

      console.log('Data Destroyed....');
      process.exit();
  } catch (err) {
      console.log(err);
  }
};

if (process.argv[2] === '-i') {
  importData();
} else if (process.argv[2] === '-d') {
  deleteData();
}
