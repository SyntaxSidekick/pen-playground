// Game variables
const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');
const scoreElement = document.getElementById('score');
const livesElement = document.getElementById('lives');
const levelElement = document.getElementById('level');
const gameOverElement = document.getElementById('gameOver');
const finalScoreElement = document.getElementById('finalScore');
const startBtn = document.getElementById('startBtn');
const pauseBtn = document.getElementById('pauseBtn');
const restartBtn = document.getElementById('restartBtn');

// Responsive canvas setup
const GAME_WIDTH = 800;
const GAME_HEIGHT = 600;
let scaleX = 1;
let scaleY = 1;

function setupResponsiveCanvas() {
    const rect = canvas.getBoundingClientRect();
    scaleX = GAME_WIDTH / rect.width;
    scaleY = GAME_HEIGHT / rect.height;
    
    // Set canvas internal resolution
    canvas.width = GAME_WIDTH;
    canvas.height = GAME_HEIGHT;
    
    // Enable crisp pixel rendering
    ctx.imageSmoothingEnabled = false;
}

// Handle window resize
function handleResize() {
    setupResponsiveCanvas();
    
    // Update player position if it's out of bounds
    if (player.x > GAME_WIDTH - player.width) {
        player.x = GAME_WIDTH - player.width;
    }
}

// Initialize responsive canvas
setupResponsiveCanvas();
window.addEventListener('resize', handleResize);
window.addEventListener('orientationchange', () => {
    setTimeout(handleResize, 100); // Delay for orientation change
});

// Game state
let gameState = 'stopped'; // 'stopped', 'playing', 'paused', 'gameOver'
let score = 0;
let lives = 3;
let level = 1;
let animationId;

// Game objects
let player = {
    x: GAME_WIDTH / 2 - 25,
    y: GAME_HEIGHT - 60,
    width: 50,
    height: 30,
    speed: 5,
    isHit: false,
    hitTime: 0
};

let bullets = [];
let invaders = [];
let invaderBullets = [];

// Game settings
const bulletSpeed = 7;
const baseInvaderSpeed = 0.3; // Start very slow
let invaderSpeed = baseInvaderSpeed;
const invaderDropSpeed = 20;
const baseInvaderBulletSpeed = 1.5; // Start slow
let invaderBulletSpeed = baseInvaderBulletSpeed;
const invaderRows = 5;
const invaderCols = 10;

// Speed calculation based on level
function calculateSpeeds() {
    // Speed increases by 50% each level, but starts very slow
    const speedMultiplier = 1 + (level - 1) * 0.5;
    invaderSpeed = baseInvaderSpeed * speedMultiplier;
    invaderBulletSpeed = baseInvaderBulletSpeed * speedMultiplier;
}

// Calculate shooting probability based on level (starts very low)
function getShootingProbability() {
    // Level 1: 0.00005 (very rare), increases more gradually
    // Level 2: 0.00008, Level 3: 0.00012, etc.
    // More gradual increase: base + (level-1) * increment
    const baseProbability = 0.00005;
    const increment = 0.00003;
    return baseProbability + (level - 1) * increment;
}

// Input handling
const keys = {};

document.addEventListener('keydown', (e) => {
    keys[e.code] = true;
});

document.addEventListener('keyup', (e) => {
    keys[e.code] = false;
});

// Button event listeners
startBtn.addEventListener('click', startGame);
pauseBtn.addEventListener('click', togglePause);
restartBtn.addEventListener('click', restartGame);

// Initialize invaders
function createInvaders() {
    invaders = [];
    for (let row = 0; row < invaderRows; row++) {
        for (let col = 0; col < invaderCols; col++) {
            invaders.push({
                x: col * 65 + 50,
                y: row * 50 + 50,
                width: 40,
                height: 30,
                alive: true,
                row: row // Track which row this invader belongs to
            });
        }
    }
}

// Game functions
function startGame() {
    gameState = 'playing';
    score = 0;
    lives = 3;
    level = 1;
    
    // Calculate speeds for level 1
    calculateSpeeds();
    updateUI();
    
    // Reset player position
    player.x = GAME_WIDTH / 2 - 25;
    player.y = GAME_HEIGHT - 60;
    
    // Clear arrays
    bullets = [];
    invaderBullets = [];
    
    // Create invaders
    createInvaders();
    
    // Hide game over screen
    gameOverElement.classList.add('hidden');
    
    // Update buttons
    startBtn.disabled = true;
    pauseBtn.disabled = false;
    
    // Start game loop
    gameLoop();
}

function togglePause() {
    if (gameState === 'playing') {
        gameState = 'paused';
        pauseBtn.textContent = 'Resume';
        cancelAnimationFrame(animationId);
    } else if (gameState === 'paused') {
        gameState = 'playing';
        pauseBtn.textContent = 'Pause';
        gameLoop();
    }
}

function restartGame() {
    gameState = 'stopped';
    startBtn.disabled = false;
    pauseBtn.disabled = true;
    pauseBtn.textContent = 'Pause';
    gameOverElement.classList.add('hidden');
    clearCanvas();
    startGame();
}

function gameOver() {
    gameState = 'gameOver';
    cancelAnimationFrame(animationId);
    
    finalScoreElement.textContent = score;
    gameOverElement.classList.remove('hidden');
    
    startBtn.disabled = false;
    pauseBtn.disabled = true;
    pauseBtn.textContent = 'Pause';
}

function updateUI() {
    // Update score with animation on change
    const newScore = score.toString();
    if (scoreElement.textContent !== newScore) {
        scoreElement.style.transform = 'scale(1.2)';
        setTimeout(() => {
            scoreElement.style.transform = 'scale(1)';
        }, 200);
    }
    scoreElement.textContent = newScore;
    
    // Update level with special animation
    const newLevel = level.toString();
    if (levelElement.textContent !== newLevel && level > 1) {
        levelElement.parentElement.classList.add('level-up');
        setTimeout(() => {
            levelElement.parentElement.classList.remove('level-up');
        }, 600);
    }
    levelElement.textContent = newLevel;
    
    // Update lives with danger warning
    livesElement.textContent = lives;
    if (lives <= 1) {
        livesElement.parentElement.classList.add('low-lives');
    } else {
        livesElement.parentElement.classList.remove('low-lives');
    }
    
    // Add number formatting for score
    if (score >= 1000) {
        scoreElement.textContent = score.toLocaleString();
    }
}

function handleInput() {
    if (gameState !== 'playing') return;
    
    // Player movement
    if (keys['ArrowLeft'] && player.x > 0) {
        player.x -= player.speed;
    }
    if (keys['ArrowRight'] && player.x < GAME_WIDTH - player.width) {
        player.x += player.speed;
    }
    
    // Shooting
    if (keys['Space']) {
        // Limit shooting rate
        const now = Date.now();
        if (!player.lastShot || now - player.lastShot > 200) {
            bullets.push({
                x: player.x + player.width / 2 - 2,
                y: player.y,
                width: 4,
                height: 10
            });
            player.lastShot = now;
        }
    }
}

function updateBullets() {
    // Update player bullets
    bullets = bullets.filter(bullet => {
        bullet.y -= bulletSpeed;
        return bullet.y > -bullet.height;
    });
    
    // Update invader bullets
    invaderBullets = invaderBullets.filter(bullet => {
        bullet.y += invaderBulletSpeed;
        return bullet.y < GAME_HEIGHT;
    });
}

function updateInvaders() {
    let moveDown = false;
    
    // Check if any invader hits the edge
    for (let invader of invaders) {
        if (!invader.alive) continue;
        
        if (invader.x <= 0 || invader.x >= GAME_WIDTH - invader.width) {
            moveDown = true;
            break;
        }
    }
    
    // Reverse direction if moving down
    if (moveDown) {
        invaderSpeed *= -1;
    }
    
    // Move invaders
    for (let invader of invaders) {
        if (!invader.alive) continue;
        
        if (moveDown) {
            invader.y += invaderDropSpeed;
            // Also move horizontally to get away from edge
            invader.x += invaderSpeed;
        } else {
            invader.x += invaderSpeed;
        }
        
        // Random shooting - probability increases with level
        if (Math.random() < getShootingProbability()) {
            invaderBullets.push({
                x: invader.x + invader.width / 2 - 2,
                y: invader.y + invader.height,
                width: 4,
                height: 8
            });
        }
    }
}

function checkCollisions() {
    // Player bullets vs invaders
    for (let i = bullets.length - 1; i >= 0; i--) {
        const bullet = bullets[i];
        
        for (let j = invaders.length - 1; j >= 0; j--) {
            const invader = invaders[j];
            
            if (!invader.alive) continue;
            
            if (bullet.x < invader.x + invader.width &&
                bullet.x + bullet.width > invader.x &&
                bullet.y < invader.y + invader.height &&
                bullet.y + bullet.height > invader.y) {
                
                // Hit!
                bullets.splice(i, 1);
                invader.alive = false;
                score += 10;
                updateUI();
                break;
            }
        }
    }
    
    // Invader bullets vs player
    for (let i = invaderBullets.length - 1; i >= 0; i--) {
        const bullet = invaderBullets[i];
        
        if (bullet.x < player.x + player.width &&
            bullet.x + bullet.width > player.x &&
            bullet.y < player.y + player.height &&
            bullet.y + bullet.height > player.y) {
            
            // Player hit!
            invaderBullets.splice(i, 1);
            lives--;
            
            // Visual feedback - make player flash
            player.isHit = true;
            player.hitTime = Date.now();
            
            updateUI();
            
            if (lives <= 0) {
                gameOver();
                return;
            }
        }
    }
    
    // Check if all invaders are destroyed
    const aliveInvaders = invaders.filter(inv => inv.alive);
    if (aliveInvaders.length === 0) {
        // Level complete - advance to next level
        level++;
        calculateSpeeds(); // Increase speed for new level
        createInvaders();
        score += 100; // Bonus for clearing level
        updateUI();
    }
    
    // Check if invaders reached the bottom (give some buffer space)
    for (let invader of invaders) {
        if (invader.alive && invader.y + invader.height >= player.y - 20) {
            gameOver();
            return;
        }
    }
}

function clearCanvas() {
    ctx.fillStyle = '#000';
    ctx.fillRect(0, 0, GAME_WIDTH, GAME_HEIGHT);
}

function drawPlayer() {
    const x = player.x;
    const y = player.y;
    const w = player.width;
    const h = player.height;
    
    // Check if player should be flashing (hit effect)
    const flashDuration = 1000; // Flash for 1 second
    const flashInterval = 100; // Flash every 100ms
    let shouldFlash = false;
    
    if (player.isHit) {
        const timeSinceHit = Date.now() - player.hitTime;
        if (timeSinceHit < flashDuration) {
            // Create flashing effect
            shouldFlash = Math.floor(timeSinceHit / flashInterval) % 2 === 0;
        } else {
            // Stop flashing after duration
            player.isHit = false;
        }
    }
    
    // If flashing, make ship semi-transparent or change color
    if (shouldFlash) {
        ctx.globalAlpha = 0.3; // Make ship semi-transparent when flashing
    }
    
    // Main body (sleek triangular design)
    ctx.fillStyle = shouldFlash ? '#ff4444' : '#00ccff'; // Red when hit, cyan normally
    ctx.beginPath();
    ctx.moveTo(x + w/2, y); // Top point
    ctx.lineTo(x + w/4, y + h * 0.7); // Left side
    ctx.lineTo(x + w * 0.75, y + h * 0.7); // Right side
    ctx.closePath();
    ctx.fill();
    
    // Cockpit/center section (darker blue)
    ctx.fillStyle = shouldFlash ? '#cc2222' : '#0088cc';
    ctx.beginPath();
    ctx.moveTo(x + w/2, y + 3);
    ctx.lineTo(x + w/2 - 8, y + h * 0.5);
    ctx.lineTo(x + w/2 + 8, y + h * 0.5);
    ctx.closePath();
    ctx.fill();
    
    // Wing extensions (side wings)
    ctx.fillStyle = shouldFlash ? '#ff6666' : '#00aaff';
    // Left wing
    ctx.fillRect(x, y + h * 0.6, w/4, h * 0.3);
    // Right wing  
    ctx.fillRect(x + w * 0.75, y + h * 0.6, w/4, h * 0.3);
    
    // Engine thrusters (back section)
    ctx.fillStyle = shouldFlash ? '#881111' : '#004488';
    ctx.fillRect(x + w/4 + 2, y + h * 0.7, w/2 - 4, h * 0.25);
    
    // Engine glow effects
    ctx.fillStyle = shouldFlash ? '#ff8888' : '#00ffff';
    ctx.fillRect(x + w/4 + 4, y + h * 0.85, 6, 4);
    ctx.fillRect(x + w * 0.75 - 10, y + h * 0.85, 6, 4);
    ctx.fillRect(x + w/2 - 3, y + h * 0.85, 6, 4);
    
    // Weapon systems (front cannons)
    ctx.fillStyle = shouldFlash ? '#ffaa00' : '#ffff00';
    // Left cannon
    ctx.fillRect(x + w/4 - 2, y + h * 0.3, 4, h * 0.4);
    // Right cannon
    ctx.fillRect(x + w * 0.75 - 2, y + h * 0.3, 4, h * 0.4);
    
    // Cockpit window (bright center)
    ctx.fillStyle = shouldFlash ? '#ffcccc' : '#ffffff';
    ctx.beginPath();
    ctx.arc(x + w/2, y + h * 0.3, 3, 0, Math.PI * 2);
    ctx.fill();
    
    // Hull details (small accent lines)
    ctx.strokeStyle = shouldFlash ? '#ffaaaa' : '#ffffff';
    ctx.lineWidth = 1;
    ctx.beginPath();
    // Center line
    ctx.moveTo(x + w/2, y + 8);
    ctx.lineTo(x + w/2, y + h * 0.6);
    ctx.stroke();
    
    // Wing detail lines
    ctx.beginPath();
    ctx.moveTo(x + w/4, y + h * 0.65);
    ctx.lineTo(x + w * 0.75, y + h * 0.65);
    ctx.stroke();
    
    // Reset global alpha
    ctx.globalAlpha = 1.0;
}

function drawBullets() {
    ctx.fillStyle = '#ffff00';
    
    // Player bullets
    for (let bullet of bullets) {
        ctx.fillRect(bullet.x, bullet.y, bullet.width, bullet.height);
    }
    
    // Invader bullets
    ctx.fillStyle = '#ff0000';
    for (let bullet of invaderBullets) {
        ctx.fillRect(bullet.x, bullet.y, bullet.width, bullet.height);
    }
}

function drawInvaders() {
    for (let invader of invaders) {
        if (!invader.alive) continue;
        
        const x = invader.x;
        const y = invader.y;
        const w = invader.width;
        const h = invader.height;
        
        // Different alien design for each row
        switch(invader.row) {
            case 0: // Top row - Octopus-like alien (most points)
                drawOctopusAlien(x, y, w, h);
                break;
            case 1: // Second row - Crab-like alien
                drawCrabAlien(x, y, w, h);
                break;
            case 2: // Third row - Squid-like alien
                drawSquidAlien(x, y, w, h);
                break;
            case 3: // Fourth row - Spider-like alien
                drawSpiderAlien(x, y, w, h);
                break;
            case 4: // Bottom row - Basic UFO alien (least points)
                drawUFOAlien(x, y, w, h);
                break;
        }
    }
}

// Row 0: Octopus Alien (Advanced - Purple/Pink)
function drawOctopusAlien(x, y, w, h) {
    // Main body
    ctx.fillStyle = '#ff00ff'; // Bright magenta
    ctx.beginPath();
    ctx.arc(x + w/2, y + h/3, w/3, 0, Math.PI * 2);
    ctx.fill();
    
    // Eyes
    ctx.fillStyle = '#ffff00'; // Yellow eyes
    ctx.beginPath();
    ctx.arc(x + w/3, y + h/4, 3, 0, Math.PI * 2);
    ctx.arc(x + 2*w/3, y + h/4, 3, 0, Math.PI * 2);
    ctx.fill();
    
    // Eye pupils
    ctx.fillStyle = '#000000';
    ctx.beginPath();
    ctx.arc(x + w/3, y + h/4, 1, 0, Math.PI * 2);
    ctx.arc(x + 2*w/3, y + h/4, 1, 0, Math.PI * 2);
    ctx.fill();
    
    // Tentacles
    ctx.fillStyle = '#cc00cc';
    for(let i = 0; i < 4; i++) {
        const tentX = x + (i + 1) * w/5;
        ctx.fillRect(tentX, y + h/2, 3, h/2);
        // Tentacle tips
        ctx.fillRect(tentX - 1, y + h - 3, 5, 3);
    }
}

// Row 1: Crab Alien (Orange/Red)
function drawCrabAlien(x, y, w, h) {
    // Main shell body
    ctx.fillStyle = '#ff6600'; // Orange
    ctx.fillRect(x + w/4, y + h/4, w/2, h/2);
    
    // Shell pattern
    ctx.fillStyle = '#ff3300'; // Red pattern
    ctx.fillRect(x + w/3, y + h/3, w/3, h/6);
    
    // Eyes on stalks
    ctx.fillStyle = '#ffff00';
    ctx.fillRect(x + w/3 - 2, y, 4, h/3);
    ctx.fillRect(x + 2*w/3 - 2, y, 4, h/3);
    ctx.beginPath();
    ctx.arc(x + w/3, y + 2, 3, 0, Math.PI * 2);
    ctx.arc(x + 2*w/3, y + 2, 3, 0, Math.PI * 2);
    ctx.fill();
    
    // Claws
    ctx.fillStyle = '#ff3300';
    // Left claw
    ctx.fillRect(x, y + h/3, w/4, 4);
    ctx.fillRect(x, y + h/3, 6, 8);
    // Right claw
    ctx.fillRect(x + 3*w/4, y + h/3, w/4, 4);
    ctx.fillRect(x + w - 6, y + h/3, 6, 8);
    
    // Legs
    ctx.fillStyle = '#cc3300';
    for(let i = 0; i < 3; i++) {
        ctx.fillRect(x + w/4 + i * w/6, y + 3*h/4, 2, h/4);
    }
}

// Row 2: Squid Alien (Cyan/Blue)
function drawSquidAlien(x, y, w, h) {
    // Head/body
    ctx.fillStyle = '#00ffff'; // Cyan
    ctx.beginPath();
    ctx.ellipse(x + w/2, y + h/3, w/3, h/4, 0, 0, Math.PI * 2);
    ctx.fill();
    
    // Brain pattern
    ctx.fillStyle = '#0088ff';
    ctx.fillRect(x + w/3, y + h/6, w/3, h/8);
    ctx.fillRect(x + w/2 - 2, y + h/6, 4, h/4);
    
    // Large eyes
    ctx.fillStyle = '#ffffff';
    ctx.beginPath();
    ctx.arc(x + w/3, y + h/3, 4, 0, Math.PI * 2);
    ctx.arc(x + 2*w/3, y + h/3, 4, 0, Math.PI * 2);
    ctx.fill();
    
    // Pupils
    ctx.fillStyle = '#000000';
    ctx.beginPath();
    ctx.arc(x + w/3, y + h/3, 2, 0, Math.PI * 2);
    ctx.arc(x + 2*w/3, y + h/3, 2, 0, Math.PI * 2);
    ctx.fill();
    
    // Tentacles
    ctx.fillStyle = '#00cccc';
    for(let i = 0; i < 6; i++) {
        const tentX = x + w/6 + i * w/8;
        ctx.fillRect(tentX, y + 2*h/3, 2, h/3);
        // Wavy effect
        if(i % 2 === 0) {
            ctx.fillRect(tentX + 2, y + 5*h/6, 2, h/6);
        }
    }
}

// Row 3: Spider Alien (Green)
function drawSpiderAlien(x, y, w, h) {
    // Abdomen
    ctx.fillStyle = '#00ff00'; // Bright green
    ctx.beginPath();
    ctx.ellipse(x + w/2, y + 2*h/3, w/4, h/3, 0, 0, Math.PI * 2);
    ctx.fill();
    
    // Head/thorax
    ctx.fillStyle = '#00cc00';
    ctx.beginPath();
    ctx.arc(x + w/2, y + h/3, w/4, 0, Math.PI * 2);
    ctx.fill();
    
    // Multiple eyes
    ctx.fillStyle = '#ffff00';
    const eyePositions = [[w/3, h/4], [w/2, h/5], [2*w/3, h/4], [w/2, h/3]];
    eyePositions.forEach(([ex, ey]) => {
        ctx.beginPath();
        ctx.arc(x + ex, y + ey, 2, 0, Math.PI * 2);
        ctx.fill();
    });
    
    // Spider legs (4 on each side)
    ctx.fillStyle = '#00aa00';
    ctx.lineWidth = 2;
    ctx.strokeStyle = '#00aa00';
    for(let i = 0; i < 4; i++) {
        const legY = y + h/3 + i * h/8;
        // Left legs
        ctx.beginPath();
        ctx.moveTo(x + w/4, legY);
        ctx.lineTo(x - 5, legY - 5);
        ctx.lineTo(x - 8, legY + 5);
        ctx.stroke();
        // Right legs
        ctx.beginPath();
        ctx.moveTo(x + 3*w/4, legY);
        ctx.lineTo(x + w + 5, legY - 5);
        ctx.lineTo(x + w + 8, legY + 5);
        ctx.stroke();
    }
}

// Row 4: UFO Alien (Simple - Grey/Silver)
function drawUFOAlien(x, y, w, h) {
    // UFO dome
    ctx.fillStyle = '#cccccc'; // Silver
    ctx.beginPath();
    ctx.arc(x + w/2, y + h/3, w/3, Math.PI, 0);
    ctx.fill();
    
    // UFO base
    ctx.fillStyle = '#999999';
    ctx.beginPath();
    ctx.ellipse(x + w/2, y + 2*h/3, w/2, h/6, 0, 0, Math.PI * 2);
    ctx.fill();
    
    // Cockpit window
    ctx.fillStyle = '#00ffff';
    ctx.beginPath();
    ctx.arc(x + w/2, y + h/3, w/6, 0, Math.PI * 2);
    ctx.fill();
    
    // Alien inside
    ctx.fillStyle = '#00ff00';
    ctx.beginPath();
    ctx.arc(x + w/2, y + h/3, w/8, 0, Math.PI * 2);
    ctx.fill();
    
    // UFO lights
    ctx.fillStyle = '#ffff00';
    for(let i = 0; i < 3; i++) {
        const lightX = x + w/4 + i * w/4;
        ctx.beginPath();
        ctx.arc(lightX, y + 2*h/3, 2, 0, Math.PI * 2);
        ctx.fill();
    }
}

function drawStars() {
    ctx.fillStyle = '#ffffff';
    const starCount = 50;
    
    for (let i = 0; i < starCount; i++) {
        const x = (i * 123) % GAME_WIDTH; // Pseudo-random positions
        const y = (i * 456) % GAME_HEIGHT;
        const size = Math.sin(i) * 2 + 1;
        
        ctx.fillRect(x, y, size, size);
    }
}

function render() {
    clearCanvas();
    drawStars();
    
    if (gameState === 'playing' || gameState === 'paused') {
        drawPlayer();
        drawBullets();
        drawInvaders();
        
        // Draw pause message
        if (gameState === 'paused') {
            ctx.fillStyle = 'rgba(0, 0, 0, 0.7)';
            ctx.fillRect(0, 0, GAME_WIDTH, GAME_HEIGHT);
            
            ctx.fillStyle = '#ffff00';
            ctx.font = '48px Courier New';
            ctx.textAlign = 'center';
            ctx.fillText('PAUSED', GAME_WIDTH / 2, GAME_HEIGHT / 2);
            ctx.textAlign = 'left';
        }
    } else {
        // Draw welcome screen
        ctx.fillStyle = '#00ff00';
        ctx.font = '36px Courier New';
        ctx.textAlign = 'center';
        ctx.fillText('SPACE INVADERS', GAME_WIDTH / 2, GAME_HEIGHT / 2 - 50);
        
        ctx.fillStyle = '#ffffff';
        ctx.font = '18px Courier New';
        ctx.fillText('Press START GAME to begin!', GAME_WIDTH / 2, GAME_HEIGHT / 2 + 20);
        ctx.textAlign = 'left';
    }
}

function gameLoop() {
    if (gameState !== 'playing') return;
    
    handleInput();
    updateBullets();
    updateInvaders();
    checkCollisions();
    render();
    
    animationId = requestAnimationFrame(gameLoop);
}

// Initial render
render();

// Prevent spacebar from scrolling the page
document.addEventListener('keydown', (e) => {
    if (e.code === 'Space') {
        e.preventDefault();
    }
});