const mongoose = require('mongoose');

const accountSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  name: {
    type: String,
    required: true,
    trim: true
  },
  created: {
    type: String,
    required: true
  }
}, {
  timestamps: true
});

// Index for faster queries
accountSchema.index({ userId: 1 });

module.exports = mongoose.model('Account', accountSchema);

