const User = require('../models/Users');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

// Validation helper
const validateEmail = (email) => {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
};

const validatePassword = (password) => {
    return password && password.length >= 6;
};

// Đăng ký
exports.register = async (req, res) => {
    const { name, email, password } = req.body;
    
    try {
        // Validation
        if (!name || !email || !password) {
            return res.status(400).json({ 
                message: 'Vui lòng điền đầy đủ thông tin' 
            });
        }

        if (!validateEmail(email)) {
            return res.status(400).json({ 
                message: 'Email không hợp lệ' 
            });
        }

        if (!validatePassword(password)) {
            return res.status(400).json({ 
                message: 'Mật khẩu phải có ít nhất 6 ký tự' 
            });
        }

        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ message: 'Email đã tồn tại' });
        }

        const hashedPassword = await bcrypt.hash(password, 12);
        const newUser = new User({ name, email, password: hashedPassword });
        await newUser.save();

        res.status(201).json({ 
            message: 'Đăng ký thành công',
            user: { id: newUser._id, name: newUser.name, email: newUser.email }
        });
    } catch (err) {
        console.error('Register error:', err);
        res.status(500).json({ message: 'Lỗi server' });
    }
};

// Đăng nhập
exports.login = async (req, res) => {
    const { email, password } = req.body;
    
    try {
        // Validation
        if (!email || !password) {
            return res.status(400).json({ 
                message: 'Vui lòng điền email và mật khẩu' 
            });
        }

        const user = await User.findOne({ email });
        if (!user) {
            return res.status(401).json({ message: 'Thông tin đăng nhập không đúng' });
        }

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(401).json({ message: 'Thông tin đăng nhập không đúng' });
        }

        const token = jwt.sign(
            { id: user._id, email: user.email }, 
            process.env.JWT_ACCESS_TOKEN_SECRET, 
            { expiresIn: '7d' }
        );

        res.json({
            message: 'Đăng nhập thành công',
            token,
            user: { 
                id: user._id, 
                name: user.name, 
                email: user.email,
                ACCESS:process.env.JWT_ACCESS_TOKEN_SECRET
            },
        });
    } catch (err) {
        console.error('Login error:', err);
        res.status(500).json({ message: 'Lỗi server' });
    }
};