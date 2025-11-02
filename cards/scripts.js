// Card Components Collection JavaScript
// Basic interactive functionality for card components

document.addEventListener('DOMContentLoaded', function() {
    
    // Add click handlers for interactive buttons
    initializeCardButtons();
    
    // Add keyboard navigation support
    initializeKeyboardNavigation();
    
    // Add intersection observer for scroll animations
    initializeScrollAnimations();
    
    // Initialize animated card interactions
    initializeAnimatedCards();
    
    // Initialize code modal functionality
    initializeCodeModal();
    
    // Initialize dynamic tooltips
    initializeDynamicTooltips();
    
    console.log('Card Components loaded successfully! 🎴');
});

function initializeCardButtons() {
    // Handle primary button clicks
    const primaryButtons = document.querySelectorAll('.btn-primary');
    primaryButtons.forEach(button => {
        button.addEventListener('click', function(e) {
            e.preventDefault();
            const buttonText = button.textContent.trim();
            
            switch(buttonText) {
                case 'Continue':
                case 'Read More':
                    showToast('Button clicked! Ready for your custom action.');
                    break;
                case 'Follow':
                    toggleFollow(button);
                    break;
                case 'Add to Cart':
                    addToCart(button);
                    break;
                case 'Start Free Trial':
                    showToast('Free trial started! Welcome aboard! 🎉');
                    break;
                case 'Read Article':
                    showToast('Opening article... 📖');
                    break;
                default:
                    showToast(`${buttonText} clicked!`);
            }
        });
    });
    
    // Handle icon button clicks
    const iconButtons = document.querySelectorAll('.btn-icon');
    iconButtons.forEach(button => {
        button.addEventListener('click', function(e) {
            e.preventDefault();
            const icon = button.querySelector('.material-icons');
            
            if (icon.textContent === 'bookmark_border') {
                // Toggle bookmark
                icon.textContent = icon.textContent === 'bookmark_border' ? 'bookmark' : 'bookmark_border';
                showToast(icon.textContent === 'bookmark' ? 'Bookmarked!' : 'Bookmark removed');
            } else if (icon.textContent === 'share') {
                // Share functionality
                if (navigator.share) {
                    navigator.share({
                        title: 'Card Component',
                        text: 'Check out this card component design',
                        url: window.location.href
                    });
                } else {
                    showToast('Sharing functionality would go here');
                }
            } else if (icon.textContent === 'shopping_cart') {
                showToast('Quick add to cart! 🛒');
            } else if (icon.textContent === 'more_vert') {
                showToast('Menu options would appear here');
            }
        });
    });
    
    // Handle wishlist buttons
    const wishlistButtons = document.querySelectorAll('.product-wishlist');
    wishlistButtons.forEach(button => {
        button.addEventListener('click', function(e) {
            e.preventDefault();
            const icon = button.querySelector('.material-icons');
            const isLiked = icon.textContent === 'favorite';
            
            icon.textContent = isLiked ? 'favorite_border' : 'favorite';
            button.style.color = isLiked ? '#e74c3c' : '#ff6b6b';
            
            showToast(isLiked ? 'Removed from wishlist' : 'Added to wishlist! ❤️');
        });
    });
    
    // Handle social action buttons
    const socialActions = document.querySelectorAll('.social-action');
    socialActions.forEach(button => {
        button.addEventListener('click', function(e) {
            e.preventDefault();
            const icon = button.querySelector('.material-icons');
            const countSpan = button.querySelector('span:last-child');
            
            if (icon.textContent === 'favorite_border') {
                // Toggle like
                icon.textContent = 'favorite';
                icon.style.color = '#e74c3c';
                const currentCount = parseInt(countSpan.textContent);
                countSpan.textContent = currentCount + 1;
                showToast('Post liked! ❤️');
            } else if (icon.textContent === 'chat_bubble_outline') {
                showToast('Comments would open here 💬');
            } else if (icon.textContent === 'share') {
                showToast('Share options would appear here');
            }
        });
    });
    
    // Handle cancel buttons
    const cancelButtons = document.querySelectorAll('.btn-text');
    cancelButtons.forEach(button => {
        if (button.textContent.includes('Cancel')) {
            button.addEventListener('click', function(e) {
                e.preventDefault();
                showToast('Action cancelled');
            });
        } else if (button.textContent.includes('Message')) {
            button.addEventListener('click', function(e) {
                e.preventDefault();
                showToast('Opening message composer... 💬');
            });
        } else if (button.textContent.includes('Save')) {
            button.addEventListener('click', function(e) {
                e.preventDefault();
                const icon = button.querySelector('.material-icons');
                if (icon) {
                    icon.textContent = icon.textContent === 'bookmark_border' ? 'bookmark' : 'bookmark_border';
                }
                showToast('Article saved for later! 📖');
            });
        }
    });
}

function toggleFollow(button) {
    const isFollowing = button.textContent.trim() === 'Following';
    
    button.textContent = isFollowing ? 'Follow' : 'Following';
    button.style.background = isFollowing ? 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)' : '#27ae60';
    
    showToast(isFollowing ? 'Unfollowed user' : 'Now following! 👥');
}

function addToCart(button) {
    const originalText = button.textContent;
    button.textContent = 'Adding...';
    button.disabled = true;
    
    setTimeout(() => {
        button.textContent = 'Added ✓';
        button.style.background = '#27ae60';
        showToast('Product added to cart! 🛒');
        
        setTimeout(() => {
            button.textContent = originalText;
            button.disabled = false;
            button.style.background = '';
        }, 2000);
    }, 1000);
}

function initializeKeyboardNavigation() {
    // Add keyboard support for cards
    const cards = document.querySelectorAll('.card');
    
    cards.forEach((card, index) => {
        // Make cards focusable
        card.setAttribute('tabindex', '0');
        
        card.addEventListener('keydown', function(e) {
            if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                const primaryButton = card.querySelector('.btn-primary');
                if (primaryButton) {
                    primaryButton.click();
                }
            }
        });
    });
}

function initializeScrollAnimations() {
    // Create intersection observer for scroll-triggered animations
    if ('IntersectionObserver' in window) {
        const observerOptions = {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        };
        
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.style.opacity = '1';
                    entry.target.style.transform = 'translateY(0)';
                }
            });
        }, observerOptions);
        
        // Initially hide cards for animation
        const cards = document.querySelectorAll('.card');
        cards.forEach((card, index) => {
            card.style.opacity = '0';
            card.style.transform = 'translateY(20px)';
            card.style.transition = `opacity 0.6s ease ${index * 0.1}s, transform 0.6s ease ${index * 0.1}s`;
            observer.observe(card);
        });
    }
}

function showToast(message, duration = 3000) {
    // Remove existing toast
    const existingToast = document.querySelector('.toast');
    if (existingToast) {
        existingToast.remove();
    }
    
    // Create new toast
    const toast = document.createElement('div');
    toast.className = 'toast';
    toast.textContent = message;
    
    // Toast styles
    Object.assign(toast.style, {
        position: 'fixed',
        bottom: '24px',
        left: '50%',
        transform: 'translateX(-50%)',
        background: 'rgba(44, 62, 80, 0.95)',
        color: 'white',
        padding: '12px 24px',
        borderRadius: '24px',
        fontSize: '14px',
        fontWeight: '500',
        zIndex: '1000',
        opacity: '0',
        transition: 'opacity 0.3s ease',
        backdropFilter: 'blur(10px)',
        boxShadow: '0 4px 12px rgba(0, 0, 0, 0.2)'
    });
    
    document.body.appendChild(toast);
    
    // Animate in
    setTimeout(() => {
        toast.style.opacity = '1';
    }, 10);
    
    // Remove after duration
    setTimeout(() => {
        toast.style.opacity = '0';
        setTimeout(() => {
            if (document.body.contains(toast)) {
                document.body.removeChild(toast);
            }
        }, 300);
    }, duration);
}

// Card interaction utilities
const CardUtils = {
    // Add a new card dynamically
    addCard: function(cardData) {
        const grid = document.querySelector('.cards-grid');
        const cardElement = this.createCardElement(cardData);
        grid.appendChild(cardElement);
    },
    
    // Create card element from data
    createCardElement: function(data) {
        const card = document.createElement('div');
        card.className = 'card card-basic';
        
        card.innerHTML = `
            ${data.image ? `
                <div class="card-image">
                    <img src="${data.image}" alt="${data.title}" />
                    ${data.badge ? `<div class="card-badge">${data.badge}</div>` : ''}
                </div>
            ` : ''}
            <div class="card-header">
                ${data.icon ? `
                    <div class="card-icon">
                        <span class="material-icons">${data.icon}</span>
                    </div>
                ` : ''}
                <h3 class="card-title">${data.title}</h3>
            </div>
            <div class="card-content">
                <p class="card-text">${data.content}</p>
            </div>
            ${data.actions ? `
                <div class="card-actions">
                    ${data.actions.map(action => `
                        <button class="btn btn-${action.type}">${action.label}</button>
                    `).join('')}
                </div>
            ` : ''}
        `;
        
        return card;
    },
    
    // Remove a card
    removeCard: function(cardElement) {
        cardElement.style.opacity = '0';
        cardElement.style.transform = 'translateY(-20px)';
        
        setTimeout(() => {
            if (cardElement.parentNode) {
                cardElement.parentNode.removeChild(cardElement);
            }
        }, 300);
    }
};

// Export for use in other scripts
window.CardUtils = CardUtils;

function initializeAnimatedCards() {
    // Handle 3D tilt effect
    initializeTiltEffect();
    
    // Handle reveal card click
    initializeRevealCard();
    
    // Handle particle animations
    initializeParticleCards();
    
    // Add touch support for mobile
    initializeMobileAnimations();
}

function initializeTiltEffect() {
    const tiltCards = document.querySelectorAll('.card-tilt');
    
    tiltCards.forEach(card => {
        card.addEventListener('mousemove', function(e) {
            const rect = card.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            
            const centerX = rect.width / 2;
            const centerY = rect.height / 2;
            
            const rotateX = (y - centerY) / 10;
            const rotateY = (centerX - x) / 10;
            
            card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
        });
        
        card.addEventListener('mouseleave', function() {
            card.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg)';
        });
    });
}

function initializeRevealCard() {
    const revealCards = document.querySelectorAll('.card-reveal');
    
    revealCards.forEach(card => {
        const closeBtn = card.querySelector('.reveal-close');
        
        // Click to reveal
        card.addEventListener('click', function(e) {
            if (!card.classList.contains('revealed')) {
                card.classList.add('revealed');
                showToast('Card revealed! Click close to return.');
            }
        });
        
        // Close button
        if (closeBtn) {
            closeBtn.addEventListener('click', function(e) {
                e.stopPropagation();
                card.classList.remove('revealed');
                showToast('Card closed');
            });
        }
        
        // ESC key to close
        document.addEventListener('keydown', function(e) {
            if (e.key === 'Escape' && card.classList.contains('revealed')) {
                card.classList.remove('revealed');
                showToast('Card closed');
            }
        });
    });
}

function initializeParticleCards() {
    const particleCards = document.querySelectorAll('.card-particles');
    
    particleCards.forEach(card => {
        // Add more particles on hover
        card.addEventListener('mouseenter', function() {
            const particles = card.querySelectorAll('.particle');
            particles.forEach(particle => {
                particle.style.animationDuration = '2s';
                particle.style.opacity = '1';
            });
        });
        
        card.addEventListener('mouseleave', function() {
            const particles = card.querySelectorAll('.particle');
            particles.forEach(particle => {
                particle.style.animationDuration = '3s';
                particle.style.opacity = '0.6';
            });
        });
    });
}

function initializeMobileAnimations() {
    // Disable hover effects on touch devices
    if ('ontouchstart' in window) {
        const hoverCards = document.querySelectorAll('.card-flip, .card-hover-lift, .card-glow, .card-slide, .card-morph');
        
        hoverCards.forEach(card => {
            card.addEventListener('touchstart', function() {
                card.classList.add('touch-active');
            });
            
            card.addEventListener('touchend', function() {
                setTimeout(() => {
                    card.classList.remove('touch-active');
                }, 300);
            });
        });
        
        // Add touch-specific styles
        const style = document.createElement('style');
        style.textContent = `
            @media (hover: none) {
                .card-flip.touch-active .card-flip-inner { transform: rotateY(180deg); }
                .card-hover-lift.touch-active { transform: translateY(-12px); }
                .card-glow.touch-active::before { opacity: 1; }
                .card-slide.touch-active .slide-main-content { transform: translateX(-100%); }
                .card-slide.touch-active .slide-overlay { transform: translateX(-100%); }
                .card-morph.touch-active .morph-expanded { transform: translateY(-100%); }
            }
        `;
        document.head.appendChild(style);
    }
}

// Initialize code modal functionality
function initializeCodeModal() {
    const modal = document.getElementById('codeModal');
    const closeModal = document.getElementById('closeModal');
    const tabButtons = document.querySelectorAll('.tab-button');
    const copyButtons = document.querySelectorAll('.copy-button');
    
    // Use event delegation for code view buttons (works for dynamically added buttons)
    document.body.addEventListener('click', function(e) {
        // Check if the clicked element or its parent is a code view button
        const codeBtn = e.target.closest('.code-view-btn');
        if (codeBtn) {
            e.preventDefault();
            e.stopPropagation();
            e.stopImmediatePropagation();
            
            console.log('Code button clicked:', codeBtn); // Debug log
            
            const cardType = codeBtn.getAttribute('data-card');
            const cardElement = codeBtn.closest('.card');
            
            console.log('Card type:', cardType, 'Card element:', cardElement); // Debug log
            
            if (cardType && cardElement) {
                openCodeModal(cardElement, cardType);
            }
            return false;
        }
    }, true); // Use capture phase
    
    // Also add direct event listeners as backup
    setTimeout(() => {
        const allCodeBtns = document.querySelectorAll('.code-view-btn');
        allCodeBtns.forEach((btn, index) => {
            // Remove any existing listeners
            btn.removeEventListener('click', handleCodeButtonClick);
            // Add new listener
            btn.addEventListener('click', handleCodeButtonClick);
            
            console.log(`Added listener to button ${index + 1}:`, btn); // Debug log
        });
    }, 100);
    
    // Modal close handlers
    closeModal.addEventListener('click', () => {
        modal.classList.remove('active');
    });
    
    modal.addEventListener('click', (e) => {
        if (e.target === modal) {
            modal.classList.remove('active');
        }
    });
    
    // ESC key to close modal
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && modal.classList.contains('active')) {
            modal.classList.remove('active');
        }
    });
    
    // Tab switching
    tabButtons.forEach(btn => {
        btn.addEventListener('click', function() {
            const targetTab = this.getAttribute('data-tab');
            switchTab(targetTab);
        });
    });
    
    // Copy functionality
    copyButtons.forEach(btn => {
        btn.addEventListener('click', function() {
            const codeType = this.getAttribute('data-code');
            copyCode(codeType, this);
        });
    });
}

// Separate function for handling code button clicks
function handleCodeButtonClick(e) {
    e.preventDefault();
    e.stopPropagation();
    e.stopImmediatePropagation();
    
    console.log('Direct handler - Code button clicked:', this); // Debug log
    
    const cardType = this.getAttribute('data-card');
    const cardElement = this.closest('.card');
    
    console.log('Direct handler - Card type:', cardType, 'Card element:', cardElement); // Debug log
    
    if (cardType && cardElement) {
        openCodeModal(cardElement, cardType);
    }
    return false;
}

function openCodeModal(cardElement, cardType) {
    const modal = document.getElementById('codeModal');
    const modalTitle = document.querySelector('.modal-title');
    
    // Update modal title
    modalTitle.textContent = `${cardType.charAt(0).toUpperCase() + cardType.slice(1)} Card Code`;
    
    // Generate and display code
    const codes = generateCardCode(cardElement, cardType);
    
    // Set the code content
    const htmlCode = document.getElementById('html-code');
    const cssCode = document.getElementById('css-code');
    const jsCode = document.getElementById('js-code');
    
    htmlCode.textContent = codes.html;
    cssCode.textContent = codes.css;
    jsCode.textContent = codes.js;
    
    // Remove any existing Prism classes to reset highlighting
    [htmlCode, cssCode, jsCode].forEach(element => {
        element.className = element.className.replace(/language-\w+/, '');
    });
    
    // Re-add language classes
    htmlCode.className += ' language-html';
    cssCode.className += ' language-css';
    jsCode.className += ' language-javascript';
    
    // Show modal first
    modal.classList.add('active');
    
    // Highlight syntax after a small delay to ensure modal is visible
    setTimeout(() => {
        if (window.Prism) {
            Prism.highlightAllUnder(modal);
        }
    }, 100);
    
    // Set focus to first tab
    document.querySelector('.tab-button').focus();
}

function switchTab(tabName) {
    // Update tab buttons
    document.querySelectorAll('.tab-button').forEach(btn => {
        btn.classList.remove('active');
    });
    document.querySelector(`[data-tab="${tabName}"]`).classList.add('active');
    
    // Update tab content
    document.querySelectorAll('.tab-content').forEach(content => {
        content.classList.remove('active');
    });
    document.getElementById(`${tabName}-tab`).classList.add('active');
}

async function copyCode(codeType, button) {
    const codeElement = document.getElementById(`${codeType}-code`);
    const code = codeElement.textContent;
    
    try {
        await navigator.clipboard.writeText(code);
        
        // Update button state
        const originalText = button.innerHTML;
        button.innerHTML = '<span class="material-icons">check</span>Copied!';
        button.classList.add('copied');
        
        setTimeout(() => {
            button.innerHTML = originalText;
            button.classList.remove('copied');
        }, 2000);
        
    } catch (err) {
        console.error('Failed to copy: ', err);
        showToast('Failed to copy code');
    }
}

function generateCardCode(cardElement, cardType) {
    // Extract HTML (clean version without code button)
    const cardClone = cardElement.cloneNode(true);
    const codeBtn = cardClone.querySelector('.code-view-btn');
    if (codeBtn) codeBtn.remove();
    
    // Remove data attributes
    cardClone.removeAttribute('data-card-type');
    
    const html = formatHTML(cardClone.outerHTML);
    
    // Generate relevant CSS based on card type
    const css = generateCardCSS(cardType);
    
    // Generate relevant JavaScript
    const js = generateCardJS(cardType);
    
    return { html, css, js };
}

function formatHTML(html) {
    // Use a completely different approach - parse and rebuild
    try {
        // Create a temporary div to parse the HTML
        const tempDiv = document.createElement('div');
        tempDiv.innerHTML = html;
        
        // Function to recursively format elements
        function formatElement(element, indentLevel = 0) {
            const indent = '  '.repeat(indentLevel);
            const tagName = element.tagName.toLowerCase();
            
            // Get attributes
            let attributes = '';
            if (element.attributes.length > 0) {
                const attrs = Array.from(element.attributes).map(attr => 
                    `${attr.name}="${attr.value}"`
                ).join(' ');
                attributes = ' ' + attrs;
            }
            
            // Handle self-closing tags
            if (element.childNodes.length === 0 && ['img', 'br', 'hr', 'input'].includes(tagName)) {
                return indent + `<${tagName}${attributes} />`;
            }
            
            // Check if element has only text content
            const hasOnlyText = element.childNodes.length === 1 && 
                                element.childNodes[0].nodeType === Node.TEXT_NODE;
            
            if (hasOnlyText) {
                const textContent = element.textContent.trim();
                return indent + `<${tagName}${attributes}>${textContent}</${tagName}>`;
            }
            
            // Element has child elements
            let result = indent + `<${tagName}${attributes}>`;
            
            for (const child of element.childNodes) {
                if (child.nodeType === Node.ELEMENT_NODE) {
                    result += '\n' + formatElement(child, indentLevel + 1);
                } else if (child.nodeType === Node.TEXT_NODE) {
                    const text = child.textContent.trim();
                    if (text) {
                        result += '\n' + '  '.repeat(indentLevel + 1) + text;
                    }
                }
            }
            
            result += '\n' + indent + `</${tagName}>`;
            return result;
        }
        
        // Format the first child element
        const firstChild = tempDiv.firstElementChild;
        if (firstChild) {
            const formatted = formatElement(firstChild);
            return formatted;
        }
    } catch (error) {
        console.error('Error formatting HTML:', error);
    }
    
    // Fallback to original if parsing fails
    return html;
}

function generateCardCSS(cardType) {
    const baseCSS = `/* Base Card Styles */
.card {
  background: white;
  border-radius: 16px;
  box-shadow: 
    0 4px 6px rgba(0, 0, 0, 0.05),
    0 1px 3px rgba(0, 0, 0, 0.1);
  overflow: hidden;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  position: relative;
  border: 1px solid rgba(255, 255, 255, 0.2);
}

.card:hover {
  transform: translateY(-4px);
  box-shadow: 
    0 12px 24px rgba(0, 0, 0, 0.1),
    0 4px 8px rgba(0, 0, 0, 0.05);
}

.card-header {
  padding: 1.5rem 1.5rem 0;
}

.card-title {
  font-size: 1.25rem;
  font-weight: 600;
  color: #2c3e50;
  margin-bottom: 0.5rem;
  line-height: 1.4;
}

.card-content {
  padding: 1rem 1.5rem 1.5rem;
}

.card-text {
  color: #5a6c7d;
  font-size: 0.95rem;
  line-height: 1.6;
  margin-bottom: 0;
}`;

    const typeSpecificCSS = {
        basic: '',
        image: `
/* Card with Image */
.card-image {
  position: relative;
  overflow: hidden;
  height: 200px;
}

.card-image img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 0.3s ease;
}

.card:hover .card-image img {
  transform: scale(1.05);
}`,
        flip: `
/* Flip Card Animation */
.card-flip {
  background: transparent;
  border: none;
  perspective: 1000px;
  transform-style: preserve-3d;
  padding: 20px;
}

.card-flip-inner {
  position: relative;
  width: 100%;
  height: 100%;
  text-align: center;
  transition: transform 0.8s cubic-bezier(0.4, 0, 0.2, 1);
  transform-style: preserve-3d;
  border-radius: 16px;
  margin: auto;
}

.card-flip:hover .card-flip-inner {
  transform: rotateY(180deg);
}

.card-flip-front,
.card-flip-back {
  position: absolute;
  width: 100%;
  height: 100%;
  backface-visibility: hidden;
  background: white;
  border-radius: 16px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 2rem;
}

.card-flip-back {
  transform: rotateY(180deg);
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
}`
    };

    return baseCSS + (typeSpecificCSS[cardType] || '');
}

function generateCardJS(cardType) {
    const baseJS = `// Basic Card Interactions
document.addEventListener('DOMContentLoaded', function() {
    initializeCards();
});

function initializeCards() {
    const cards = document.querySelectorAll('.card');
    
    cards.forEach(card => {
        // Add click handler
        card.addEventListener('click', function() {
            console.log('Card clicked:', this);
        });
        
        // Add keyboard support
        card.setAttribute('tabindex', '0');
        card.addEventListener('keydown', function(e) {
            if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                this.click();
            }
        });
    });
}`;

    const typeSpecificJS = {
        flip: `
// Flip Card Specific Interactions
function initializeFlipCards() {
    const flipCards = document.querySelectorAll('.card-flip');
    
    flipCards.forEach(card => {
        // Add click to flip on mobile
        card.addEventListener('click', function() {
            this.classList.toggle('flipped');
        });
        
        // Add keyboard support
        card.addEventListener('keydown', function(e) {
            if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                this.classList.toggle('flipped');
            }
        });
    });
}

// Call initialization
document.addEventListener('DOMContentLoaded', function() {
    initializeFlipCards();
});`,
        reveal: `
// Reveal Card Interactions
function initializeRevealCards() {
    const revealCards = document.querySelectorAll('.card-reveal');
    
    revealCards.forEach(card => {
        const closeBtn = card.querySelector('.reveal-close');
        
        card.addEventListener('click', function() {
            if (!this.classList.contains('revealed')) {
                this.classList.add('revealed');
            }
        });
        
        if (closeBtn) {
            closeBtn.addEventListener('click', function(e) {
                e.stopPropagation();
                card.classList.remove('revealed');
            });
        }
    });
}

// Call initialization
document.addEventListener('DOMContentLoaded', function() {
    initializeRevealCards();
});`
    };

    return typeSpecificJS[cardType] || baseJS;
}

// Dynamic Tooltip System
function initializeDynamicTooltips() {
    const codeButtons = document.querySelectorAll('.code-view-btn[title]');
    let currentTooltip = null;
    let tooltipTimeout = null;
    
    codeButtons.forEach(button => {
        // Remove the title attribute to prevent browser default tooltips
        const tooltipText = button.getAttribute('title');
        button.removeAttribute('title');
        button.setAttribute('data-tooltip', tooltipText);
        
        button.addEventListener('mouseenter', function(e) {
            clearTimeout(tooltipTimeout);
            showTooltip(e.target, tooltipText);
        });
        
        button.addEventListener('mouseleave', function() {
            hideTooltip();
        });
        
        // Also handle focus for keyboard navigation
        button.addEventListener('focus', function(e) {
            clearTimeout(tooltipTimeout);
            showTooltip(e.target, tooltipText);
        });
        
        button.addEventListener('blur', function() {
            hideTooltip();
        });
        
        // Additional cleanup on button click
        button.addEventListener('click', function() {
            hideTooltip();
        });
    });
    
    function showTooltip(element, text) {
        // Clear any existing timeout
        clearTimeout(tooltipTimeout);
        
        // Remove any existing tooltip immediately
        hideTooltip(true);
        
        // Create new tooltip
        const tooltip = document.createElement('div');
        tooltip.className = 'dynamic-tooltip';
        tooltip.textContent = text;
        
        // Add to body first (but keep it invisible)
        tooltip.style.visibility = 'hidden';
        tooltip.style.opacity = '0';
        document.body.appendChild(tooltip);
        currentTooltip = tooltip;
        
        // Wait for next frame to ensure tooltip is rendered and has dimensions
        requestAnimationFrame(() => {
            if (currentTooltip === tooltip) {
                // Position the tooltip
                positionTooltip(element, tooltip);
                
                // Make visible and show
                tooltip.style.visibility = 'visible';
                
                // Small delay for smooth animation
                requestAnimationFrame(() => {
                    if (currentTooltip === tooltip) {
                        tooltip.classList.add('show');
                    }
                });
            }
        });
    }
    
    function hideTooltip(immediate = false) {
        clearTimeout(tooltipTimeout);
        
        if (currentTooltip) {
            const tooltip = currentTooltip;
            currentTooltip = null;
            
            if (immediate) {
                // Remove immediately
                if (tooltip.parentNode) {
                    tooltip.parentNode.removeChild(tooltip);
                }
            } else {
                // Animate out
                tooltip.classList.remove('show');
                tooltipTimeout = setTimeout(() => {
                    if (tooltip.parentNode) {
                        tooltip.parentNode.removeChild(tooltip);
                    }
                }, 300); // Wait for animation to complete
            }
        }
    }
    
    function positionTooltip(element, tooltip) {
        // Ensure element is still in DOM
        if (!element || !element.getBoundingClientRect) {
            return;
        }
        
        const rect = element.getBoundingClientRect();
        
        // Check if element is visible
        if (rect.width === 0 && rect.height === 0) {
            return;
        }
        
        const tooltipRect = tooltip.getBoundingClientRect();
        
        // Reset any previous positioning classes
        tooltip.classList.remove('below');
        
        // Position above the button, centered
        let left = rect.left + (rect.width / 2) - (tooltipRect.width / 2);
        let top = rect.top - tooltipRect.height - 12; // 12px gap
        
        // Adjust if tooltip would go off screen
        const padding = 10;
        const viewportWidth = window.innerWidth;
        const viewportHeight = window.innerHeight;
        
        // Horizontal positioning
        if (left < padding) {
            left = padding;
        } else if (left + tooltipRect.width > viewportWidth - padding) {
            left = viewportWidth - tooltipRect.width - padding;
        }
        
        // Vertical positioning
        if (top < padding) {
            // If no room above, show below
            top = rect.bottom + 12;
            tooltip.classList.add('below');
        }
        
        // Final check - if still off screen, try to fit it
        if (top + tooltipRect.height > viewportHeight - padding) {
            top = viewportHeight - tooltipRect.height - padding;
        }
        
        // Apply positioning
        tooltip.style.left = Math.round(left) + 'px';
        tooltip.style.top = Math.round(top) + 'px';
    }
    
    // Handle window resize to reposition tooltips
    window.addEventListener('resize', function() {
        hideTooltip(true);
    });
    
    // Handle scroll to hide tooltips
    window.addEventListener('scroll', function() {
        hideTooltip();
    }, { passive: true });
    
    // Global mousemove handler to hide tooltip if mouse leaves button area quickly
    document.addEventListener('mousemove', function(e) {
        if (currentTooltip) {
            const buttons = document.querySelectorAll('.code-view-btn');
            let isOverButton = false;
            
            buttons.forEach(button => {
                const rect = button.getBoundingClientRect();
                if (e.clientX >= rect.left && e.clientX <= rect.right &&
                    e.clientY >= rect.top && e.clientY <= rect.bottom) {
                    isOverButton = true;
                }
            });
            
            if (!isOverButton) {
                hideTooltip();
            }
        }
    });
    
    // Handle visibility change (tab switching, etc.)
    document.addEventListener('visibilitychange', function() {
        if (document.hidden) {
            hideTooltip(true);
        }
    });
}
