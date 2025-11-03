// Button Components Collection JavaScript

document.addEventListener('DOMContentLoaded', function() {
    
    // ==============================
    // Dark Mode Toggle Functionality
    // ==============================
    
    const darkModeToggle = document.getElementById('darkModeToggle');
    const body = document.body;
    
    // Check for saved theme preference or default to light mode
    const currentTheme = localStorage.getItem('theme') || 'light';
    body.setAttribute('data-theme', currentTheme);
    
    // Set initial toggle state
    if (currentTheme === 'dark') {
        darkModeToggle.checked = true;
    }
    
    // Theme toggle handler
    darkModeToggle.addEventListener('change', function() {
        if (this.checked) {
            body.setAttribute('data-theme', 'dark');
            localStorage.setItem('theme', 'dark');
        } else {
            body.setAttribute('data-theme', 'light');
            localStorage.setItem('theme', 'light');
        }
        
        // Add transition class temporarily for smooth theme change
        body.style.transition = 'background-color 0.3s ease, color 0.3s ease';
        setTimeout(() => {
            body.style.transition = '';
        }, 300);
    });
    
    // ==============================
    // Modal Functionality
    // ==============================
    
    const modal = document.getElementById('codeModal');
    const closeModal = document.getElementById('closeModal');
    const codeViewBtns = document.querySelectorAll('.code-view-btn');
    const tabButtons = document.querySelectorAll('.tab-button');
    const tabContents = document.querySelectorAll('.tab-content');
    const copyButtons = document.querySelectorAll('.copy-button');
    
    // Button code samples
    const buttonCodes = {
        primary: {
            html: `<!-- Primary Buttons -->
<button class="btn btn-primary btn-sm">Small</button>
<button class="btn btn-primary">Medium</button>
<button class="btn btn-primary btn-lg">Large</button>
<button class="btn btn-primary" disabled>Disabled</button>`,
            css: `/* Primary Button Styles */
.btn-primary {
    background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
    color: white;
    box-shadow: 0 4px 12px rgba(102, 126, 234, 0.3);
}

.btn-primary:hover {
    transform: translateY(-2px);
    box-shadow: 0 8px 20px rgba(102, 126, 234, 0.4);
}

.btn-primary:active {
    transform: translateY(0);
    box-shadow: 0 2px 8px rgba(102, 126, 234, 0.4);
}`,
            js: `// Primary button click handler
document.querySelectorAll('.btn-primary').forEach(button => {
    button.addEventListener('click', function() {
        console.log('Primary button clicked');
        // Add your click logic here
    });
});`
        },
        secondary: {
            html: `<!-- Secondary Buttons -->
<button class="btn btn-secondary btn-sm">Small</button>
<button class="btn btn-secondary">Medium</button>
<button class="btn btn-secondary btn-lg">Large</button>
<button class="btn btn-secondary" disabled>Disabled</button>`,
            css: `/* Secondary Button Styles */
.btn-secondary {
    background: #f8f9fa;
    color: #495057;
    border: 1px solid #dee2e6;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.btn-secondary:hover {
    background: #e9ecef;
    border-color: #adb5bd;
    transform: translateY(-1px);
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.15);
}`,
            js: `// Secondary button functionality
document.querySelectorAll('.btn-secondary').forEach(button => {
    button.addEventListener('click', function() {
        console.log('Secondary action triggered');
    });
});`
        },
        outline: {
            html: `<!-- Outline Buttons -->
<button class="btn btn-outline btn-sm">Small</button>
<button class="btn btn-outline">Medium</button>
<button class="btn btn-outline btn-lg">Large</button>
<button class="btn btn-outline" disabled>Disabled</button>`,
            css: `/* Outline Button Styles */
.btn-outline {
    background: transparent;
    color: #667eea;
    border: 2px solid #667eea;
    transition: all 0.3s ease;
}

.btn-outline:hover {
    background: #667eea;
    color: white;
    transform: translateY(-1px);
    box-shadow: 0 4px 12px rgba(102, 126, 234, 0.3);
}`,
            js: `// Outline button hover effects
document.querySelectorAll('.btn-outline').forEach(button => {
    button.addEventListener('mouseenter', function() {
        this.style.transform = 'translateY(-1px)';
    });
    
    button.addEventListener('mouseleave', function() {
        this.style.transform = 'translateY(0)';
    });
});`
        },
        ghost: {
            html: `<!-- Ghost Buttons -->
<button class="btn btn-ghost btn-sm">Small</button>
<button class="btn btn-ghost">Medium</button>
<button class="btn btn-ghost btn-lg">Large</button>
<button class="btn btn-ghost" disabled>Disabled</button>`,
            css: `/* Ghost Button Styles */
.btn-ghost {
    background: transparent;
    color: #667eea;
    border: none;
    transition: all 0.3s ease;
}

.btn-ghost:hover {
    background: rgba(102, 126, 234, 0.1);
    color: #5a67d8;
}`,
            js: `// Ghost button interactions
document.querySelectorAll('.btn-ghost').forEach(button => {
    button.addEventListener('click', function() {
        this.style.background = 'rgba(102, 126, 234, 0.2)';
        setTimeout(() => {
            this.style.background = 'transparent';
        }, 200);
    });
});`
        },
        icon: {
            html: `<!-- Icon Buttons -->
<button class="btn btn-primary btn-sm">
    <span class="material-icons">add</span>
    Add
</button>
<button class="btn btn-primary">
    <span class="material-icons">download</span>
    Download
</button>
<button class="btn btn-primary btn-lg">
    <span class="material-icons">send</span>
    Send Message
</button>`,
            css: `/* Icon Button Styles */
.btn .material-icons {
    font-size: 18px;
    margin-right: 4px;
}

.btn-sm .material-icons {
    font-size: 16px;
}

.btn-lg .material-icons {
    font-size: 20px;
}`,
            js: `// Icon button functionality
document.querySelectorAll('.btn').forEach(button => {
    const icon = button.querySelector('.material-icons');
    if (icon) {
        button.addEventListener('click', function() {
            icon.style.transform = 'scale(1.2)';
            setTimeout(() => {
                icon.style.transform = 'scale(1)';
            }, 150);
        });
    }
});`
        },
        fab: {
            html: `<!-- Floating Action Buttons -->
<button class="btn btn-fab btn-sm">
    <span class="material-icons">add</span>
</button>
<button class="btn btn-fab">
    <span class="material-icons">edit</span>
</button>
<button class="btn btn-fab btn-lg">
    <span class="material-icons">favorite</span>
</button>
<button class="btn btn-fab btn-extended">
    <span class="material-icons">add</span>
    Create New
</button>`,
            css: `/* FAB Styles */
.btn-fab {
    border-radius: 50%;
    width: 56px;
    height: 56px;
    padding: 0;
    background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
    color: white;
    box-shadow: 0 6px 20px rgba(102, 126, 234, 0.4);
}

.btn-fab:hover {
    transform: translateY(-3px) scale(1.1);
    box-shadow: 0 10px 25px rgba(102, 126, 234, 0.5);
}

.btn-fab-extended {
    border-radius: 28px;
    width: auto;
    padding: 0 24px;
    min-width: 120px;
}`,
            js: `// FAB interactions
document.querySelectorAll('.btn-fab').forEach(fab => {
    fab.addEventListener('click', function() {
        this.style.transform = 'translateY(-3px) scale(1.15)';
        setTimeout(() => {
            this.style.transform = 'translateY(-3px) scale(1.1)';
        }, 100);
    });
});`
        },
        loading: {
            html: `<!-- Loading Buttons -->
<button class="btn btn-primary btn-loading">
    <span class="btn-spinner"></span>
    Loading...
</button>
<button class="btn btn-secondary btn-loading">
    <span class="btn-spinner"></span>
    Processing
</button>
<button class="btn btn-outline btn-loading">
    <span class="btn-spinner"></span>
    Submitting
</button>`,
            css: `/* Loading Button Styles */
.btn-loading {
    position: relative;
    pointer-events: none;
}

.btn-spinner {
    width: 16px;
    height: 16px;
    border: 2px solid transparent;
    border-top: 2px solid currentColor;
    border-radius: 50%;
    animation: spin 1s linear infinite;
    margin-right: 8px;
}

@keyframes spin {
    0% { transform: rotate(0deg); }
    100% { transform: rotate(360deg); }
}`,
            js: `// Loading button functionality
function showLoading(button) {
    button.classList.add('btn-loading');
    button.innerHTML = '<span class="btn-spinner"></span>Loading...';
    button.disabled = true;
}

function hideLoading(button, originalText) {
    button.classList.remove('btn-loading');
    button.innerHTML = originalText;
    button.disabled = false;
}`
        },
        gradient: {
            html: `<!-- Gradient Buttons -->
<button class="btn btn-gradient-primary">Primary Gradient</button>
<button class="btn btn-gradient-secondary">Secondary Gradient</button>
<button class="btn btn-gradient-success">Success Gradient</button>
<button class="btn btn-gradient-danger">Danger Gradient</button>`,
            css: `/* Gradient Button Styles */
.btn-gradient-primary {
    background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
    color: white;
    border: none;
    box-shadow: 0 4px 15px rgba(102, 126, 234, 0.3);
}

.btn-gradient-secondary {
    background: linear-gradient(135deg, #a8edea 0%, #fed6e3 100%);
    color: #2d3748;
    border: none;
}

.btn-gradient-success {
    background: linear-gradient(135deg, #81C784 0%, #4CAF50 100%);
    color: white;
    border: none;
}

.btn-gradient-danger {
    background: linear-gradient(135deg, #FF8A80 0%, #F44336 100%);
    color: white;
    border: none;
}`,
            js: `// Gradient button hover effects
document.querySelectorAll('[class*="btn-gradient"]').forEach(button => {
    button.addEventListener('mouseenter', function() {
        this.style.transform = 'translateY(-2px)';
        this.style.boxShadow = '0 8px 25px rgba(0, 0, 0, 0.2)';
    });
    
    button.addEventListener('mouseleave', function() {
        this.style.transform = 'translateY(0)';
    });
});`
        },
        social: {
            html: `<!-- Social Media Buttons -->
<button class="btn btn-social btn-facebook">
    <i class="fab fa-facebook-f"></i>
    Facebook
</button>
<button class="btn btn-social btn-twitter">
    <i class="fab fa-twitter"></i>
    Twitter
</button>
<button class="btn btn-social btn-linkedin">
    <i class="fab fa-linkedin-in"></i>
    LinkedIn
</button>
<button class="btn btn-social btn-github">
    <i class="fab fa-github"></i>
    GitHub
</button>`,
            css: `/* Social Media Button Styles */
.btn-social {
    color: white;
    border: none;
    font-weight: 600;
}

.btn-facebook {
    background: #1877f2;
}

.btn-facebook:hover {
    background: #166fe5;
    transform: translateY(-2px);
    box-shadow: 0 8px 20px rgba(24, 119, 242, 0.4);
}

.btn-twitter {
    background: #1da1f2;
}

.btn-linkedin {
    background: #0077b5;
}

.btn-github {
    background: #333;
}`,
            js: `// Social media button interactions
document.querySelectorAll('.btn-social').forEach(button => {
    button.addEventListener('click', function() {
        const platform = this.className.includes('facebook') ? 'Facebook' :
                        this.className.includes('twitter') ? 'Twitter' :
                        this.className.includes('linkedin') ? 'LinkedIn' :
                        this.className.includes('github') ? 'GitHub' : 'Social';
        
        console.log(\`\${platform} button clicked\`);
        // Add social sharing logic here
    });
});`
        },
        toggle: {
            html: `<!-- Material UI Toggle Switch Patterns -->

<!-- Basic Toggle Button -->
<button class="btn btn-toggle" data-toggle="off">
    <span class="toggle-text">Toggle Me</span>
    <span class="toggle-indicator"></span>
</button>

<!-- Standard Switch -->
<button class="btn btn-toggle btn-toggle-switch" data-toggle="off">
    <span class="switch-slider"></span>
</button>

<!-- Light/Dark Mode Toggle -->
<button class="btn btn-toggle btn-toggle-switch theme-toggle" data-toggle="off" title="Light/Dark Mode">
    <span class="switch-slider"></span>
</button>

<!-- Notification Toggle with Animation -->
<button class="btn btn-toggle btn-toggle-switch notification" data-toggle="on" title="Notifications">
    <span class="switch-slider"></span>
</button>

<!-- Wi-Fi Connection Toggle -->
<button class="btn btn-toggle btn-toggle-switch wifi" data-toggle="off" title="Wi-Fi">
    <span class="switch-slider"></span>
</button>

<!-- Privacy/Visibility Toggle -->
<button class="btn btn-toggle btn-toggle-switch privacy" data-toggle="on" title="Privacy Mode">
    <span class="switch-slider"></span>
</button>

<!-- Power Mode Toggle -->
<button class="btn btn-toggle btn-toggle-switch power" data-toggle="off" title="Power Mode">
    <span class="switch-slider"></span>
</button>

<!-- Success State -->
<button class="btn btn-toggle btn-toggle-switch success" data-toggle="on" title="Success State">
    <span class="switch-slider"></span>
</button>

<!-- Size Variants -->
<button class="btn btn-toggle btn-toggle-switch small" data-toggle="off" title="Compact Size">
    <span class="switch-slider"></span>
</button>
<button class="btn btn-toggle btn-toggle-switch large" data-toggle="on" title="Large Size">
    <span class="switch-slider"></span>
</button>

<!-- Toggle Button Group -->
<div class="btn-group-toggle">
    <button class="btn btn-outline active">Option 1</button>
    <button class="btn btn-outline">Option 2</button>
    <button class="btn btn-outline">Option 3</button>
</div>`,
            css: `/* Material UI Toggle Switch Patterns */

/* Standard Toggle Switch */
.btn-toggle-switch {
    width: 52px;
    height: 32px;
    padding: 0;
    background: #9e9e9e;
    border: none;
    border-radius: 16px;
    position: relative;
    transition: all 0.2s cubic-bezier(0.4, 0, 0.2, 1);
    cursor: pointer;
    outline: none;
    opacity: 0.8;
    min-height: 32px;
}

.switch-slider {
    position: absolute;
    top: 50%;
    left: 2px;
    width: 28px;
    height: 28px;
    background: #ffffff;
    border-radius: 50%;
    transition: all 0.2s cubic-bezier(0.4, 0, 0.2, 1);
    transform: translateY(-50%);
    box-shadow: 
        0 2px 1px -1px rgba(0, 0, 0, 0.2),
        0 1px 1px 0 rgba(0, 0, 0, 0.14),
        0 1px 3px 0 rgba(0, 0, 0, 0.12);
}

.btn-toggle-switch[data-toggle="on"] {
    background: #1976d2;
    opacity: 1;
}

.btn-toggle-switch[data-toggle="on"] .switch-slider {
    transform: translateX(22px) translateY(-50%);
}

/* Light/Dark Mode Toggle */
.btn-toggle-switch.theme-toggle {
    background: linear-gradient(135deg, #ffd54f, #ffb74d);
    border: 2px solid #ff8f00;
}

.btn-toggle-switch.theme-toggle .switch-slider::before {
    content: '☀️';
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    font-size: 12px;
}

.btn-toggle-switch.theme-toggle[data-toggle="on"] {
    background: linear-gradient(135deg, #3f51b5, #303f9f);
}

.btn-toggle-switch.theme-toggle[data-toggle="on"] .switch-slider::before {
    content: '🌙';
}

/* Notification Toggle with Animation */
.btn-toggle-switch.notification[data-toggle="on"] {
    background: linear-gradient(135deg, #4caf50, #388e3c);
    animation: notificationPulse 2s infinite;
}

@keyframes notificationPulse {
    0%, 100% { box-shadow: 0 0 0 0 rgba(76, 175, 80, 0.4); }
    50% { box-shadow: 0 0 0 8px rgba(76, 175, 80, 0); }
}

/* Power Toggle with Glow Effect */
.btn-toggle-switch.power[data-toggle="on"] {
    background: radial-gradient(ellipse at center, #ff5722, #d84315);
    box-shadow: 0 0 20px rgba(255, 87, 34, 0.6);
}

.btn-toggle-switch.power[data-toggle="on"] .switch-slider::before {
    content: '⚡';
    animation: powerGlow 1s infinite alternate;
}

@keyframes powerGlow {
    from { text-shadow: 0 0 5px #ff5722; }
    to { text-shadow: 0 0 10px #ff5722, 0 0 15px #ff5722; }
}`,
            js: `// Enhanced Toggle button functionality
document.querySelectorAll('.btn-toggle').forEach(toggle => {
    toggle.addEventListener('click', function(e) {
        e.preventDefault();
        const isOn = this.dataset.toggle === 'on';
        const newState = isOn ? 'off' : 'on';
        
        // Update state
        this.dataset.toggle = newState;
        
        // Add click feedback animation
        this.style.transform = 'translateY(-1px) scale(0.98)';
        
        setTimeout(() => {
            this.style.transform = newState === 'on' ? 'translateY(-2px)' : 'translateY(0)';
        }, 100);
        
        // Update text for better UX
        const textSpan = this.querySelector('.toggle-text');
        if (textSpan) {
            textSpan.textContent = newState === 'on' ? 'Enabled' : 'Toggle Me';
        }
        
        // Add haptic feedback (if supported)
        if (navigator.vibrate) {
            navigator.vibrate(50);
        }
        
        // Trigger custom event
        this.dispatchEvent(new CustomEvent('toggleChange', {
            detail: { state: newState, element: this }
        }));
    });
    
    // Enhanced hover effects
    toggle.addEventListener('mouseenter', function() {
        const isOn = this.dataset.toggle === 'on';
        this.style.transform = 'translateY(-2px)';
        this.style.boxShadow = isOn ? 
            '0 10px 25px rgba(102, 126, 234, 0.5), inset 0 1px 2px rgba(255, 255, 255, 0.2)' :
            '0 8px 16px rgba(0, 0, 0, 0.15), inset 0 1px 2px rgba(255, 255, 255, 0.8)';
    });
    
    toggle.addEventListener('mouseleave', function() {
        const isOn = this.dataset.toggle === 'on';
        this.style.transform = 'translateY(0)';
        this.style.boxShadow = isOn ? 
            '0 6px 20px rgba(102, 126, 234, 0.4), inset 0 1px 2px rgba(255, 255, 255, 0.2)' :
            '0 4px 8px rgba(0, 0, 0, 0.1), inset 0 1px 2px rgba(255, 255, 255, 0.8)';
    });
});

// Enhanced toggle group functionality
document.querySelectorAll('.btn-group-toggle .btn').forEach(button => {
    button.addEventListener('click', function(e) {
        e.preventDefault();
        
        // Remove active class from siblings with animation
        this.parentNode.querySelectorAll('.btn').forEach(btn => {
            btn.classList.remove('active');
            btn.style.transform = 'translateY(0)';
            btn.style.boxShadow = '';
        });
        
        // Add active class to clicked button with animation
        this.classList.add('active');
        this.style.transform = 'translateY(-1px)';
        this.style.boxShadow = '0 4px 12px rgba(102, 126, 234, 0.4), inset 0 1px 2px rgba(255, 255, 255, 0.2)';
        
        // Add ripple effect
        const ripple = document.createElement('span');
        const rect = this.getBoundingClientRect();
        const size = Math.max(rect.width, rect.height);
        const x = e.clientX - rect.left - size / 2;
        const y = e.clientY - rect.top - size / 2;
        
        ripple.style.cssText = \`
            position: absolute;
            width: \${size}px;
            height: \${size}px;
            left: \${x}px;
            top: \${y}px;
            background: rgba(255, 255, 255, 0.3);
            border-radius: 50%;
            transform: scale(0);
            animation: ripple-animation 0.6s ease-out;
            pointer-events: none;
            z-index: 0;
        \`;
        
        this.appendChild(ripple);
        
        setTimeout(() => {
            ripple.remove();
        }, 600);
        
        // Trigger custom event
        this.dispatchEvent(new CustomEvent('optionSelected', {
            detail: { option: this.textContent.trim(), element: this }
        }));
    });
    
    // Enhanced hover for group buttons
    button.addEventListener('mouseenter', function() {
        if (!this.classList.contains('active')) {
            this.style.transform = 'translateY(-1px)';
            this.style.background = 'rgba(255, 255, 255, 0.7)';
            this.style.color = '#475569';
        }
    });
    
    button.addEventListener('mouseleave', function() {
        if (!this.classList.contains('active')) {
            this.style.transform = 'translateY(0)';
            this.style.background = 'transparent';
            this.style.color = '#64748b';
        }
    });
});

// Listen for custom toggle events
document.addEventListener('toggleChange', function(e) {
    console.log('Toggle state changed:', e.detail.state);
});

document.addEventListener('optionSelected', function(e) {
    console.log('Option selected:', e.detail.option);
});`
        },
        groups: {
            html: `<!-- Button Groups -->
<div class="btn-group">
    <button class="btn btn-outline">Left</button>
    <button class="btn btn-outline">Center</button>
    <button class="btn btn-outline">Right</button>
</div>
<div class="btn-group">
    <button class="btn btn-primary">
        <span class="material-icons">format_bold</span>
    </button>
    <button class="btn btn-primary">
        <span class="material-icons">format_italic</span>
    </button>
    <button class="btn btn-primary">
        <span class="material-icons">format_underlined</span>
    </button>
</div>`,
            css: `/* Button Group Styles */
.btn-group {
    display: inline-flex;
    gap: 0;
    border-radius: 8px;
    overflow: hidden;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.btn-group .btn {
    border-radius: 0;
    border-right: 1px solid rgba(255, 255, 255, 0.2);
    margin: 0;
}

.btn-group .btn:first-child {
    border-radius: 8px 0 0 8px;
}

.btn-group .btn:last-child {
    border-radius: 0 8px 8px 0;
    border-right: none;
}`,
            js: `// Button group functionality
document.querySelectorAll('.btn-group').forEach(group => {
    group.querySelectorAll('.btn').forEach(button => {
        button.addEventListener('click', function() {
            // Toggle active state for the clicked button
            this.classList.toggle('active');
        });
    });
});`
        },
        dropdown: {
            html: `<!-- Dropdown Buttons -->
<div class="btn-dropdown">
    <button class="btn btn-primary">
        Actions
        <span class="material-icons">arrow_drop_down</span>
    </button>
    <div class="dropdown-menu">
        <a href="#" class="dropdown-item">Edit</a>
        <a href="#" class="dropdown-item">Duplicate</a>
        <a href="#" class="dropdown-item">Delete</a>
    </div>
</div>`,
            css: `/* Dropdown Button Styles */
.btn-dropdown {
    position: relative;
    display: inline-block;
}

.dropdown-menu {
    position: absolute;
    top: 100%;
    left: 0;
    background: white;
    border: 1px solid #e2e8f0;
    border-radius: 8px;
    box-shadow: 0 10px 25px rgba(0, 0, 0, 0.1);
    min-width: 160px;
    opacity: 0;
    visibility: hidden;
    transform: translateY(-10px);
    transition: all 0.3s ease;
    z-index: 1000;
}

.btn-dropdown:hover .dropdown-menu {
    opacity: 1;
    visibility: visible;
    transform: translateY(0);
}`,
            js: `// Dropdown functionality
document.querySelectorAll('.btn-dropdown').forEach(dropdown => {
    const menu = dropdown.querySelector('.dropdown-menu');
    const button = dropdown.querySelector('.btn');
    
    button.addEventListener('click', function(e) {
        e.stopPropagation();
        menu.style.opacity = menu.style.opacity === '1' ? '0' : '1';
        menu.style.visibility = menu.style.visibility === 'visible' ? 'hidden' : 'visible';
    });
    
    // Close dropdown when clicking outside
    document.addEventListener('click', function() {
        menu.style.opacity = '0';
        menu.style.visibility = 'hidden';
    });
});`
        },
        hover: {
            html: `<!-- Hover Effect Buttons -->
<button class="btn btn-hover-fill">Fill Effect</button>
<button class="btn btn-hover-slide">Slide Effect</button>
<button class="btn btn-hover-glow">Glow Effect</button>
<button class="btn btn-hover-bounce">Bounce Effect</button>`,
            css: `/* Hover Effect Styles */
.btn-hover-fill {
    background: transparent;
    color: #667eea;
    border: 2px solid #667eea;
    position: relative;
    overflow: hidden;
}

.btn-hover-fill::before {
    content: '';
    position: absolute;
    top: 0;
    left: -100%;
    width: 100%;
    height: 100%;
    background: #667eea;
    transition: left 0.3s ease;
    z-index: -1;
}

.btn-hover-fill:hover::before {
    left: 0;
}

.btn-hover-fill:hover {
    color: white;
}

.btn-hover-bounce:hover {
    animation: bounce 0.6s ease;
}

@keyframes bounce {
    0%, 20%, 60%, 100% { transform: translateY(0); }
    40% { transform: translateY(-10px); }
    80% { transform: translateY(-5px); }
}`,
            js: `// Hover effect enhancements
document.querySelectorAll('[class*="btn-hover"]').forEach(button => {
    button.addEventListener('mouseenter', function() {
        if (this.classList.contains('btn-hover-glow')) {
            this.style.boxShadow = '0 0 20px rgba(102, 126, 234, 0.6)';
        }
    });
    
    button.addEventListener('mouseleave', function() {
        if (this.classList.contains('btn-hover-glow')) {
            this.style.boxShadow = '';
        }
    });
});`
        },
        ripple: {
            html: `<!-- Ripple Animation Buttons -->
<button class="btn btn-ripple btn-primary">Click for Ripple</button>
<button class="btn btn-ripple btn-secondary">Ripple Effect</button>
<button class="btn btn-ripple btn-outline">Animated Click</button>`,
            css: `/* Ripple Effect Styles */
.btn-ripple {
    position: relative;
    overflow: hidden;
}

.btn-ripple::after {
    content: '';
    position: absolute;
    top: 50%;
    left: 50%;
    width: 0;
    height: 0;
    border-radius: 50%;
    background: rgba(255, 255, 255, 0.5);
    transform: translate(-50%, -50%);
    transition: width 0.6s, height 0.6s;
}

.btn-ripple:active::after {
    width: 300px;
    height: 300px;
}`,
            js: `// Ripple effect implementation
document.querySelectorAll('.btn-ripple').forEach(button => {
    button.addEventListener('click', function(e) {
        const ripple = document.createElement('span');
        const rect = this.getBoundingClientRect();
        const size = Math.max(rect.width, rect.height);
        const x = e.clientX - rect.left - size / 2;
        const y = e.clientY - rect.top - size / 2;
        
        ripple.style.cssText = \`
            position: absolute;
            width: \${size}px;
            height: \${size}px;
            left: \${x}px;
            top: \${y}px;
            background: rgba(255, 255, 255, 0.3);
            border-radius: 50%;
            transform: scale(0);
            animation: ripple-animation 0.6s ease-out;
            pointer-events: none;
        \`;
        
        this.appendChild(ripple);
        
        setTimeout(() => {
            ripple.remove();
        }, 600);
    });
});

// Add ripple animation keyframes via JavaScript
const style = document.createElement('style');
style.textContent = \`
@keyframes ripple-animation {
    to {
        transform: scale(4);
        opacity: 0;
    }
}
\`;
document.head.appendChild(style);`
        },
        pulse: {
            html: `<!-- Pulse Animation Buttons -->
<button class="btn btn-pulse btn-primary">Call to Action</button>
<button class="btn btn-pulse-border btn-outline">Border Pulse</button>
<button class="btn btn-pulse-glow btn-gradient-primary">Glowing Pulse</button>`,
            css: `/* Pulse Animation Styles */
.btn-pulse {
    animation: pulse 2s infinite;
}

@keyframes pulse {
    0% { transform: scale(1); }
    50% { transform: scale(1.05); }
    100% { transform: scale(1); }
}

.btn-pulse-border {
    position: relative;
}

.btn-pulse-border::before {
    content: '';
    position: absolute;
    top: -2px;
    left: -2px;
    right: -2px;
    bottom: -2px;
    border: 2px solid #667eea;
    border-radius: 10px;
    animation: pulse-border 2s infinite;
}

@keyframes pulse-border {
    0% { opacity: 1; transform: scale(1); }
    50% { opacity: 0.7; transform: scale(1.1); }
    100% { opacity: 1; transform: scale(1); }
}

.btn-pulse-glow {
    animation: pulse-glow 2s infinite;
}

@keyframes pulse-glow {
    0%, 100% { box-shadow: 0 4px 15px rgba(102, 126, 234, 0.3); }
    50% { box-shadow: 0 8px 25px rgba(102, 126, 234, 0.6); }
}`,
            js: `// Pulse control functionality
let pulseEnabled = true;

document.querySelectorAll('[class*="btn-pulse"]').forEach(button => {
    button.addEventListener('click', function() {
        // Temporarily stop pulse animation on click
        this.style.animationPlayState = 'paused';
        
        setTimeout(() => {
            this.style.animationPlayState = 'running';
        }, 500);
    });
});

// Function to toggle pulse animations
function togglePulse() {
    pulseEnabled = !pulseEnabled;
    document.querySelectorAll('[class*="btn-pulse"]').forEach(button => {
        button.style.animationPlayState = pulseEnabled ? 'running' : 'paused';
    });
}`
        },
        morph: {
            html: `<!-- Enhanced Morphing Buttons -->
<button class="btn btn-morph-circle">
    <span class="material-icons">star</span>
    Morph to Circle
</button>
<button class="btn btn-morph-expand">
    <span class="material-icons">expand_more</span>
    Expand on Hover
</button>
<button class="btn btn-morph-flip">
    <span class="btn-text-front">Hover Me</span>
    <span class="btn-text-back">Flipped!</span>
</button>
<button class="btn btn-flip-advanced">
    <span class="btn-face btn-face-front-advanced">Click Me</span>
    <span class="btn-face btn-face-back-advanced">Success!</span>
</button>`,
            css: `/* Enhanced Morphing Button Styles */
.btn-morph-circle {
    background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
    color: white;
    border: none;
    border-radius: 12px;
    padding: 14px 28px;
    font-weight: 600;
    position: relative;
    overflow: hidden;
    transition: all 0.6s cubic-bezier(0.4, 0, 0.2, 1);
    box-shadow: 
        0 4px 15px rgba(102, 126, 234, 0.3),
        inset 0 1px 2px rgba(255, 255, 255, 0.2);
}

.btn-morph-circle:hover {
    border-radius: 50%;
    padding: 16px;
    min-width: 64px;
    transform: scale(1.1);
    box-shadow: 
        0 8px 25px rgba(102, 126, 234, 0.5),
        inset 0 1px 2px rgba(255, 255, 255, 0.3);
}

.btn-morph-expand {
    background: linear-gradient(135deg, #4facfe 0%, #00f2fe 100%);
    color: white;
    border: none;
    border-radius: 8px;
    padding: 12px 24px;
    font-weight: 600;
    transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
}

.btn-morph-expand:hover {
    padding: 16px 48px;
    font-size: 16px;
    border-radius: 12px;
    transform: translateY(-2px);
    box-shadow: 0 8px 20px rgba(79, 172, 254, 0.4);
}

.btn-morph-flip {
    position: relative;
    perspective: 1000px;
    background: transparent;
    border: none;
    padding: 0;
    border-radius: 10px;
    box-shadow: 0 6px 20px rgba(0, 0, 0, 0.15);
}

.btn-text-front,
.btn-text-back {
    transition: transform 0.8s cubic-bezier(0.4, 0, 0.2, 1);
    backface-visibility: hidden;
    position: absolute;
    width: 100%;
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 14px 28px;
    border-radius: 10px;
    font-weight: 600;
}

.btn-text-front {
    background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
    color: white;
}

.btn-text-back {
    background: linear-gradient(135deg, #764ba2 0%, #667eea 100%);
    color: white;
    transform: rotateY(180deg);
}

.btn-morph-flip:hover .btn-text-front {
    transform: rotateY(180deg);
}

.btn-morph-flip:hover .btn-text-back {
    transform: rotateY(0deg);
}`,
            js: `// Enhanced Morphing button interactions
document.querySelectorAll('.btn-morph-circle').forEach(button => {
    let isCircle = false;
    
    button.addEventListener('click', function(e) {
        e.preventDefault();
        isCircle = !isCircle;
        
        if (isCircle) {
            this.style.borderRadius = '50%';
            this.style.padding = '16px';
            this.style.minWidth = '64px';
            this.style.transform = 'scale(1.1)';
            
            // Animate icon rotation
            const icon = this.querySelector('.material-icons');
            if (icon) {
                icon.style.transform = 'rotate(180deg) scale(1.2)';
            }
        } else {
            this.style.borderRadius = '12px';
            this.style.padding = '14px 28px';
            this.style.minWidth = 'auto';
            this.style.transform = 'scale(1)';
            
            // Reset icon
            const icon = this.querySelector('.material-icons');
            if (icon) {
                icon.style.transform = 'rotate(0deg) scale(1)';
            }
        }
    });
    
    // Enhanced hover effects
    button.addEventListener('mouseenter', function() {
        if (!isCircle) {
            this.style.transform = 'scale(1.05)';
        }
    });
    
    button.addEventListener('mouseleave', function() {
        if (!isCircle) {
            this.style.transform = 'scale(1)';
        }
    });
});

document.querySelectorAll('.btn-morph-expand').forEach(button => {
    const originalPadding = '12px 24px';
    const originalFontSize = '14px';
    let isExpanded = false;
    
    button.addEventListener('click', function(e) {
        e.preventDefault();
        isExpanded = !isExpanded;
        
        if (isExpanded) {
            this.style.padding = '16px 48px';
            this.style.fontSize = '16px';
            this.style.borderRadius = '12px';
            this.style.transform = 'translateY(-2px)';
            
            // Animate icon
            const icon = this.querySelector('.material-icons');
            if (icon) {
                icon.style.transform = 'rotate(180deg) scale(1.1)';
                icon.style.marginRight = '12px';
            }
        } else {
            this.style.padding = originalPadding;
            this.style.fontSize = originalFontSize;
            this.style.borderRadius = '8px';
            this.style.transform = 'translateY(0)';
            
            // Reset icon
            const icon = this.querySelector('.material-icons');
            if (icon) {
                icon.style.transform = 'rotate(0deg) scale(1)';
                icon.style.marginRight = '6px';
            }
        }
    });
    
    // Enhanced hover effects with ripple
    button.addEventListener('mouseenter', function() {
        if (!isExpanded) {
            this.style.transform = 'translateY(-1px)';
            this.style.boxShadow = '0 6px 16px rgba(79, 172, 254, 0.3)';
        }
    });
    
    button.addEventListener('mouseleave', function() {
        if (!isExpanded) {
            this.style.transform = 'translateY(0)';
            this.style.boxShadow = '0 4px 12px rgba(79, 172, 254, 0.3)';
        }
    });
});

// Enhanced flip button with click persistence
document.querySelectorAll('.btn-morph-flip').forEach(button => {
    let isFlipped = false;
    
    button.addEventListener('click', function(e) {
        e.preventDefault();
        isFlipped = !isFlipped;
        
        const frontText = this.querySelector('.btn-text-front');
        const backText = this.querySelector('.btn-text-back');
        
        if (isFlipped) {
            frontText.style.transform = 'rotateY(180deg)';
            backText.style.transform = 'rotateY(0deg)';
        } else {
            frontText.style.transform = 'rotateY(0deg)';
            backText.style.transform = 'rotateY(180deg)';
        }
    });
    
    // Add click animation
    button.addEventListener('mousedown', function() {
        this.style.transform = 'translateY(-2px) scale(0.98)';
    });
    
    button.addEventListener('mouseup', function() {
        this.style.transform = 'translateY(-2px) scale(1)';
    });
});

// Advanced flip button
document.querySelectorAll('.btn-flip-advanced').forEach(button => {
    let isFlipped = false;
    
    button.addEventListener('click', function(e) {
        e.preventDefault();
        isFlipped = !isFlipped;
        
        const frontFace = this.querySelector('.btn-face-front-advanced');
        const backFace = this.querySelector('.btn-face-back-advanced');
        
        if (isFlipped) {
            frontFace.style.transform = 'rotateY(-180deg)';
            backFace.style.transform = 'rotateY(0deg)';
        } else {
            frontFace.style.transform = 'rotateY(0deg)';
            backFace.style.transform = 'rotateY(180deg)';
        }
        
        // Add success feedback
        if (isFlipped) {
            this.style.boxShadow = '0 12px 30px rgba(78, 205, 196, 0.4)';
        } else {
            this.style.boxShadow = '0 12px 30px rgba(255, 107, 107, 0.4)';
        }
    });
});`
        },
        sliding: {
            html: `<!-- Sliding Text Buttons -->
<button class="btn btn-slide-text">
    <span class="btn-text-slide">Slide Up</span>
    <span class="btn-text-slide">Complete!</span>
</button>
<button class="btn btn-slide-icon">
    <span class="btn-content">
        <span class="material-icons">send</span>
        Send Message
    </span>
    <span class="btn-content">
        <span class="material-icons">check</span>
        Sent!
    </span>
</button>`,
            css: `/* Sliding Text Animation */
.btn-slide-text {
    position: relative;
    overflow: hidden;
}

.btn-text-slide {
    transition: transform 0.3s ease;
    display: block;
}

.btn-text-slide:nth-child(2) {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, 150%);
}

.btn-slide-text:hover .btn-text-slide:nth-child(1) {
    transform: translateY(-150%);
}

.btn-slide-text:hover .btn-text-slide:nth-child(2) {
    transform: translate(-50%, -50%);
}

.btn-slide-icon {
    position: relative;
    overflow: hidden;
}

.btn-content {
    transition: transform 0.3s ease;
    display: flex;
    align-items: center;
    gap: 8px;
}

.btn-content:nth-child(2) {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, 150%);
}

.btn-slide-icon:hover .btn-content:nth-child(1) {
    transform: translateY(-150%);
}

.btn-slide-icon:hover .btn-content:nth-child(2) {
    transform: translate(-50%, -50%);
}`,
            js: `// Sliding text functionality
document.querySelectorAll('.btn-slide-text, .btn-slide-icon').forEach(button => {
    let isSlid = false;
    
    button.addEventListener('click', function() {
        isSlid = !isSlid;
        
        const firstElement = this.children[0];
        const secondElement = this.children[1];
        
        if (isSlid) {
            if (this.classList.contains('btn-slide-text')) {
                firstElement.style.transform = 'translateY(-150%)';
                secondElement.style.transform = 'translate(-50%, -50%)';
            } else {
                firstElement.style.transform = 'translateY(-150%)';
                secondElement.style.transform = 'translate(-50%, -50%)';
            }
        } else {
            firstElement.style.transform = 'translateY(0)';
            if (this.classList.contains('btn-slide-text')) {
                secondElement.style.transform = 'translate(-50%, 150%)';
            } else {
                secondElement.style.transform = 'translate(-50%, 150%)';
            }
        }
    });
});`
        },
        transform: {
            html: `<!-- 3D Transform Buttons -->
<button class="btn btn-3d">3D Button</button>
<button class="btn btn-flip-3d">
    <span class="btn-face btn-face-front">Front</span>
    <span class="btn-face btn-face-back">Back</span>
</button>
<button class="btn btn-rotate-3d">Rotate 3D</button>`,
            css: `/* 3D Transform Styles */
.btn-3d {
    background: linear-gradient(145deg, #7c8fe8, #5a67d8);
    box-shadow: 
        inset 5px 5px 10px #6b77e3,
        inset -5px -5px 10px #8aa7ed,
        5px 5px 10px rgba(0, 0, 0, 0.1);
    color: white;
    border: none;
}

.btn-3d:hover {
    transform: translateY(-2px);
    box-shadow: 
        inset 3px 3px 8px #6b77e3,
        inset -3px -3px 8px #8aa7ed,
        8px 8px 15px rgba(0, 0, 0, 0.2);
}

.btn-flip-3d {
    position: relative;
    perspective: 1000px;
    transform-style: preserve-3d;
    background: transparent;
    border: none;
    padding: 0;
}

.btn-face {
    position: absolute;
    width: 100%;
    height: 100%;
    backface-visibility: hidden;
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 12px 24px;
    border-radius: 8px;
    font-weight: 500;
    transition: transform 0.6s;
}

.btn-face-front {
    background: #667eea;
    color: white;
}

.btn-face-back {
    background: #764ba2;
    color: white;
    transform: rotateY(180deg);
}

.btn-flip-3d:hover .btn-face-front {
    transform: rotateY(180deg);
}

.btn-flip-3d:hover .btn-face-back {
    transform: rotateY(0);
}`,
            js: `// 3D Transform interactions
document.querySelectorAll('.btn-3d').forEach(button => {
    button.addEventListener('mousedown', function() {
        this.style.transform = 'translateY(1px)';
        this.style.boxShadow = \`
            inset 5px 5px 10px #5a67d8,
            inset -5px -5px 10px #7c8fe8,
            2px 2px 5px rgba(0, 0, 0, 0.1)
        \`;
    });
    
    button.addEventListener('mouseup', function() {
        this.style.transform = 'translateY(-2px)';
        this.style.boxShadow = \`
            inset 3px 3px 8px #6b77e3,
            inset -3px -3px 8px #8aa7ed,
            8px 8px 15px rgba(0, 0, 0, 0.2)
        \`;
    });
});

document.querySelectorAll('.btn-rotate-3d').forEach(button => {
    button.addEventListener('mouseenter', function() {
        this.style.transform = 'rotateX(15deg) rotateY(15deg)';
    });
    
    button.addEventListener('mouseleave', function() {
        this.style.transform = 'rotateX(0) rotateY(0)';
    });
});`
        },
        particles: {
            html: `<!-- Particle Effect Buttons -->
<button class="btn btn-particles">
    <span class="btn-particles-container">
        <span class="particle"></span>
        <span class="particle"></span>
        <span class="particle"></span>
    </span>
    Magical Button
</button>
<button class="btn btn-explosion">Explosion Effect</button>
<button class="btn btn-confetti">Confetti Burst</button>`,
            css: `/* Particle Effect Styles */
.btn-particles {
    position: relative;
    background: #667eea;
    color: white;
    overflow: visible;
}

.btn-particles-container {
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    pointer-events: none;
}

.particle {
    position: absolute;
    width: 4px;
    height: 4px;
    background: rgba(255, 255, 255, 0.8);
    border-radius: 50%;
    opacity: 0;
}

.btn-particles:hover .particle {
    animation: particle-float 1.5s ease-out infinite;
}

@keyframes particle-float {
    0% {
        opacity: 0;
        transform: translateY(0) scale(0);
    }
    50% {
        opacity: 1;
        transform: translateY(-20px) scale(1);
    }
    100% {
        opacity: 0;
        transform: translateY(-40px) scale(0);
    }
}`,
            js: `// Particle effect implementation
document.querySelectorAll('.btn-particles').forEach(button => {
    button.addEventListener('click', function() {
        createParticles(this);
    });
});

function createParticles(button) {
    const particles = button.querySelectorAll('.particle');
    
    particles.forEach((particle, index) => {
        const randomX = Math.random() * 100;
        const randomY = Math.random() * 100;
        const randomDelay = Math.random() * 0.5;
        
        particle.style.left = randomX + '%';
        particle.style.top = randomY + '%';
        particle.style.animationDelay = randomDelay + 's';
        particle.style.animationDuration = (1 + Math.random()) + 's';
    });
}

document.querySelectorAll('.btn-explosion').forEach(button => {
    button.addEventListener('click', function() {
        this.style.animation = 'explosion 0.5s ease-out';
        setTimeout(() => {
            this.style.animation = '';
        }, 500);
    });
});

document.querySelectorAll('.btn-confetti').forEach(button => {
    button.addEventListener('click', function() {
        this.style.animation = 'confetti 0.8s ease-out';
        setTimeout(() => {
            this.style.animation = '';
        }, 800);
    });
});`
        },
        liquid: {
            html: `<!-- Liquid Animation Buttons -->
<button class="btn btn-liquid">
    <span class="btn-liquid-fill"></span>
    Liquid Fill
</button>
<button class="btn btn-wave">
    <span class="btn-wave-effect"></span>
    Wave Effect
</button>
<button class="btn btn-blob">
    <span class="btn-blob-bg"></span>
    Blob Morph
</button>`,
            css: `/* Liquid Animation Styles */
.btn-liquid {
    background: #667eea;
    color: white;
    position: relative;
    overflow: hidden;
}

.btn-liquid-fill {
    position: absolute;
    bottom: 0;
    left: 0;
    width: 100%;
    height: 0;
    background: rgba(255, 255, 255, 0.2);
    transition: height 0.3s ease;
}

.btn-liquid:hover .btn-liquid-fill {
    height: 100%;
}

.btn-wave {
    background: #2ecc71;
    color: white;
    position: relative;
    overflow: hidden;
}

.btn-wave-effect {
    position: absolute;
    top: 0;
    left: -100%;
    width: 100%;
    height: 100%;
    background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.3), transparent);
    transition: left 0.5s ease;
}

.btn-wave:hover .btn-wave-effect {
    left: 100%;
}

.btn-blob {
    background: #9b59b6;
    color: white;
    position: relative;
    overflow: hidden;
}

.btn-blob-bg {
    position: absolute;
    top: 50%;
    left: 50%;
    width: 0;
    height: 0;
    background: rgba(255, 255, 255, 0.2);
    border-radius: 50%;
    transform: translate(-50%, -50%);
    transition: all 0.4s ease;
}

.btn-blob:hover .btn-blob-bg {
    width: 300px;
    height: 300px;
}`,
            js: `// Liquid animation enhancements
document.querySelectorAll('.btn-liquid').forEach(button => {
    button.addEventListener('click', function() {
        const fill = this.querySelector('.btn-liquid-fill');
        fill.style.transition = 'height 0.1s ease';
        fill.style.height = '100%';
        
        setTimeout(() => {
            fill.style.transition = 'height 0.3s ease';
            fill.style.height = '0';
        }, 100);
    });
});

document.querySelectorAll('.btn-wave').forEach(button => {
    button.addEventListener('click', function() {
        const wave = this.querySelector('.btn-wave-effect');
        wave.style.left = '-100%';
        wave.style.transition = 'left 0.2s ease';
        
        setTimeout(() => {
            wave.style.left = '100%';
        }, 10);
        
        setTimeout(() => {
            wave.style.transition = 'left 0.5s ease';
            wave.style.left = '-100%';
        }, 200);
    });
});

document.querySelectorAll('.btn-blob').forEach(button => {
    button.addEventListener('click', function() {
        const blob = this.querySelector('.btn-blob-bg');
        blob.style.width = '300px';
        blob.style.height = '300px';
        
        setTimeout(() => {
            blob.style.width = '0';
            blob.style.height = '0';
        }, 200);
    });
});`
        },
        'rgb-glow': {
            html: `<!-- RGB Glow Effect Buttons -->
<button class="btn rgb-glow">RGB Glow</button>
<button class="btn rgb-glow rgb-glow-fast">Fast Glow</button>
<button class="btn rgb-glow rgb-glow-pulse">Pulse Glow</button>
<button class="btn rgb-glow rgb-glow-large">Large Glow</button>

<!-- With Icons -->
<button class="btn rgb-glow">
    <span class="material-icons">star</span>
    RGB Star
</button>`,
            css: `/* RGB Glow Effect Styles */
.rgb-glow {
    padding: 12px 24px;
    border: none;
    outline: none;
    color: #fff;
    background: #111;
    cursor: pointer;
    position: relative;
    z-index: 0;
    border-radius: 10px;
    text-transform: uppercase;
    font-weight: 600;
    font-family: 'Inter', sans-serif;
    font-size: 14px;
    letter-spacing: 0.5px;
    transition: all 0.3s ease;
}

.rgb-glow:before {
    content: "";
    background: linear-gradient(
        45deg,
        #ff0000, #ff7300, #fffb00, #48ff00,
        #00ffd5, #002bff, #7a00ff, #ff00c8, #ff0000
    );
    position: absolute;
    top: -2px;
    left: -2px;
    background-size: 400%;
    z-index: -1;
    filter: blur(5px);
    width: calc(100% + 4px);
    height: calc(100% + 4px);
    animation: glowing 20s linear infinite;
    opacity: 0;
    transition: opacity 0.3s ease-in-out;
    border-radius: 10px;
}

.rgb-glow:hover:before {
    opacity: 1;
}

.rgb-glow:hover {
    transform: translateY(-2px);
    box-shadow: 0 8px 20px rgba(0, 0, 0, 0.3);
}

.rgb-glow:active {
    color: #000;
    transform: scale(0.98);
}

.rgb-glow:after {
    z-index: -1;
    content: "";
    position: absolute;
    width: 100%;
    height: 100%;
    background: #111;
    left: 0;
    top: 0;
    border-radius: 10px;
}

@keyframes glowing {
    0% { background-position: 0 0; }
    50% { background-position: 400% 0; }
    100% { background-position: 0 0; }
}

/* Variations */
.rgb-glow-fast:before {
    animation: glowing 8s linear infinite;
}

.rgb-glow-pulse {
    animation: rgb-pulse 3s ease-in-out infinite;
}

.rgb-glow-large {
    padding: 16px 32px;
    font-size: 16px;
    border-radius: 12px;
}

.rgb-glow-large:before {
    border-radius: 12px;
    filter: blur(8px);
    top: -3px;
    left: -3px;
    width: calc(100% + 6px);
    height: calc(100% + 6px);
}`,
            js: `// RGB Glow button interactions
document.querySelectorAll('.rgb-glow').forEach(button => {
    // Enhanced click feedback
    button.addEventListener('click', function(e) {
        e.preventDefault();
        
        // Create a flash effect
        this.style.color = '#000';
        this.style.background = '#fff';
        
        setTimeout(() => {
            this.style.color = '#fff';
            this.style.background = '#111';
        }, 150);
        
        // Add temporary bright glow
        const beforeElement = window.getComputedStyle(this, ':before');
        this.style.setProperty('--temp-glow', '1');
        
        setTimeout(() => {
            this.style.removeProperty('--temp-glow');
        }, 300);
    });
    
    // Enhanced hover effects
    button.addEventListener('mouseenter', function() {
        // Slightly increase glow intensity
        this.style.filter = 'brightness(1.1)';
    });
    
    button.addEventListener('mouseleave', function() {
        this.style.filter = '';
    });
    
    // Keyboard interaction
    button.addEventListener('keydown', function(e) {
        if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault();
            this.click();
        }
    });
    
    // Add focus glow
    button.addEventListener('focus', function() {
        this.style.setProperty('--focus-glow', '1');
    });
    
    button.addEventListener('blur', function() {
        this.style.removeProperty('--focus-glow');
    });
});

// Dynamic RGB glow color changer
function changeRgbGlowColors(button, colors) {
    const gradient = \`linear-gradient(45deg, \${colors.join(', ')})\`;
    button.style.setProperty('--custom-gradient', gradient);
}

// Example usage:
// changeRgbGlowColors(document.querySelector('.rgb-glow'), [
//     '#ff0080', '#ff8000', '#ffff00', '#80ff00', 
//     '#00ff80', '#0080ff', '#8000ff', '#ff0080'
// ]);

// Performance optimization: Pause animations when not visible
const observeRgbGlow = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        const button = entry.target;
        if (entry.isIntersecting) {
            button.style.animationPlayState = 'running';
        } else {
            button.style.animationPlayState = 'paused';
        }
    });
});

document.querySelectorAll('.rgb-glow').forEach(button => {
    observeRgbGlow.observe(button);
});

// Add double-click for special effect
document.querySelectorAll('.rgb-glow').forEach(button => {
    let clickCount = 0;
    
    button.addEventListener('click', function() {
        clickCount++;
        
        if (clickCount === 2) {
            // Double click - trigger rainbow burst
            this.style.animation = 'rainbow-burst 1s ease-out';
            this.style.transform = 'scale(1.1)';
            
            setTimeout(() => {
                this.style.animation = '';
                this.style.transform = '';
                clickCount = 0;
            }, 1000);
        }
        
        setTimeout(() => {
            if (clickCount === 1) {
                clickCount = 0;
            }
        }, 300);
    });
});

// Add rainbow burst animation
const rgbStyle = document.createElement('style');
rgbStyle.textContent = \`
@keyframes rainbow-burst {
    0% {
        filter: hue-rotate(0deg) brightness(1);
        transform: scale(1);
    }
    25% {
        filter: hue-rotate(90deg) brightness(1.3);
        transform: scale(1.05);
    }
    50% {
        filter: hue-rotate(180deg) brightness(1.5);
        transform: scale(1.1);
    }
    75% {
        filter: hue-rotate(270deg) brightness(1.3);
        transform: scale(1.05);
    }
    100% {
        filter: hue-rotate(360deg) brightness(1);
        transform: scale(1);
    }
}
\`;
document.head.appendChild(rgbStyle);`
        },
        
        // Styled Buttons Code Examples
        'glossy': {
            html: `<!-- Glossy Buttons -->
<button class="btn btn-glossy btn-glossy-blue">Glossy Blue</button>
<button class="btn btn-glossy btn-glossy-green">Glossy Green</button>
<button class="btn btn-glossy btn-glossy-red">Glossy Red</button>
<button class="btn btn-glossy btn-glossy-gold">Glossy Gold</button>`,
            css: `/* Enhanced Glossy Button Styles */
.btn-glossy {
    position: relative;
    padding: 12px 24px;
    font-size: 14px;
    font-weight: 600;
    border: none;
    border-radius: 8px;
    cursor: pointer;
    transition: all 0.3s ease;
    overflow: hidden;
    text-shadow: 0 1px 2px rgba(0, 0, 0, 0.4);
    box-shadow: 
        0 6px 12px rgba(0, 0, 0, 0.4),
        0 2px 4px rgba(0, 0, 0, 0.3),
        inset 0 1px 0 rgba(255, 255, 255, 0.6),
        inset 0 -1px 0 rgba(0, 0, 0, 0.3);
}

/* Main glossy highlight */
.btn-glossy::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    height: 60%;
    background: linear-gradient(180deg, 
        rgba(255, 255, 255, 0.7) 0%,
        rgba(255, 255, 255, 0.4) 40%,
        rgba(255, 255, 255, 0.1) 70%,
        transparent 100%);
    border-radius: 8px 8px 20px 20px;
    pointer-events: none;
}

/* Secondary highlight for extra glossiness */
.btn-glossy::after {
    content: '';
    position: absolute;
    top: 2px;
    left: 20%;
    right: 20%;
    height: 30%;
    background: linear-gradient(180deg, 
        rgba(255, 255, 255, 0.9) 0%,
        rgba(255, 255, 255, 0.6) 50%,
        transparent 100%);
    border-radius: 20px;
    pointer-events: none;
    filter: blur(1px);
}

.btn-glossy:hover {
    transform: translateY(-3px);
    box-shadow: 
        0 10px 20px rgba(0, 0, 0, 0.5),
        0 4px 8px rgba(0, 0, 0, 0.3),
        inset 0 1px 0 rgba(255, 255, 255, 0.7),
        inset 0 -1px 0 rgba(0, 0, 0, 0.4);
}

.btn-glossy-blue {
    background: linear-gradient(135deg, #2196F3 0%, #1976D2 50%, #0D47A1 100%);
    color: white;
}`,
            js: `// Enhanced glossy button interactions
document.querySelectorAll('.btn-glossy').forEach(button => {
    button.addEventListener('click', function() {
        // Create a flash effect for extra glossiness
        this.style.transform = 'translateY(-1px) scale(0.98)';
        this.style.filter = 'brightness(1.2)';
        
        setTimeout(() => {
            this.style.transform = '';
            this.style.filter = '';
        }, 150);
    });
    
    // Add extra shine on hover
    button.addEventListener('mouseenter', function() {
        this.style.filter = 'brightness(1.05) contrast(1.1)';
    });
    
    button.addEventListener('mouseleave', function() {
        this.style.filter = '';
    });
    
    // Enhanced focus for accessibility
    button.addEventListener('focus', function() {
        this.style.outline = '2px solid rgba(255, 255, 255, 0.8)';
        this.style.outlineOffset = '2px';
    });
    
    button.addEventListener('blur', function() {
        this.style.outline = '';
        this.style.outlineOffset = '';
    });
});`
        },
        
        'glass': {
            html: `<!-- Glass Morphism Buttons with Background Demo -->
<div class="glass-demo-container">
    <div class="glass-background"></div>
    <button class="btn btn-glass btn-glass-light">Light Glass</button>
    <button class="btn btn-glass btn-glass-dark">Dark Glass</button>
    <button class="btn btn-glass btn-glass-colorful">Colorful</button>
    <button class="btn btn-glass btn-glass-frosted">Frosted</button>
</div>`,
            css: `/* Glass Morphism with Image Background */
.glass-demo-container {
    position: relative;
    padding: 40px;
    border-radius: 16px;
    overflow: hidden;
}

.glass-background {
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background-image: url('https://images.unsplash.com/photo-1760883918278-bf835637e81f?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&q=80&w=1169');
    background-size: cover;
    background-position: center;
    background-repeat: no-repeat;
    z-index: 0;
}

/* Glass Button Styles */
.btn-glass {
    position: relative;
    padding: 12px 24px;
    font-size: 14px;
    font-weight: 500;
    border: 2px solid rgba(255, 255, 255, 0.3);
    border-radius: 12px;
    cursor: pointer;
    transition: all 0.3s ease;
    backdrop-filter: blur(20px);
    -webkit-backdrop-filter: blur(20px);
    color: white;
    text-shadow: 0 1px 2px rgba(0, 0, 0, 0.3);
    overflow: hidden;
    z-index: 2;
}

.btn-glass::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: linear-gradient(135deg, rgba(255, 255, 255, 0.1), rgba(255, 255, 255, 0.05));
    border-radius: 12px;
    z-index: -1;
}

.btn-glass:hover {
    transform: translateY(-2px);
    border-color: rgba(255, 255, 255, 0.5);
    box-shadow: 0 12px 40px rgba(0, 0, 0, 0.4);
}`,
            js: `// Glass button interactions with background effects
document.querySelectorAll('.btn-glass').forEach(button => {
    button.addEventListener('mouseenter', function() {
        this.style.backdropFilter = 'blur(30px)';
        this.style.background = 'rgba(255, 255, 255, 0.2)';
    });
    
    button.addEventListener('mouseleave', function() {
        this.style.backdropFilter = 'blur(20px)';
        this.style.background = '';
    });
    
    button.addEventListener('click', function() {
        // Create ripple effect
        const ripple = document.createElement('div');
        ripple.style.cssText = \`
            position: absolute;
            border-radius: 50%;
            background: rgba(255, 255, 255, 0.6);
            transform: scale(0);
            animation: ripple 0.6s linear;
            pointer-events: none;
        \`;
        
        const rect = this.getBoundingClientRect();
        const size = Math.max(rect.width, rect.height);
        ripple.style.width = ripple.style.height = size + 'px';
        ripple.style.left = (event.clientX - rect.left - size / 2) + 'px';
        ripple.style.top = (event.clientY - rect.top - size / 2) + 'px';
        
        this.appendChild(ripple);
        
        setTimeout(() => {
            ripple.remove();
        }, 600);
    });
});

// Add ripple animation
const style = document.createElement('style');
style.textContent = \`
@keyframes ripple {
    to {
        transform: scale(2);
        opacity: 0;
    }
}
\`;
document.head.appendChild(style);`
        },
        
        'metallic': {
            html: `<!-- Metallic Buttons -->
<button class="btn btn-metallic btn-metallic-silver">Silver</button>
<button class="btn btn-metallic btn-metallic-copper">Copper</button>
<button class="btn btn-metallic btn-metallic-chrome">Chrome</button>
<button class="btn btn-metallic btn-metallic-titanium">Titanium</button>`,
            css: `/* Metallic Button Styles */
.btn-metallic {
    position: relative;
    padding: 12px 24px;
    font-size: 14px;
    font-weight: 600;
    border: none;
    border-radius: 6px;
    cursor: pointer;
    transition: all 0.3s ease;
    text-shadow: 0 1px 1px rgba(0, 0, 0, 0.3);
    box-shadow: 
        0 4px 8px rgba(0, 0, 0, 0.3),
        inset 0 1px 0 rgba(255, 255, 255, 0.3),
        inset 0 -1px 0 rgba(0, 0, 0, 0.2);
}

.btn-metallic-silver {
    background: linear-gradient(135deg, #bdc3c7 0%, #2c3e50 100%);
    color: white;
}`,
            js: `// Metallic button interactions
document.querySelectorAll('.btn-metallic').forEach(button => {
    button.addEventListener('click', function() {
        this.style.boxShadow = 'inset 0 2px 4px rgba(0, 0, 0, 0.3)';
        setTimeout(() => {
            this.style.boxShadow = '';
        }, 150);
    });
});`
        },
        
        'neon': {
            html: `<!-- Neon Glow Buttons -->
<button class="btn btn-neon btn-neon-cyan">Neon Cyan</button>
<button class="btn btn-neon btn-neon-pink">Neon Pink</button>
<button class="btn btn-neon btn-neon-yellow">Neon Yellow</button>
<button class="btn btn-neon btn-neon-purple">Neon Purple</button>`,
            css: `/* Neon Button Styles */
.btn-neon {
    position: relative;
    padding: 12px 24px;
    font-size: 14px;
    font-weight: 600;
    border: 2px solid;
    border-radius: 8px;
    cursor: pointer;
    transition: all 0.3s ease;
    background: transparent;
    text-transform: uppercase;
    letter-spacing: 1px;
    animation: neon-pulse 2s infinite;
}

@keyframes neon-pulse {
    0%, 100% { opacity: 1; }
    50% { opacity: 0.8; }
}

.btn-neon-cyan {
    color: #00ffff;
    border-color: #00ffff;
    box-shadow: 
        0 0 10px #00ffff,
        inset 0 0 10px rgba(0, 255, 255, 0.1);
}`,
            js: `// Neon button interactions
document.querySelectorAll('.btn-neon').forEach(button => {
    button.addEventListener('click', function() {
        const originalShadow = this.style.boxShadow;
        this.style.boxShadow = '0 0 20px currentColor, inset 0 0 20px rgba(255, 255, 255, 0.2)';
        setTimeout(() => {
            this.style.boxShadow = originalShadow;
        }, 300);
    });
});`
        },
        
        'threed': {
            html: `<!-- 3D Effect Buttons -->
<button class="btn btn-3d btn-3d-raised">Raised 3D</button>
<button class="btn btn-3d btn-3d-pressed">Pressed</button>
<button class="btn btn-3d btn-3d-floating">Floating</button>
<button class="btn btn-3d btn-3d-isometric">Isometric</button>`,
            css: `/* 3D Button Styles */
.btn-3d-raised {
    background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
    box-shadow: 
        0 6px 0 #5a67d8,
        0 8px 16px rgba(0, 0, 0, 0.3);
    transform: translateY(0);
}

.btn-3d-raised:hover {
    transform: translateY(-2px);
    box-shadow: 
        0 8px 0 #5a67d8,
        0 12px 20px rgba(0, 0, 0, 0.4);
}

.btn-3d-raised:active {
    transform: translateY(4px);
    box-shadow: 
        0 2px 0 #5a67d8,
        0 4px 8px rgba(0, 0, 0, 0.3);
}`,
            js: `// 3D button interactions
document.querySelectorAll('.btn-3d').forEach(button => {
    button.addEventListener('mousedown', function() {
        this.style.transform = 'translateY(2px) scale(0.98)';
    });
    
    button.addEventListener('mouseup', function() {
        this.style.transform = '';
    });
});`
        },
        
        'gradient-shine': {
            html: `<!-- Gradient Shine Buttons -->
<button class="btn btn-gradient-shine btn-shine-ocean">Ocean Shine</button>
<button class="btn btn-gradient-shine btn-shine-sunset">Sunset</button>
<button class="btn btn-gradient-shine btn-shine-aurora">Aurora</button>
<button class="btn btn-gradient-shine btn-shine-galaxy">Galaxy</button>`,
            css: `/* Gradient Shine Styles */
.btn-gradient-shine {
    position: relative;
    padding: 12px 24px;
    font-size: 14px;
    font-weight: 600;
    border: none;
    border-radius: 8px;
    cursor: pointer;
    transition: all 0.3s ease;
    color: white;
    text-shadow: 0 1px 2px rgba(0, 0, 0, 0.2);
    overflow: hidden;
}

.btn-gradient-shine::before {
    content: '';
    position: absolute;
    top: 0;
    left: -100%;
    width: 100%;
    height: 100%;
    background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.4), transparent);
    transition: left 0.6s ease;
}

.btn-gradient-shine:hover::before {
    left: 100%;
}

.btn-shine-ocean {
    background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
}`,
            js: `// Gradient shine interactions
document.querySelectorAll('.btn-gradient-shine').forEach(button => {
    button.addEventListener('click', function() {
        // Trigger shine effect manually
        const beforeElement = this.querySelector('::before');
        this.style.setProperty('--manual-shine', '1');
        setTimeout(() => {
            this.style.removeProperty('--manual-shine');
        }, 600);
    });
});`
        }
    };
    
    // Open modal and show code
    codeViewBtns.forEach(btn => {
        btn.addEventListener('click', function(e) {
            e.stopPropagation();
            const cardType = this.dataset.card;
            const code = buttonCodes[cardType];
            
            if (code) {
                // Update modal content
                document.getElementById('html-code').textContent = code.html;
                document.getElementById('css-code').textContent = code.css;
                document.getElementById('js-code').textContent = code.js;
                
                // Reset tabs
                tabButtons.forEach(tab => tab.classList.remove('active'));
                tabContents.forEach(content => content.classList.remove('active'));
                
                // Show first tab
                tabButtons[0].classList.add('active');
                tabContents[0].classList.add('active');
                
                // Show modal
                modal.classList.add('active');
                
                // Trigger Prism.js highlighting
                if (window.Prism) {
                    Prism.highlightAll();
                }
            }
        });
    });
    
    // Close modal
    closeModal.addEventListener('click', function() {
        modal.classList.remove('active');
    });
    
    modal.addEventListener('click', function(e) {
        if (e.target === modal) {
            modal.classList.remove('active');
        }
    });
    
    // Tab switching
    tabButtons.forEach(button => {
        button.addEventListener('click', function() {
            const tabName = this.dataset.tab;
            
            // Remove active class from all tabs
            tabButtons.forEach(tab => tab.classList.remove('active'));
            tabContents.forEach(content => content.classList.remove('active'));
            
            // Add active class to clicked tab
            this.classList.add('active');
            document.getElementById(tabName + '-tab').classList.add('active');
            
            // Re-highlight code
            if (window.Prism) {
                Prism.highlightAll();
            }
        });
    });
    
    // Copy functionality
    copyButtons.forEach(button => {
        button.addEventListener('click', function() {
            const codeType = this.dataset.code;
            const codeElement = document.getElementById(codeType + '-code');
            const text = codeElement.textContent;
            
            navigator.clipboard.writeText(text).then(() => {
                // Show feedback
                this.innerHTML = '<span class="material-icons">check</span>Copied!';
                this.style.background = '#34a853';
                this.style.color = 'white';
                
                setTimeout(() => {
                    this.innerHTML = '<span class="material-icons">content_copy</span>Copy';
                    this.style.background = '';
                    this.style.color = '';
                }, 2000);
            });
        });
    });
    
    // ==============================
    // Button Interactions
    // ==============================
    
    // Initialize toggle buttons
    document.querySelectorAll('.btn-toggle').forEach(toggle => {
        toggle.addEventListener('click', function() {
            const isOn = this.dataset.toggle === 'on';
            this.dataset.toggle = isOn ? 'off' : 'on';
        });
    });
    
    // Initialize toggle groups
    document.querySelectorAll('.btn-group-toggle .btn').forEach(button => {
        button.addEventListener('click', function() {
            // Remove active class from siblings
            this.parentNode.querySelectorAll('.btn').forEach(btn => {
                btn.classList.remove('active');
            });
            // Add active class to clicked button
            this.classList.add('active');
        });
    });
    
    // Initialize dropdown functionality
    document.querySelectorAll('.btn-dropdown').forEach(dropdown => {
        const menu = dropdown.querySelector('.dropdown-menu');
        const button = dropdown.querySelector('.btn');
        
        // Toggle dropdown on button click
        button.addEventListener('click', function(e) {
            e.stopPropagation();
            const isVisible = menu.style.visibility === 'visible';
            
            // Close all other dropdowns first
            document.querySelectorAll('.btn-dropdown .dropdown-menu').forEach(otherMenu => {
                if (otherMenu !== menu) {
                    otherMenu.style.opacity = '0';
                    otherMenu.style.visibility = 'hidden';
                    otherMenu.style.transform = 'translateY(-10px)';
                }
            });
            
            // Toggle this dropdown
            if (isVisible) {
                menu.style.opacity = '0';
                menu.style.visibility = 'hidden';
                menu.style.transform = 'translateY(-10px)';
            } else {
                menu.style.opacity = '1';
                menu.style.visibility = 'visible';
                menu.style.transform = 'translateY(0)';
            }
        });
        
        // Close dropdown when clicking outside
        document.addEventListener('click', function(e) {
            if (!dropdown.contains(e.target)) {
                menu.style.opacity = '0';
                menu.style.visibility = 'hidden';
                menu.style.transform = 'translateY(-10px)';
            }
        });
        
        // Dropdown item clicks
        menu.querySelectorAll('.dropdown-item').forEach(item => {
            item.addEventListener('click', function(e) {
                e.preventDefault();
                console.log('Dropdown item clicked:', this.textContent.trim());
                // Close dropdown
                menu.style.opacity = '0';
                menu.style.visibility = 'hidden';
                menu.style.transform = 'translateY(-10px)';
            });
        });
    });
    
    // Initialize ripple effect
    document.querySelectorAll('.btn-ripple').forEach(button => {
        button.addEventListener('click', function(e) {
            const ripple = document.createElement('span');
            const rect = this.getBoundingClientRect();
            const size = Math.max(rect.width, rect.height);
            const x = e.clientX - rect.left - size / 2;
            const y = e.clientY - rect.top - size / 2;
            
            ripple.style.cssText = `
                position: absolute;
                width: ${size}px;
                height: ${size}px;
                left: ${x}px;
                top: ${y}px;
                background: rgba(255, 255, 255, 0.3);
                border-radius: 50%;
                transform: scale(0);
                animation: ripple-animation 0.6s ease-out;
                pointer-events: none;
                z-index: 0;
            `;
            
            this.appendChild(ripple);
            
            setTimeout(() => {
                ripple.remove();
            }, 600);
        });
    });
    
    // Add ripple animation keyframes
    const style = document.createElement('style');
    style.textContent = `
        @keyframes ripple-animation {
            to {
                transform: scale(4);
                opacity: 0;
            }
        }
    `;
    document.head.appendChild(style);
    
    // Initialize loading button demo
    document.querySelectorAll('.btn-loading').forEach(button => {
        button.addEventListener('click', function() {
            // Demo: simulate loading state
            const originalText = this.innerHTML;
            this.innerHTML = '<span class="btn-spinner"></span>Loading...';
            this.disabled = true;
            
            setTimeout(() => {
                this.innerHTML = originalText;
                this.disabled = false;
            }, 3000);
        });
    });
    
    // Keyboard navigation
    document.addEventListener('keydown', function(e) {
        // Close modal with Escape key
        if (e.key === 'Escape' && modal.classList.contains('active')) {
            modal.classList.remove('active');
        }
        
        // Navigate tabs with arrow keys when modal is open
        if (modal.classList.contains('active') && (e.key === 'ArrowLeft' || e.key === 'ArrowRight')) {
            const activeTab = document.querySelector('.tab-button.active');
            const tabs = Array.from(tabButtons);
            const currentIndex = tabs.indexOf(activeTab);
            
            let newIndex;
            if (e.key === 'ArrowLeft') {
                newIndex = currentIndex > 0 ? currentIndex - 1 : tabs.length - 1;
            } else {
                newIndex = currentIndex < tabs.length - 1 ? currentIndex + 1 : 0;
            }
            
            tabs[newIndex].click();
        }
    });
    
    // Console log for demo purposes
    console.log('Button Components Collection initialized!');
    console.log('Available button types:', Object.keys(buttonCodes));
});