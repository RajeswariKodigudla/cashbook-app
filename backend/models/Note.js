const mongoose = require('mongoose');

const noteSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  text: {
    type: String,
    required: true,
    trim: true
  },
  createdAt: {
    type: String,
    required: true
  }
}, {
  timestamps: true
});

// Index for faster queries
noteSchema.index({ userId: 1 });

module.exports = mongoose.model('Note', noteSchema);

