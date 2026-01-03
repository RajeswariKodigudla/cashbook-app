// Form validation utilities

export const validateTransaction = (data) => {
  const errors = {};

  if (!data.amount || data.amount <= 0) {
    errors.amount = 'Amount must be greater than 0';
  }

  if (!data.date) {
    errors.date = 'Date is required';
  }

  if (!data.type || !['income', 'expense'].includes(data.type)) {
    errors.type = 'Type must be income or expense';
  }

  if (!data.account || data.account.trim() === '') {
    errors.account = 'Account is required';
  }

  if (data.time && !/^([0-1][0-9]|2[0-3]):[0-5][0-9]$/.test(data.time)) {
    errors.time = 'Invalid time format (use HH:MM)';
  }

  return {
    isValid: Object.keys(errors).length === 0,
    errors
  };
};

export const validateAccount = (data) => {
  const errors = {};

  if (!data.name || data.name.trim() === '') {
    errors.name = 'Account name is required';
  }

  if (data.name && data.name.length < 2) {
    errors.name = 'Account name must be at least 2 characters';
  }

  if (data.name && data.name.length > 50) {
    errors.name = 'Account name must be less than 50 characters';
  }

  return {
    isValid: Object.keys(errors).length === 0,
    errors
  };
};

export const validateNote = (data) => {
  const errors = {};

  if (!data.text || data.text.trim() === '') {
    errors.text = 'Note text is required';
  }

  if (data.text && data.text.length > 1000) {
    errors.text = 'Note must be less than 1000 characters';
  }

  return {
    isValid: Object.keys(errors).length === 0,
    errors
  };
};

export const validateEmail = (email) => {
  const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return re.test(email);
};

export const validatePassword = (password) => {
  const errors = [];

  if (password.length < 6) {
    errors.push('Password must be at least 6 characters');
  }

  if (password.length > 50) {
    errors.push('Password must be less than 50 characters');
  }

  return {
    isValid: errors.length === 0,
    errors
  };
};


