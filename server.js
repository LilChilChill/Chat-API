const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(bodyParser.json());

// Kết nối đến MongoDB
mongoose.connect('mongodb://localhost:27017/chatapp') // Thay đổi URL này nếu sử dụng MongoDB Atlas
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.log(err));


const messageRoutes = require('./routes/messages');
const authRoutes = require('./routes/auth');

app.use('/api/messages', messageRoutes);
app.use('/api/auth', authRoutes);


// Khởi động server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

