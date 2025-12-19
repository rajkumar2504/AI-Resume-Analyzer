const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const analyzeRoutes = require('./routes/analyze');
// const { connectDB } = require('./config/db'); // Uncomment to use DB

dotenv.config();

// connectDB(); // Uncomment to use DB

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

// Routes
app.use('/api/analyze', analyzeRoutes);

app.get('/', (req, res) => {
  res.send('AI Resume Analyzer API is running');
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
