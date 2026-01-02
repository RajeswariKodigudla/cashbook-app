const express = require('express');
const Account = require('../models/Account');
const Transaction = require('../models/Transaction');
const Note = require('../models/Note');
const Settings = require('../models/Settings');
const auth = require('../middleware/auth');

const router = express.Router();

// All routes require authentication
router.use(auth);

// @route   GET /api/backup
// @desc    Get all user data for backup
// @access  Private
router.get('/', async (req, res) => {
  try {
    const userId = req.user._id;

    const [accounts, transactions, notes, settings] = await Promise.all([
      Account.find({ userId }),
      Transaction.find({ userId }),
      Note.find({ userId }),
      Settings.findOne({ userId })
    ]);

    const backupData = {
      accounts,
      transactions,
      notes,
      settings: settings || null,
      backupDate: new Date().toISOString(),
      version: '1.4'
    };

    res.json(backupData);
  } catch (error) {
    console.error('Backup error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// @route   POST /api/backup/restore
// @desc    Restore user data from backup
// @access  Private
router.post('/restore', async (req, res) => {
  try {
    const userId = req.user._id;
    const { accounts, transactions, notes, settings } = req.body;

    // Validate backup data
    if (!accounts || !transactions || !notes) {
      return res.status(400).json({ message: 'Invalid backup data' });
    }

    // Delete existing data
    await Promise.all([
      Account.deleteMany({ userId }),
      Transaction.deleteMany({ userId }),
      Note.deleteMany({ userId }),
      Settings.deleteOne({ userId })
    ]);

    // Restore accounts
    if (Array.isArray(accounts) && accounts.length > 0) {
      const accountsToInsert = accounts.map((account) => ({
        ...account,
        userId,
        _id: undefined
      }));
      await Account.insertMany(accountsToInsert);
    }

    // Restore transactions
    if (Array.isArray(transactions) && transactions.length > 0) {
      const transactionsToInsert = transactions.map((transaction) => ({
        ...transaction,
        userId,
        _id: undefined
      }));
      await Transaction.insertMany(transactionsToInsert);
    }

    // Restore notes
    if (Array.isArray(notes) && notes.length > 0) {
      const notesToInsert = notes.map((note) => ({
        ...note,
        userId,
        _id: undefined
      }));
      await Note.insertMany(notesToInsert);
    }

    // Restore settings
    if (settings) {
      const settingsToInsert = {
        ...settings,
        userId,
        _id: undefined
      };
      await Settings.create(settingsToInsert);
    }

    res.json({ message: 'Data restored successfully' });
  } catch (error) {
    console.error('Restore error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;

