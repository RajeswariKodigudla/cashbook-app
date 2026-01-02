const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true,
    trim: true,
    minlength: 3,
    maxlength: 30
  },
  email: {
    type: String,
    required: true,
    unique: true,
    trim: true,
    lowercase: true
  },
  password: {
    type: String,
    required: true,
    minlength: 6
  },
  appLockPassword: {
    type: String,
    default: null
  }
}, {
  timestamps: true
});

// Hash password before saving
userSchema.pre('save', async function(next) {
  if (!this.isModified('password')) return next();
  this.password = await bcrypt.hash(this.password, 10);
  next();
});

// Hash app lock password before saving
userSchema.pre('save', async function(next) {
  if (!this.isModified('appLockPassword') || !this.appLockPassword) return next();
  this.appLockPassword = await bcrypt.hash(this.appLockPassword, 10);
  next();
});

// Compare password method
userSchema.methods.comparePassword = async function(candidatePassword) {
  return await bcrypt.compare(candidatePassword, this.password);
};

// Compare app lock password method
userSchema.methods.compareAppLockPassword = async function(candidatePassword) {
  if (!this.appLockPassword) return false;
  return await bcrypt.compare(candidatePassword, this.appLockPassword);
};

module.exports = mongoose.model('User', userSchema);

