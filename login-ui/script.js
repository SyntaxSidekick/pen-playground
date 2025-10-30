// ======================
// Modern Login UI JavaScript
// ======================

class LoginUI {
  constructor() {
    this.init();
  }

  init() {
    this.bindEvents();
    this.setupFormValidation();
    this.addLoadingAnimations();
  }

  // ======================
  // Event Bindings
  // ======================
  bindEvents() {
    // Password toggle functionality
    const passwordToggle = document.getElementById('passwordToggle');
    const passwordInput = document.getElementById('password');
    const toggleIcon = document.getElementById('toggleIcon');

    if (passwordToggle && passwordInput && toggleIcon) {
      passwordToggle.addEventListener('click', () => {
        this.togglePasswordVisibility(passwordInput, toggleIcon);
      });
    }

    // Form submission
    const loginForm = document.getElementById('loginForm');
    if (loginForm) {
      loginForm.addEventListener('submit', (e) => {
        this.handleFormSubmit(e);
      });
    }

    // Input focus animations
    this.setupInputAnimations();

    // Social login buttons
    this.setupSocialLogins();
  }

  // ======================
  // Password Toggle
  // ======================
  togglePasswordVisibility(passwordInput, toggleIcon) {
    const isPassword = passwordInput.type === 'password';
    
    // Toggle input type
    passwordInput.type = isPassword ? 'text' : 'password';
    
    // Toggle icon with smooth transition
    toggleIcon.style.transform = 'scale(0.8)';
    
    setTimeout(() => {
      toggleIcon.className = isPassword ? 'fas fa-eye-slash' : 'fas fa-eye';
      toggleIcon.style.transform = 'scale(1)';
    }, 150);

    // Update aria-label for accessibility
    const button = passwordInput.parentElement.querySelector('.password-toggle');
    button.setAttribute('aria-label', 
      isPassword ? 'Hide password' : 'Show password'
    );

    // Add ripple effect
    this.createRippleEffect(button);
  }

  // ======================
  // Form Validation
  // ======================
  setupFormValidation() {
    const emailInput = document.getElementById('email');
    const passwordInput = document.getElementById('password');

    if (emailInput) {
      emailInput.addEventListener('blur', () => {
        this.validateEmail(emailInput);
      });

      emailInput.addEventListener('input', () => {
        this.clearValidationState(emailInput);
      });
    }

    if (passwordInput) {
      passwordInput.addEventListener('blur', () => {
        this.validatePassword(passwordInput);
      });

      passwordInput.addEventListener('input', () => {
        this.clearValidationState(passwordInput);
      });
    }
  }

  validateEmail(input) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const isValid = emailRegex.test(input.value);
    
    this.setValidationState(input, isValid, 'Please enter a valid email address');
    return isValid;
  }

  validatePassword(input) {
    const isValid = input.value.length >= 6;
    
    this.setValidationState(input, isValid, 'Password must be at least 6 characters');
    return isValid;
  }

  setValidationState(input, isValid, errorMessage) {
    const wrapper = input.closest('.input-wrapper');
    const formGroup = input.closest('.form-group');
    
    // Remove existing error message
    const existingError = formGroup.querySelector('.error-message');
    if (existingError) {
      existingError.remove();
    }

    if (!isValid && input.value.trim() !== '') {
      // Add error styling
      wrapper.style.borderColor = '#ef4444';
      input.style.borderColor = '#ef4444';
      
      // Add error message
      const errorDiv = document.createElement('div');
      errorDiv.className = 'error-message';
      errorDiv.textContent = errorMessage;
      errorDiv.style.cssText = `
        color: #ef4444;
        font-size: 0.75rem;
        margin-top: 0.25rem;
        opacity: 0;
        transform: translateY(-5px);
        transition: all 0.2s ease;
      `;
      
      formGroup.appendChild(errorDiv);
      
      // Animate in
      setTimeout(() => {
        errorDiv.style.opacity = '1';
        errorDiv.style.transform = 'translateY(0)';
      }, 10);
    } else if (isValid) {
      // Add success styling
      wrapper.style.borderColor = '#10b981';
      input.style.borderColor = '#10b981';
    }
  }

  clearValidationState(input) {
    const wrapper = input.closest('.input-wrapper');
    const formGroup = input.closest('.form-group');
    const errorMessage = formGroup.querySelector('.error-message');
    
    if (errorMessage) {
      errorMessage.remove();
    }
    
    wrapper.style.borderColor = '';
    input.style.borderColor = '';
  }

  // ======================
  // Form Submission
  // ======================
  handleFormSubmit(e) {
    e.preventDefault();
    
    const emailInput = document.getElementById('email');
    const passwordInput = document.getElementById('password');
    const submitButton = document.querySelector('.login-btn');
    
    // Validate all fields
    const isEmailValid = this.validateEmail(emailInput);
    const isPasswordValid = this.validatePassword(passwordInput);
    
    if (isEmailValid && isPasswordValid) {
      this.simulateLogin(submitButton);
    } else {
      // Shake animation for invalid form
      this.shakeForm();
    }
  }

  simulateLogin(button) {
    // Add loading state
    button.classList.add('loading');
    button.disabled = true;
    
    // Simulate API call
    setTimeout(() => {
      button.classList.remove('loading');
      button.disabled = false;
      
      // Success animation
      this.showSuccessMessage();
    }, 2000);
  }

  showSuccessMessage() {
    const card = document.querySelector('.login-card');
    const overlay = document.createElement('div');
    
    overlay.innerHTML = `
      <div style="
        position: absolute;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        background: rgba(16, 185, 129, 0.95);
        display: flex;
        align-items: center;
        justify-content: center;
        border-radius: 1.5rem;
        color: white;
        font-weight: 600;
        font-size: 1.125rem;
        z-index: 1000;
        opacity: 0;
        transform: scale(0.9);
        transition: all 0.3s ease;
      ">
        <div style="text-align: center;">
          <i class="fas fa-check-circle" style="font-size: 3rem; margin-bottom: 1rem;"></i>
          <div>Login Successful!</div>
        </div>
      </div>
    `;
    
    card.style.position = 'relative';
    card.appendChild(overlay);
    
    // Animate in
    setTimeout(() => {
      overlay.firstElementChild.style.opacity = '1';
      overlay.firstElementChild.style.transform = 'scale(1)';
    }, 10);
    
    // Remove after delay
    setTimeout(() => {
      overlay.remove();
    }, 2000);
  }

  shakeForm() {
    const card = document.querySelector('.login-card');
    card.style.animation = 'shake 0.5s ease-in-out';
    
    setTimeout(() => {
      card.style.animation = '';
    }, 500);
  }

  // ======================
  // Input Animations
  // ======================
  setupInputAnimations() {
    const inputs = document.querySelectorAll('input');
    
    inputs.forEach(input => {
      input.addEventListener('focus', () => {
        const wrapper = input.closest('.input-wrapper');
        wrapper.style.transform = 'scale(1.02)';
        wrapper.style.transition = 'transform 0.2s ease';
      });
      
      input.addEventListener('blur', () => {
        const wrapper = input.closest('.input-wrapper');
        wrapper.style.transform = 'scale(1)';
      });
    });
  }

  // ======================
  // Social Login Setup
  // ======================
  setupSocialLogins() {
    const socialButtons = document.querySelectorAll('.social-btn');
    
    socialButtons.forEach(button => {
      button.addEventListener('click', () => {
        const provider = button.classList.contains('google') ? 'Google' : 'GitHub';
        this.handleSocialLogin(provider, button);
      });
    });
  }

  handleSocialLogin(provider, button) {
    // Add loading state
    const originalContent = button.innerHTML;
    button.innerHTML = `<i class="fas fa-spinner fa-spin"></i> Connecting...`;
    button.disabled = true;
    
    // Simulate social login
    setTimeout(() => {
      button.innerHTML = originalContent;
      button.disabled = false;
      
      // Show message
      this.showToast(`${provider} login would open here in a real app!`);
    }, 1500);
  }

  // ======================
  // Utility Functions
  // ======================
  createRippleEffect(element) {
    const ripple = document.createElement('span');
    const rect = element.getBoundingClientRect();
    const size = Math.max(rect.width, rect.height);
    
    ripple.style.cssText = `
      position: absolute;
      top: 50%;
      left: 50%;
      width: ${size}px;
      height: ${size}px;
      background: rgba(99, 102, 241, 0.3);
      border-radius: 50%;
      transform: translate(-50%, -50%) scale(0);
      animation: ripple 0.6s ease-out;
      pointer-events: none;
    `;
    
    element.style.position = 'relative';
    element.style.overflow = 'hidden';
    element.appendChild(ripple);
    
    setTimeout(() => {
      ripple.remove();
    }, 600);
  }

  showToast(message) {
    const toast = document.createElement('div');
    toast.textContent = message;
    toast.style.cssText = `
      position: fixed;
      top: 20px;
      right: 20px;
      background: #374151;
      color: white;
      padding: 1rem 1.5rem;
      border-radius: 0.75rem;
      font-size: 0.875rem;
      font-weight: 500;
      z-index: 1000;
      opacity: 0;
      transform: translateX(100%);
      transition: all 0.3s ease;
      max-width: 300px;
    `;
    
    document.body.appendChild(toast);
    
    setTimeout(() => {
      toast.style.opacity = '1';
      toast.style.transform = 'translateX(0)';
    }, 10);
    
    setTimeout(() => {
      toast.style.opacity = '0';
      toast.style.transform = 'translateX(100%)';
      setTimeout(() => toast.remove(), 300);
    }, 3000);
  }

  addLoadingAnimations() {
    // Add CSS animations
    const style = document.createElement('style');
    style.textContent = `
      @keyframes shake {
        0%, 100% { transform: translateX(0); }
        25% { transform: translateX(-5px); }
        75% { transform: translateX(5px); }
      }
      
      @keyframes ripple {
        0% { transform: translate(-50%, -50%) scale(0); opacity: 1; }
        100% { transform: translate(-50%, -50%) scale(1); opacity: 0; }
      }
    `;
    document.head.appendChild(style);
  }
}

// ======================
// Initialize on DOM Load
// ======================
document.addEventListener('DOMContentLoaded', () => {
  new LoginUI();
});

// ======================
// Keyboard Shortcuts
// ======================
document.addEventListener('keydown', (e) => {
  // Enter key submits form when focused on inputs
  if (e.key === 'Enter' && (e.target.tagName === 'INPUT')) {
    const form = e.target.closest('form');
    if (form) {
      form.dispatchEvent(new Event('submit'));
    }
  }
  
  // Escape key clears focus
  if (e.key === 'Escape') {
    document.activeElement.blur();
  }
});