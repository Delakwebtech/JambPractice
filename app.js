const express = require('express');
const mongoose = require('mongoose');
const app = express();
const cookieParser = require('cookie-parser');

// Middleware
app.use(express.json());

// Cookie Parser
app.use(cookieParser());

// Database connection
mongoose.connect('mongodb+srv://delak123:delak123@cluster0.0ejntpw.mongodb.net/jambPortal?', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
  .then(() => console.log('Connected to MongoDB'))
  .catch(err => console.error('Error connecting to MongoDB:', err));

// Routes
const authRoutes = require('./routes/authRoutes');
const examRoutes = require('./routes/examRoutes');
const resultRoutes = require('./routes/resultRoutes');

app.use('/auth', authRoutes);
app.use('/exam', examRoutes);
app.use('/', resultRoutes);

const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
