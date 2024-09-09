const validatePassword = (password) => {
    if (!password) return 'Password is required';
  
    const errors = [];
  
    if (password.length < 8) {
      errors.push('Password must be at least 8 characters long');
    }
    if (!/[a-z]/.test(password)) {
      errors.push('Password must include at least one lowercase letter');
    }
    if (!/[A-Z]/.test(password)) {
      errors.push('Password must include at least one uppercase letter');
    }
    if (!/[!@#$%^&*]/.test(password)) {
      errors.push('Password must include at least one special character');
    }
  
    return errors.length > 0 ? errors.join(', ') : null;
  };

  export default validatePassword;