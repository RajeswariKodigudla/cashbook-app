const express = require('express');
const Settings = require('../models/Settings');
const auth = require('../middleware/auth');

const router = express.Router();

// All routes require authentication
router.use(auth);

// @route   GET /api/settings
// @desc    Get user settings
// @access  Private
router.get('/', async (req, res) => {
  try {
    let settings = await Settings.findOne({ userId: req.user._id });

    // Create default settings if not found
    if (!settings) {
      settings = new Settings({
        userId: req.user._id,
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
      await settings.save();
    }

    res.json(settings);
  } catch (error) {
    console.error('Get settings error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// @route   PUT /api/settings
// @desc    Update user settings
// @access  Private
router.put('/', async (req, res) => {
  try {
    let settings = await Settings.findOne({ userId: req.user._id });

    // Create settings if not found
    if (!settings) {
      settings = new Settings({ userId: req.user._id });
    }

    // Update allowed fields
    const allowedUpdates = [
      'language',
      'reminder',
      'currency',
      'theme',
      'keepScreenOn',
      'numberFormat',
      'timeFormat',
      'firstDay',
      'version'
    ];

    allowedUpdates.forEach((field) => {
      if (req.body[field] !== undefined) {
        settings[field] = req.body[field];
      }
    });

    await settings.save();
    res.json(settings);
  } catch (error) {
    console.error('Update settings error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;

