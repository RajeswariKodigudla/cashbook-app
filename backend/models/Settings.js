const mongoose = require('mongoose');

const settingsSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
    unique: true
  },
  language: {
    type: String,
    default: 'English'
  },
  reminder: {
    type: Boolean,
    default: false
  },
  currency: {
    type: String,
    default: 'None'
  },
  theme: {
    type: String,
    default: 'Peacock'
  },
  keepScreenOn: {
    type: Boolean,
    default: false
  },
  numberFormat: {
    type: String,
    default: '1,000,000.00'
  },
  timeFormat: {
    type: String,
    default: '12 Hour'
  },
  firstDay: {
    type: String,
    default: 'Sunday'
  },
  version: {
    type: String,
    default: '1.4'
  }
}, {
  timestamps: true
});

module.exports = mongoose.model('Settings', settingsSchema);

