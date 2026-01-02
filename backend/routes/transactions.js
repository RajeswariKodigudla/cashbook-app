const express = require('express');
const { body, validationResult, query } = require('express-validator');
const Transaction = require('../models/Transaction');
const auth = require('../middleware/auth');

const router = express.Router();

// All routes require authentication
router.use(auth);

// @route   GET /api/transactions
// @desc    Get all transactions for user with optional filters
// @access  Private
router.get(
  '/',
  [
    query('account').optional().isString(),
    query('type').optional().isIn(['income', 'expense']),
    query('startDate').optional().isISO8601(),
    query('endDate').optional().isISO8601(),
    query('limit').optional().isInt({ min: 1, max: 1000 }),
    query('skip').optional().isInt({ min: 0 })
  ],
  async (req, res) => {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }

      const { account, type, startDate, endDate, limit = 100, skip = 0 } = req.query;

      // Build query
      const query = { userId: req.user._id };
      if (account) query.account = account;
      if (type) query.type = type;
      if (startDate || endDate) {
        query.date = {};
        if (startDate) query.date.$gte = startDate;
        if (endDate) query.date.$lte = endDate;
      }

      const transactions = await Transaction.find(query)
        .sort({ date: -1, time: -1 })
        .limit(parseInt(limit))
        .skip(parseInt(skip));

      const total = await Transaction.countDocuments(query);

      res.json({
        transactions,
        total,
        limit: parseInt(limit),
        skip: parseInt(skip)
      });
    } catch (error) {
      console.error('Get transactions error:', error);
      res.status(500).json({ message: 'Server error' });
    }
  }
);

// @route   GET /api/transactions/summary
// @desc    Get transaction summary
// @access  Private
router.get(
  '/summary',
  [
    query('account').optional().isString(),
    query('startDate').optional().isISO8601(),
    query('endDate').optional().isISO8601()
  ],
  async (req, res) => {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }

      const { account, startDate, endDate } = req.query;

      // Build query
      const query = { userId: req.user._id };
      if (account) query.account = account;
      if (startDate || endDate) {
        query.date = {};
        if (startDate) query.date.$gte = startDate;
        if (endDate) query.date.$lte = endDate;
      }

      const transactions = await Transaction.find(query);

      const summary = transactions.reduce(
        (acc, transaction) => {
          if (transaction.type === 'income') {
            acc.totalIncome += transaction.amount;
          } else {
            acc.totalExpense += transaction.amount;
          }
          return acc;
        },
        { totalIncome: 0, totalExpense: 0 }
      );

      summary.balance = summary.totalIncome - summary.totalExpense;

      res.json(summary);
    } catch (error) {
      console.error('Get summary error:', error);
      res.status(500).json({ message: 'Server error' });
    }
  }
);

// @route   GET /api/transactions/:id
// @desc    Get single transaction
// @access  Private
router.get('/:id', async (req, res) => {
  try {
    const transaction = await Transaction.findOne({
      _id: req.params.id,
      userId: req.user._id
    });

    if (!transaction) {
      return res.status(404).json({ message: 'Transaction not found' });
    }

    res.json(transaction);
  } catch (error) {
    console.error('Get transaction error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// @route   POST /api/transactions
// @desc    Create a new transaction
// @access  Private
router.post(
  '/',
  [
    body('type').isIn(['income', 'expense']).withMessage('Type must be income or expense'),
    body('amount').isFloat({ min: 0 }).withMessage('Amount must be a positive number'),
    body('date').notEmpty().withMessage('Date is required'),
    body('time').notEmpty().withMessage('Time is required'),
    body('account').notEmpty().withMessage('Account is required'),
    body('payment').optional().isIn(['Cash', 'Online', 'Other'])
  ],
  async (req, res) => {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }

      const {
        type,
        amount,
        date,
        time,
        account,
        name = '',
        category = '',
        remark = '',
        payment = 'Cash'
      } = req.body;

      const transaction = new Transaction({
        userId: req.user._id,
        type,
        amount: parseFloat(amount),
        date,
        time,
        account,
        name,
        category,
        remark,
        payment
      });

      await transaction.save();
      res.status(201).json(transaction);
    } catch (error) {
      console.error('Create transaction error:', error);
      res.status(500).json({ message: 'Server error' });
    }
  }
);

// @route   PUT /api/transactions/:id
// @desc    Update a transaction
// @access  Private
router.put(
  '/:id',
  [
    body('type').optional().isIn(['income', 'expense']),
    body('amount').optional().isFloat({ min: 0 }),
    body('payment').optional().isIn(['Cash', 'Online', 'Other'])
  ],
  async (req, res) => {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }

      const transaction = await Transaction.findOne({
        _id: req.params.id,
        userId: req.user._id
      });

      if (!transaction) {
        return res.status(404).json({ message: 'Transaction not found' });
      }

      // Update allowed fields
      const allowedUpdates = ['type', 'amount', 'date', 'time', 'account', 'name', 'category', 'remark', 'payment'];
      allowedUpdates.forEach((field) => {
        if (req.body[field] !== undefined) {
          transaction[field] = req.body[field];
        }
      });

      if (req.body.amount !== undefined) {
        transaction.amount = parseFloat(req.body.amount);
      }

      await transaction.save();
      res.json(transaction);
    } catch (error) {
      console.error('Update transaction error:', error);
      res.status(500).json({ message: 'Server error' });
    }
  }
);

// @route   DELETE /api/transactions/:id
// @desc    Delete a transaction
// @access  Private
router.delete('/:id', async (req, res) => {
  try {
    const transaction = await Transaction.findOne({
      _id: req.params.id,
      userId: req.user._id
    });

    if (!transaction) {
      return res.status(404).json({ message: 'Transaction not found' });
    }

    await Transaction.deleteOne({ _id: req.params.id });
    res.json({ message: 'Transaction deleted successfully' });
  } catch (error) {
    console.error('Delete transaction error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;

