const express = require('express');
const router = express.Router();
const Message = require('../models/Message');

// Lấy tất cả tin nhắn
router.get('/', async (req, res) => {
  try {
    const messages = await Message.find();
    res.json(messages);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Gửi tin nhắn
router.post('/', async (req, res) => {
  const message = new Message({
    sender: req.body.sender,
    receiver: req.body.receiver,
    content: req.body.content,
  });

  try {
    const newMessage = await message.save();
    res.status(201).json(newMessage);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

module.exports = router;
