const mongoose = require('mongoose');
const fs = require('fs');
const path = require('path');

// Connect to your MongoDB database
mongoose.connect('mongodb+srv://delak123:delak123@cluster0.0ejntpw.mongodb.net/jambPortal?', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

// Define your MongoDB models (Student and Result)
const Student = require('./Models/Student'); // Import your Student model
const Admin = require('./Models/Admin');   // Import your Admin model

// Directory where your JSON files are located
const dataDirectory = path.join(__dirname, 'data');

// Function to read and load JSON files
const loadJSONFiles = async (directory) => {
  const files = fs.readdirSync(directory);
  for (const file of files) {
    if (file.endsWith('.json')) {
      const data = JSON.parse(fs.readFileSync(path.join(directory, file), 'utf8'));
      if (file === 'students.json') {
        await Student.create(data); // Load data into Student model
        console.log(`Loaded data from ${file} into Student model.`);
      } else if (file === 'admin.json') {
        await Admin.create(data); // Load data into Result model
        console.log(`Loaded data from ${file} into Admin model.`);
      }
    }
  }
};

// Call the function to load JSON files into the database
loadJSONFiles(dataDirectory);
