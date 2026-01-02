// Frontend error handling utility
export const handleApiError = (error) => {
  // Network error
  if (!error.response) {
    return {
      message: 'Network error. Please check your connection.',
      type: 'network'
    };
  }

  // Server responded with error
  const status = error.response.status;
  const data = error.response.data;

  switch (status) {
    case 400:
      return {
        message: data.message || 'Invalid request. Please check your input.',
        type: 'validation',
        errors: data.errors
      };
    case 401:
      return {
        message: 'Your session has expired. Please login again.',
        type: 'authentication',
        shouldRedirect: true
      };
    case 403:
      return {
        message: 'You do not have permission to perform this action.',
        type: 'authorization'
      };
    case 404:
      return {
        message: 'Resource not found.',
        type: 'notFound'
      };
    case 422:
      return {
        message: data.message || 'Validation error.',
        type: 'validation',
        errors: data.errors
      };
    case 500:
      return {
        message: 'Server error. Please try again later.',
        type: 'server'
      };
    default:
      return {
        message: data.message || 'An unexpected error occurred.',
        type: 'unknown'
      };
  }
};

export const showError = (error, toast) => {
  const errorInfo = handleApiError(error);
  
  if (errorInfo.shouldRedirect) {
    // Redirect to login
    setTimeout(() => {
      window.location.href = '/login';
    }, 2000);
  }
  
  if (toast) {
    toast.error(errorInfo.message);
  } else {
    alert(errorInfo.message);
  }
  
  return errorInfo;
};

