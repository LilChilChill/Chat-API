const express = require('express');
const bcrypt = require('bcrypt');
const User = require('../models/User');
const router = express.Router();

// Đăng ký người dùng mới
router.post('/register', async (req, res) => {
    const { email, password } = req.body;

    try {
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ message: 'Email đã tồn tại.' });
        }

        const hashedPassword = await bcrypt.hash(password, 10);
        const newUser = new User({ email, password: hashedPassword });
        await newUser.save();

        res.status(201).json({ message: 'Đăng ký thành công!' });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Đã xảy ra lỗi.' });
    }
});

// Đăng nhập người dùng
router.post('/login', async (req, res) => {
    const { email, password } = req.body;

    try {
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(404).json({ message: 'Người dùng không tồn tại.' });
        }

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({ message: 'Mật khẩu không đúng.' });
        }

        res.status(200).json({ message: 'Đăng nhập thành công!' });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Đã xảy ra lỗi.' });
    }
});

// Lấy thông tin người dùng
router.get('/user', async (req, res) => {
    const { email } = req.query; // Nhận email từ query string

    try {
        const user = await User.findOne({ email }, 'username'); // Chỉ lấy trường username
        if (!user) {
            return res.status(404).json({ message: 'Người dùng không tồn tại.' });
        }
        res.status(200).json(user);
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Đã xảy ra lỗi.' });
    }
});

// Cập nhật tên người dùng
router.post('/user/update', async (req, res) => {
    const { email, username } = req.body;

    try {
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(404).json({ message: 'Người dùng không tồn tại.' });
        }

        user.username = username; // Cập nhật tên người dùng
        await user.save();

        res.status(200).json({ message: 'Tên người dùng đã được cập nhật!', username });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Đã xảy ra lỗi.' });
    }
});

module.exports = router;
