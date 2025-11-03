/* ==============================
   Material Design 3 UI Kit JavaScript
   ============================== */

// Dark Mode Toggle Functionality
document.addEventListener('DOMContentLoaded', function() {
  const darkModeToggle = document.getElementById('darkModeToggle');
  const body = document.body;
  
  // Check for saved theme preference or default to light mode
  const savedTheme = localStorage.getItem('theme') || 'light';
  body.setAttribute('data-theme', savedTheme);
  darkModeToggle.checked = savedTheme === 'dark';
  
  // Toggle theme
  darkModeToggle.addEventListener('change', function() {
    const theme = this.checked ? 'dark' : 'light';
    body.setAttribute('data-theme', theme);
    localStorage.setItem('theme', theme);
  });
});

// Navigation Tab Functionality
document.addEventListener('DOMContentLoaded', function() {
  const navTabs = document.querySelectorAll('.nav-tab');
  const componentSections = document.querySelectorAll('.component-section');
  
  navTabs.forEach(tab => {
    tab.addEventListener('click', function() {
      const targetSection = this.dataset.section;
      
      // Remove active class from all tabs and sections
      navTabs.forEach(t => t.classList.remove('active'));
      componentSections.forEach(s => s.classList.remove('active'));
      
      // Add active class to clicked tab and corresponding section
      this.classList.add('active');
      document.getElementById(targetSection).classList.add('active');
    });
  });
});

// Code Block Toggle Functionality
function toggleCode(button) {
  const codeBlock = button.parentElement.querySelector('.code-block');
  const icon = button.querySelector('.material-icons');
  
  if (codeBlock.classList.contains('show')) {
    codeBlock.classList.remove('show');
    icon.textContent = 'code';
  } else {
    codeBlock.classList.add('show');
    icon.textContent = 'code_off';
  }
}

// Icon Button Toggle Functionality
document.addEventListener('DOMContentLoaded', function() {
  const toggleButtons = document.querySelectorAll('.md-icon-btn-toggle');
  
  toggleButtons.forEach(button => {
    button.addEventListener('click', function() {
      const currentState = this.dataset.state === 'true';
      const newState = !currentState;
      this.dataset.state = newState.toString();
      
      const icon = this.querySelector('.material-icons');
      
      // Update icon based on button type and state
      if (icon.textContent === 'visibility_off' || icon.textContent === 'visibility') {
        icon.textContent = newState ? 'visibility' : 'visibility_off';
      } else if (icon.textContent === 'notifications_off' || icon.textContent === 'notifications') {
        icon.textContent = newState ? 'notifications' : 'notifications_off';
      } else if (icon.textContent === 'bookmark_border' || icon.textContent === 'bookmark') {
        icon.textContent = newState ? 'bookmark' : 'bookmark_border';
      }
    });
  });
});

// Dialog Functionality
function showDialog(dialogId) {
  const dialog = document.getElementById(dialogId);
  if (dialog) {
    dialog.style.display = 'flex';
    document.body.style.overflow = 'hidden';
    
    // Animate in
    requestAnimationFrame(() => {
      dialog.style.opacity = '1';
      const container = dialog.querySelector('.md-dialog-container');
      container.style.transform = 'scale(1)';
    });
  }
}

function hideDialog(dialogId) {
  const dialog = document.getElementById(dialogId);
  if (dialog) {
    // Animate out
    dialog.style.opacity = '0';
    const container = dialog.querySelector('.md-dialog-container');
    container.style.transform = 'scale(0.8)';
    
    setTimeout(() => {
      dialog.style.display = 'none';
      document.body.style.overflow = '';
    }, 200);
  }
}

// Snackbar Functionality
function showSnackbar(message, action = null, duration = 4000) {
  const container = document.getElementById('snackbar-container');
  
  const snackbar = document.createElement('div');
  snackbar.className = 'md-snackbar';
  snackbar.innerHTML = `
    <span class="md-snackbar-message">${message}</span>
    ${action ? `<button class="md-snackbar-action">${action}</button>` : ''}
    <button class="md-snackbar-close">
      <span class="material-icons">close</span>
    </button>
  `;
  
  container.appendChild(snackbar);
  
  // Animate in
  requestAnimationFrame(() => {
    snackbar.classList.add('show');
  });
  
  // Auto hide
  const autoHide = setTimeout(() => {
    hideSnackbar(snackbar);
  }, duration);
  
  // Manual close
  const closeBtn = snackbar.querySelector('.md-snackbar-close');
  closeBtn.addEventListener('click', () => {
    clearTimeout(autoHide);
    hideSnackbar(snackbar);
  });
  
  return snackbar;
}

function hideSnackbar(snackbar) {
  snackbar.classList.remove('show');
  setTimeout(() => {
    if (snackbar.parentNode) {
      snackbar.parentNode.removeChild(snackbar);
    }
  }, 300);
}

// Tab Functionality
document.addEventListener('DOMContentLoaded', function() {
  const tabs = document.querySelectorAll('.md-tab');
  
  tabs.forEach(tab => {
    tab.addEventListener('click', function() {
      const tabBar = this.closest('.md-tab-bar');
      const allTabs = tabBar.querySelectorAll('.md-tab');
      
      // Remove active class from all tabs
      allTabs.forEach(t => t.classList.remove('active'));
      
      // Add active class to clicked tab
      this.classList.add('active');
    });
  });
});

// Bottom Navigation Functionality
document.addEventListener('DOMContentLoaded', function() {
  const navItems = document.querySelectorAll('.md-bottom-nav-item');
  
  navItems.forEach(item => {
    item.addEventListener('click', function() {
      // Remove active class from all items
      navItems.forEach(i => i.classList.remove('active'));
      
      // Add active class to clicked item
      this.classList.add('active');
    });
  });
});

// Navigation Rail Functionality
document.addEventListener('DOMContentLoaded', function() {
  const railItems = document.querySelectorAll('.md-navigation-rail-item');
  
  railItems.forEach(item => {
    item.addEventListener('click', function(e) {
      e.preventDefault();
      
      // Remove active class from all items
      railItems.forEach(i => i.classList.remove('active'));
      
      // Add active class to clicked item
      this.classList.add('active');
    });
  });
});

// Navigation Drawer Functionality
document.addEventListener('DOMContentLoaded', function() {
  const drawerItems = document.querySelectorAll('.md-navigation-drawer-item');
  
  drawerItems.forEach(item => {
    item.addEventListener('click', function(e) {
      e.preventDefault();
      
      // Remove active class from all items
      drawerItems.forEach(i => i.classList.remove('active'));
      
      // Add active class to clicked item
      this.classList.add('active');
    });
  });
});

// Slider Functionality
document.addEventListener('DOMContentLoaded', function() {
  const sliders = document.querySelectorAll('.md-slider-input');
  
  sliders.forEach(slider => {
    const updateSlider = () => {
      const value = slider.value;
      const min = slider.min || 0;
      const max = slider.max || 100;
      const percentage = ((value - min) / (max - min)) * 100;
      
      const track = slider.parentElement.querySelector('.md-slider-active-track');
      const thumb = slider.parentElement.querySelector('.md-slider-thumb');
      const valueIndicator = thumb.querySelector('.md-slider-value-indicator');
      
      if (track) {
        track.style.width = `${percentage}%`;
      }
      
      if (thumb) {
        thumb.style.left = `${percentage}%`;
      }
      
      if (valueIndicator) {
        valueIndicator.textContent = value;
      }
    };
    
    slider.addEventListener('input', updateSlider);
    updateSlider(); // Initialize
  });
});

// Progress Indicators Animation
document.addEventListener('DOMContentLoaded', function() {
  const circularProgress = document.querySelectorAll('.md-progress-circular-bar');
  
  circularProgress.forEach(progress => {
    const circumference = 2 * Math.PI * 18; // radius is 18
    progress.style.strokeDasharray = circumference;
    
    // Animate to 65% (example)
    const targetProgress = 0.65;
    const strokeDashoffset = circumference * (1 - targetProgress);
    progress.style.strokeDashoffset = strokeDashoffset;
  });
});

// Chip Functionality
document.addEventListener('DOMContentLoaded', function() {
  const chipRemoveButtons = document.querySelectorAll('.md-chip-remove');
  
  chipRemoveButtons.forEach(button => {
    button.addEventListener('click', function(e) {
      e.stopPropagation();
      const chip = this.closest('.md-chip');
      
      // Animate out
      chip.style.transform = 'scale(0)';
      chip.style.opacity = '0';
      
      setTimeout(() => {
        if (chip.parentNode) {
          chip.parentNode.removeChild(chip);
        }
      }, 200);
    });
  });
});

// List Item Interaction
document.addEventListener('DOMContentLoaded', function() {
  const listItems = document.querySelectorAll('.md-list-item');
  
  listItems.forEach(item => {
    item.addEventListener('click', function() {
      // Add ripple effect
      const ripple = document.createElement('span');
      ripple.className = 'md-ripple';
      this.appendChild(ripple);
      
      setTimeout(() => {
        if (ripple.parentNode) {
          ripple.parentNode.removeChild(ripple);
        }
      }, 600);
    });
  });
});

// Keyboard Navigation Support
document.addEventListener('keydown', function(e) {
  // Escape key to close dialogs
  if (e.key === 'Escape') {
    const openDialogs = document.querySelectorAll('.md-dialog[style*="flex"]');
    openDialogs.forEach(dialog => {
      const dialogId = dialog.id;
      if (dialogId) {
        hideDialog(dialogId);
      }
    });
  }
  
  // Tab key navigation for better accessibility
  if (e.key === 'Tab') {
    // Enhanced focus management can be added here
  }
});

// Initialize tooltips (if any)
document.addEventListener('DOMContentLoaded', function() {
  const tooltipElements = document.querySelectorAll('[data-tooltip]');
  
  tooltipElements.forEach(element => {
    element.addEventListener('mouseenter', function() {
      const tooltip = document.createElement('div');
      tooltip.className = 'md-tooltip';
      tooltip.textContent = this.dataset.tooltip;
      tooltip.style.position = 'absolute';
      tooltip.style.zIndex = '1000';
      tooltip.style.background = 'var(--md-sys-color-surface-container-highest)';
      tooltip.style.color = 'var(--md-sys-color-on-surface)';
      tooltip.style.padding = '8px 12px';
      tooltip.style.borderRadius = 'var(--md-sys-shape-corner-small)';
      tooltip.style.fontSize = '12px';
      tooltip.style.whiteSpace = 'nowrap';
      tooltip.style.boxShadow = 'var(--md-sys-elevation-level2)';
      
      document.body.appendChild(tooltip);
      
      const rect = this.getBoundingClientRect();
      tooltip.style.left = rect.left + (rect.width / 2) - (tooltip.offsetWidth / 2) + 'px';
      tooltip.style.top = rect.bottom + 8 + 'px';
      
      this._tooltip = tooltip;
    });
    
    element.addEventListener('mouseleave', function() {
      if (this._tooltip) {
        document.body.removeChild(this._tooltip);
        this._tooltip = null;
      }
    });
  });
});

// Add CSS for additional components that need JavaScript styling
const additionalCSS = `
/* Snackbar Styles */
.md-snackbar-container {
  position: fixed;
  bottom: 16px;
  left: 16px;
  right: 16px;
  z-index: 1000;
  display: flex;
  flex-direction: column;
  gap: 8px;
  pointer-events: none;
}

.md-snackbar {
  background: var(--md-sys-color-surface-container);
  color: var(--md-sys-color-on-surface);
  padding: 14px 16px;
  border-radius: var(--md-sys-shape-corner-extra-small);
  box-shadow: var(--md-sys-elevation-level3);
  display: flex;
  align-items: center;
  gap: 16px;
  min-height: 48px;
  pointer-events: auto;
  transform: translateY(100px);
  opacity: 0;
  transition: all var(--md-sys-motion-duration-medium2) var(--md-sys-motion-easing-standard);
}

.md-snackbar.show {
  transform: translateY(0);
  opacity: 1;
}

.md-snackbar-message {
  flex: 1;
  font-size: var(--md-sys-typescale-body-large-size);
}

.md-snackbar-action {
  background: none;
  border: none;
  color: var(--md-sys-color-primary);
  font-weight: 500;
  cursor: pointer;
  padding: 8px 12px;
  border-radius: var(--md-sys-shape-corner-extra-small);
  transition: background var(--md-sys-motion-duration-short4) var(--md-sys-motion-easing-standard);
}

.md-snackbar-action:hover {
  background: color-mix(in srgb, var(--md-sys-color-primary) 8%, transparent);
}

.md-snackbar-close {
  background: none;
  border: none;
  color: var(--md-sys-color-on-surface-variant);
  cursor: pointer;
  padding: 4px;
  border-radius: var(--md-sys-shape-corner-full);
  transition: background var(--md-sys-motion-duration-short4) var(--md-sys-motion-easing-standard);
}

.md-snackbar-close:hover {
  background: color-mix(in srgb, var(--md-sys-color-on-surface-variant) 8%, transparent);
}

/* Dialog Styles */
.md-dialog {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: 1000;
  display: none;
  align-items: center;
  justify-content: center;
  opacity: 0;
  transition: opacity var(--md-sys-motion-duration-medium2) var(--md-sys-motion-easing-standard);
}

.md-dialog-backdrop {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.5);
  cursor: pointer;
}

.md-dialog-container {
  background: var(--md-sys-color-surface-container-high);
  border-radius: var(--md-sys-shape-corner-extra-large);
  box-shadow: var(--md-sys-elevation-level3);
  min-width: 280px;
  max-width: 560px;
  max-height: 80vh;
  position: relative;
  transform: scale(0.8);
  transition: transform var(--md-sys-motion-duration-medium2) var(--md-sys-motion-easing-standard);
}

.md-dialog-header {
  padding: 24px 24px 16px 24px;
  display: flex;
  align-items: center;
  gap: 16px;
}

.md-dialog-title {
  font-family: var(--md-sys-typescale-title-large-font);
  font-size: var(--md-sys-typescale-title-large-size);
  font-weight: var(--md-sys-typescale-title-large-weight);
  color: var(--md-sys-color-on-surface);
  margin: 0;
  flex: 1;
}

.md-dialog-icon {
  font-size: 24px;
}

.md-dialog-icon.error {
  color: var(--md-sys-color-error);
}

.md-dialog-content {
  padding: 0 24px 24px 24px;
  color: var(--md-sys-color-on-surface-variant);
  line-height: 1.6;
}

.md-dialog-actions {
  padding: 0 24px 24px 24px;
  display: flex;
  justify-content: flex-end;
  gap: 8px;
}

.md-dialog-actions .md-btn.error {
  background: var(--md-sys-color-error);
  color: var(--md-sys-color-on-error);
}

/* Progress Indicators */
.md-progress-linear {
  width: 100%;
  height: 4px;
  background: var(--md-sys-color-surface-container-highest);
  border-radius: var(--md-sys-shape-corner-full);
  overflow: hidden;
  margin: 16px 0;
}

.md-progress-linear-track {
  width: 100%;
  height: 100%;
  position: relative;
}

.md-progress-linear-bar {
  height: 100%;
  background: var(--md-sys-color-primary);
  border-radius: var(--md-sys-shape-corner-full);
  transform-origin: left;
  transition: transform var(--md-sys-motion-duration-medium2) var(--md-sys-motion-easing-standard);
}

.md-progress-circular {
  width: 48px;
  height: 48px;
  margin: 16px;
}

.md-progress-circular-svg {
  width: 100%;
  height: 100%;
  transform: rotate(-90deg);
}

.md-progress-circular-track {
  fill: none;
  stroke: var(--md-sys-color-surface-container-highest);
  stroke-width: 4;
}

.md-progress-circular-bar {
  fill: none;
  stroke: var(--md-sys-color-primary);
  stroke-width: 4;
  stroke-linecap: round;
  transition: stroke-dashoffset var(--md-sys-motion-duration-medium2) var(--md-sys-motion-easing-standard);
}

/* Slider Styles */
.md-slider {
  margin: 24px 0;
}

.md-slider-label {
  font-size: var(--md-sys-typescale-label-large-size);
  color: var(--md-sys-color-on-surface);
  margin-bottom: 8px;
  display: block;
}

.md-slider-input {
  width: 100%;
  height: 20px;
  background: transparent;
  outline: none;
  -webkit-appearance: none;
  appearance: none;
}

.md-slider-input::-webkit-slider-track {
  height: 4px;
  background: var(--md-sys-color-surface-container-highest);
  border-radius: 2px;
}

.md-slider-input::-webkit-slider-thumb {
  appearance: none;
  height: 20px;
  width: 20px;
  border-radius: 50%;
  background: var(--md-sys-color-primary);
  cursor: pointer;
  box-shadow: var(--md-sys-elevation-level1);
}

.md-slider-input::-moz-range-track {
  height: 4px;
  background: var(--md-sys-color-surface-container-highest);
  border-radius: 2px;
  border: none;
}

.md-slider-input::-moz-range-thumb {
  height: 20px;
  width: 20px;
  border-radius: 50%;
  background: var(--md-sys-color-primary);
  cursor: pointer;
  border: none;
  box-shadow: var(--md-sys-elevation-level1);
}

/* Additional component styles would continue here... */
`;

// Inject additional CSS
const styleSheet = document.createElement('style');
styleSheet.textContent = additionalCSS;
document.head.appendChild(styleSheet);