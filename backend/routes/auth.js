const express = require('express');
const jwt = require('jsonwebtoken');
const { body, validationResult } = require('express-validator');
const User = require('../models/User');
const Settings = require('../models/Settings');
const auth = require('../middleware/auth');

const router = express.Router();

// Generate JWT token
const generateToken = (userId) => {
  return jwt.sign({ userId }, process.env.JWT_SECRET || 'your_jwt_secret_key_here', {
    expiresIn: '30d'
  });
};

// @route   POST /api/auth/register
// @desc    Register a new user
// @access  Public
router.post(
  '/register',
  [
    body('username').trim().isLength({ min: 3 }).withMessage('Username must be at least 3 characters'),
    body('email').isEmail().withMessage('Please provide a valid email'),
    body('password').isLength({ min: 6 }).withMessage('Password must be at least 6 characters')
  ],
  async (req, res) => {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }

      const { username, email, password } = req.body;

      // Check if user already exists
      let user = await User.findOne({ $or: [{ email }, { username }] });
      if (user) {
        return res.status(400).json({ message: 'User already exists' });
      }

      // Create new user
      user = new User({ username, email, password });
      await user.save();

      // Create default settings for user
      const defaultSettings = new Settings({
        userId: user._id,
        language: 'English',
        reminder: false,
        currency: 'None',
        theme: 'Peacock',
        keepScreenOn: false,
        numberFormat: '1,000,000.00',
        timeFormat: '12 Hour',
        firstDay: 'Sunday',
        version: '1.4'
      });
      await defaultSettings.save();

      const token = generateToken(user._id);

      res.status(201).json({
        token,
        user: {
          id: user._id,
          username: user.username,
          email: user.email
        }
      });
    } catch (error) {
      console.error('Register error:', error);
      res.status(500).json({ message: 'Server error' });
    }
  }
);

// @route   POST /api/auth/login
// @desc    Login user
// @access  Public
router.post(
  '/login',
  [
    body('email').isEmail().withMessage('Please provide a valid email'),
    body('password').exists().withMessage('Password is required')
  ],
  async (req, res) => {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }

      const { email, password } = req.body;

      // Check if user exists
      const user = await User.findOne({ email });
      if (!user) {
        return res.status(400).json({ message: 'Invalid credentials' });
      }

      // Check password
      const isMatch = await user.comparePassword(password);
      if (!isMatch) {
        return res.status(400).json({ message: 'Invalid credentials' });
      }

      const token = generateToken(user._id);

      res.json({
        token,
        user: {
          id: user._id,
          username: user.username,
          email: user.email
        }
      });
    } catch (error) {
      console.error('Login error:', error);
      res.status(500).json({ message: 'Server error' });
    }
  }
);

// @route   GET /api/auth/me
// @desc    Get current user
// @access  Private
router.get('/me', auth, async (req, res) => {
  try {
    res.json({
      user: {
        id: req.user._id,
        username: req.user.username,
        email: req.user.email
      }
    });
  } catch (error) {
    console.error('Get user error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// @route   POST /api/auth/app-lock
// @desc    Set app lock password
// @access  Private
router.post(
  '/app-lock',
  auth,
  [
    body('password').isLength({ min: 4 }).withMessage('Password must be at least 4 characters')
  ],
  async (req, res) => {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }

      const { password } = req.body;
      const user = await User.findById(req.user._id);
      user.appLockPassword = password;
      await user.save();

      res.json({ message: 'App lock password set successfully' });
    } catch (error) {
      console.error('Set app lock error:', error);
      res.status(500).json({ message: 'Server error' });
    }
  }
);

// @route   POST /api/auth/verify-app-lock
// @desc    Verify app lock password
// @access  Private
router.post(
  '/verify-app-lock',
  auth,
  [
    body('password').exists().withMessage('Password is required')
  ],
  async (req, res) => {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }

      const { password } = req.body;
      const user = await User.findById(req.user._id);

      if (!user.appLockPassword) {
        return res.status(400).json({ message: 'App lock not set' });
      }

      const isMatch = await user.compareAppLockPassword(password);
      if (!isMatch) {
        return res.status(400).json({ message: 'Invalid password' });
      }

      res.json({ message: 'Password verified' });
    } catch (error) {
      console.error('Verify app lock error:', error);
      res.status(500).json({ message: 'Server error' });
    }
  }
);

// @route   DELETE /api/auth/app-lock
// @desc    Remove app lock password
// @access  Private
router.delete('/app-lock', auth, async (req, res) => {
  try {
    const user = await User.findById(req.user._id);
    user.appLockPassword = null;
    await user.save();

    res.json({ message: 'App lock removed successfully' });
  } catch (error) {
    console.error('Remove app lock error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;

