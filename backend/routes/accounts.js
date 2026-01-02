const express = require('express');
const { body, validationResult } = require('express-validator');
const Account = require('../models/Account');
const auth = require('../middleware/auth');

const router = express.Router();

// All routes require authentication
router.use(auth);

// @route   GET /api/accounts
// @desc    Get all accounts for user
// @access  Private
router.get('/', async (req, res) => {
  try {
    const accounts = await Account.find({ userId: req.user._id }).sort({ createdAt: -1 });
    res.json(accounts);
  } catch (error) {
    console.error('Get accounts error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// @route   GET /api/accounts/:id
// @desc    Get single account
// @access  Private
router.get('/:id', async (req, res) => {
  try {
    const account = await Account.findOne({ _id: req.params.id, userId: req.user._id });
    if (!account) {
      return res.status(404).json({ message: 'Account not found' });
    }
    res.json(account);
  } catch (error) {
    console.error('Get account error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// @route   POST /api/accounts
// @desc    Create a new account
// @access  Private
router.post(
  '/',
  [
    body('name').trim().notEmpty().withMessage('Account name is required')
  ],
  async (req, res) => {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }

      const { name } = req.body;

      // Check if account with same name already exists
      const existingAccount = await Account.findOne({ 
        userId: req.user._id, 
        name: name.trim() 
      });
      if (existingAccount) {
        return res.status(400).json({ message: 'Account with this name already exists' });
      }

      const created = new Date().toLocaleString('en-GB', {
        day: '2-digit',
        month: 'short',
        year: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
        hour12: true
      });

      const account = new Account({
        userId: req.user._id,
        name: name.trim(),
        created
      });

      await account.save();
      res.status(201).json(account);
    } catch (error) {
      console.error('Create account error:', error);
      res.status(500).json({ message: 'Server error' });
    }
  }
);

// @route   PUT /api/accounts/:id
// @desc    Update an account
// @access  Private
router.put(
  '/:id',
  [
    body('name').trim().notEmpty().withMessage('Account name is required')
  ],
  async (req, res) => {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }

      const { name } = req.body;
      const account = await Account.findOne({ _id: req.params.id, userId: req.user._id });

      if (!account) {
        return res.status(404).json({ message: 'Account not found' });
      }

      // Check if another account with same name exists
      const existingAccount = await Account.findOne({ 
        userId: req.user._id, 
        name: name.trim(),
        _id: { $ne: req.params.id }
      });
      if (existingAccount) {
        return res.status(400).json({ message: 'Account with this name already exists' });
      }

      account.name = name.trim();
      await account.save();

      res.json(account);
    } catch (error) {
      console.error('Update account error:', error);
      res.status(500).json({ message: 'Server error' });
    }
  }
);

// @route   DELETE /api/accounts/:id
// @desc    Delete an account
// @access  Private
router.delete('/:id', async (req, res) => {
  try {
    const account = await Account.findOne({ _id: req.params.id, userId: req.user._id });

    if (!account) {
      return res.status(404).json({ message: 'Account not found' });
    }

    await Account.deleteOne({ _id: req.params.id });
    res.json({ message: 'Account deleted successfully' });
  } catch (error) {
    console.error('Delete account error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;

