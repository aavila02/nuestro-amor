// Supabase configuration
const SUPABASE_URL = 'https://kaldxudmjetzyfreeriz.supabase.co'
const SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImthbGR4dWRtamV0enlmcmVlcml6Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTAyMTcwOTQsImV4cCI6MjA2NTc5MzA5NH0.zc9fms3JV5Sx-mk767EUhSp4uoSIFFmEpsWxZt4-cn8'

// Initialize Supabase client
const supabase = window.supabase.createClient(SUPABASE_URL, SUPABASE_ANON_KEY)

// Upload picture function
async function uploadPicture(file) {
    if (!file) return;
    
    // Show loading state
    const uploadButton = document.querySelector('.upload-button');
    const originalText = uploadButton.innerHTML;
    uploadButton.innerHTML = '⏳ Uploading...';
    uploadButton.disabled = true;
    
    try {
        // Create unique filename
        const fileExt = file.name.split('.').pop();
        const fileName = `pic-${Date.now()}.${fileExt}`;
        
        // Upload to Supabase storage
        const { data, error } = await supabase.storage
            .from('daily-pictures')
            .upload(fileName, file, {
                cacheControl: '3600',
                upsert: false
            });
            
        if (error) {
            console.error('Upload error:', error);
            alert('Upload failed! Please try again.');
        } else {
            console.log('Upload successful:', data);
            // Refresh the picture display
            loadTodaysPicture();
            alert('Picture uploaded successfully! 📷');
        }
    } catch (error) {
        console.error('Upload error:', error);
        alert('Upload failed! Please try again.');
    } finally {
        // Reset button
        uploadButton.innerHTML = originalText;
        uploadButton.disabled = false;
    }
}
// Smooth, efficient timer implementation with better performance and accuracy

class RelationshipTimer {
    constructor(startDate) {
        this.startDate = new Date(startDate);
        this.isRunning = false;
        this.animationFrame = null;
        this.lastUpdate = 0;
        this.elements = {};
        
        // Cache DOM elements once
        this.cacheElements();
    }
    
    cacheElements() {
        this.elements = {
            months: document.getElementById('months'),
            days: document.getElementById('days'),
            hours: document.getElementById('hours'),
            minutes: document.getElementById('minutes'),
            seconds: document.getElementById('seconds')
        };
    }
    
    // More accurate time calculation using exact date math
    calculateTime() {
        const now = new Date();
        
        if (now < this.startDate) {
            return { months: 0, days: 0, hours: 0, minutes: 0, seconds: 0 };
        }
        
        // Calculate months and days more accurately
        let years = now.getFullYear() - this.startDate.getFullYear();
        let months = now.getMonth() - this.startDate.getMonth();
        let days = now.getDate() - this.startDate.getDate();
        
        // Adjust for negative days
        if (days < 0) {
            months--;
            const lastMonth = new Date(now.getFullYear(), now.getMonth(), 0);
            days += lastMonth.getDate();
        }
        
        // Adjust for negative months
        if (months < 0) {
            years--;
            months += 12;
        }
        
        // Convert years to months
        months += years * 12;
        
        // Calculate time components for the current day
        const startOfToday = new Date(now.getFullYear(), now.getMonth(), now.getDate());
        const startDateTime = new Date(this.startDate.getFullYear(), this.startDate.getMonth(), this.startDate.getDate());
        
        let timeToday;
        if (startOfToday.getTime() === startDateTime.getTime()) {
            // Same day as start date, calculate from start time
            timeToday = now - this.startDate;
        } else {
            // Different day, calculate from start of today
            timeToday = now - startOfToday;
        }
        
        const hours = Math.floor(timeToday / (1000 * 60 * 60));
        const minutes = Math.floor((timeToday % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((timeToday % (1000 * 60)) / 1000);
        
        return { months, days, hours, minutes, seconds };
    }
    
    // Smooth update using requestAnimationFrame for better performance
    update() {
        const now = performance.now();
        
        // Only update display once per second to avoid unnecessary DOM manipulation
        if (now - this.lastUpdate >= 1000) {
            this.updateDisplay();
            this.lastUpdate = now;
        }
        
        if (this.isRunning) {
            this.animationFrame = requestAnimationFrame(() => this.update());
        }
    }
    
    updateDisplay() {
        // Check if elements exist (re-cache if needed)
        if (!this.elements.months) {
            this.cacheElements();
        }
        
        // If still no elements, skip update
        if (!this.elements.months) return;
        
        const time = this.calculateTime();
        
        // Batch DOM updates for better performance
        requestAnimationFrame(() => {
            this.elements.months.textContent = time.months;
            this.elements.days.textContent = time.days;
            this.elements.hours.textContent = time.hours.toString().padStart(2, '0');
            this.elements.minutes.textContent = time.minutes.toString().padStart(2, '0');
            this.elements.seconds.textContent = time.seconds.toString().padStart(2, '0');
        });
    }
    
    start() {
        if (this.isRunning) return;
        
        this.isRunning = true;
        this.lastUpdate = 0; // Force immediate update
        this.update();
    }
    
    stop() {
        this.isRunning = false;
        if (this.animationFrame) {
            cancelAnimationFrame(this.animationFrame);
            this.animationFrame = null;
        }
    }
    
    // Method to force immediate update (useful for testing)
    refresh() {
        this.updateDisplay();
    }
}

// Concert timer class (similar smooth implementation)
class ConcertTimer {
    constructor(concertDate) {
        this.concertDate = new Date(concertDate);
        this.isRunning = false;
        this.animationFrame = null;
        this.lastUpdate = 0;
        this.elements = {};
        
        this.cacheElements();
    }
    
    cacheElements() {
        this.elements = {
            days: document.getElementById('concert-days'),
            hours: document.getElementById('concert-hours'),
            minutes: document.getElementById('concert-minutes'),
            seconds: document.getElementById('concert-seconds')
        };
    }
    
    calculateTime() {
        const now = new Date();
        const timeDiff = this.concertDate - now;
        
        if (timeDiff <= 0) {
            return { days: 0, hours: 0, minutes: 0, seconds: 0 };
        }
        
        const days = Math.floor(timeDiff / (1000 * 60 * 60 * 24));
        const hours = Math.floor((timeDiff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((timeDiff % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((timeDiff % (1000 * 60)) / 1000);
        
        return { days, hours, minutes, seconds };
    }
    
    update() {
        const now = performance.now();
        
        if (now - this.lastUpdate >= 1000) {
            this.updateDisplay();
            this.lastUpdate = now;
        }
        
        if (this.isRunning) {
            this.animationFrame = requestAnimationFrame(() => this.update());
        }
    }
    
    updateDisplay() {
        if (!this.elements.days) {
            this.cacheElements();
        }
        
        if (!this.elements.days) return;
        
        const time = this.calculateTime();
        
        requestAnimationFrame(() => {
            this.elements.days.textContent = time.days;
            this.elements.hours.textContent = time.hours.toString().padStart(2, '0');
            this.elements.minutes.textContent = time.minutes.toString().padStart(2, '0');
            this.elements.seconds.textContent = time.seconds.toString().padStart(2, '0');
        });
    }
    
    start() {
        if (this.isRunning) return;
        this.isRunning = true;
        this.lastUpdate = 0;
        this.update();
    }
    
    stop() {
        this.isRunning = false;
        if (this.animationFrame) {
            cancelAnimationFrame(this.animationFrame);
            this.animationFrame = null;
        }
    }
}

// Global timer instances
let relationshipTimer = null;
let concertTimer = null;

// Initialize timers
function initializeTimers() {
    relationshipTimer = new RelationshipTimer('2025-03-08T00:00:00');
    concertTimer = new ConcertTimer('2025-08-13T20:00:00'); // August 13th, 2025 at 8:00 PM
}

// Function to show specific page
function showPage(pageId) {
    document.querySelectorAll('.page').forEach(page => {
        page.classList.remove('active');
    });
    document.getElementById(pageId).classList.add('active');
    
    // Stop all timers first
    if (relationshipTimer) relationshipTimer.stop();
    if (concertTimer) concertTimer.stop();
    
    // Reset food picker elements when showing the food picker page
    if(pageId === 'food-picker-page') {
        resetFoodPicker();
        
        // Ensure the title is correct
        document.querySelector('.food-picker-title').textContent = "Where are we being bigbacks?";
        
        // Set default example values after a short delay (for better mobile experience)
        setTimeout(() => {
            if(document.getElementById('food-options').value === '') {
                document.getElementById('food-options').value = "";
            }
        }, 300);
    }
        // Handle picture page setup
    if(pageId === 'picture-page') {
        updateCurrentDate();
        loadTodaysPicture();
    }
    
    // Start appropriate timer based on page
    if(pageId === 'page2' && relationshipTimer) {
        // Small delay to ensure DOM is ready
        setTimeout(() => {
            relationshipTimer.start();
        }, 50);
    }
    
    if(pageId === 'concert-page' && concertTimer) {
        setTimeout(() => {
            concertTimer.start();
        }, 50);
    }
}

// Password validation
function checkPassword() {
    const password = document.getElementById('password-input').value;
    const correctPassword = "ariadne123";
    const errorElement = document.getElementById('password-error');
    const container = document.querySelector('.password-container');
    
    if (password === correctPassword) {
        // Password is correct, show the main page
        showPage('page1');
        // Save authentication state for this session
        sessionStorage.setItem('authenticated', 'true');
        // Reset the password field for next time
        document.getElementById('password-input').value = '';
        errorElement.classList.remove('visible');
    } else {
        // Password is incorrect, show error and shake effect
        errorElement.classList.add('visible');
        container.classList.add('shake');
        
        // Remove shake class after animation completes
        setTimeout(() => {
            container.classList.remove('shake');
        }, 500);
    }
}

// Allow pressing Enter key to submit password
function checkEnter(event) {
    if (event.key === "Enter") {
        checkPassword();
    }
}

// Food Picker Functions
function startFoodPicker() {
    // Get the food options from textarea
    const optionsText = document.getElementById('food-options').value.trim();
    
    // Check if there are any options
    if(!optionsText) {
        alert('Please enter at least one food option!');
        return;
    }
    
    // Parse the options (split by new line)
    const options = optionsText.split('\n').filter(option => option.trim());
    
    // Make sure there's at least one valid option
    if(options.length === 0) {
        alert('Please enter at least one food option!');
        return;
    }
    
    // Hide the input and pick button
    document.getElementById('food-options').disabled = true;
    document.getElementById('pick-food-btn').style.display = 'none';
    
    // Show the countdown
    const countdownDisplay = document.getElementById('countdown-display');
    countdownDisplay.style.display = 'flex';
    const countdownNumber = document.getElementById('countdown-number');
    
    // Start countdown
    let count = 3;
    countdownNumber.textContent = count;
    
    const countdownInterval = setInterval(() => {
        count--;
        
        if(count > 0) {
            countdownNumber.textContent = count;
        } else {
            // Clear the interval
            clearInterval(countdownInterval);
            
            // Hide countdown
            countdownDisplay.style.display = 'none';
            
            // Show the result
            showFoodResult(options);
        }
    }, 1000);
}

function showFoodResult(options) {
    // Pick a random option
    const randomIndex = Math.floor(Math.random() * options.length);
    const selectedOption = options[randomIndex];
    
    // Display the result
    const resultContainer = document.getElementById('result-container');
    const foodResult = document.getElementById('food-result');
    
    foodResult.textContent = selectedOption;
    resultContainer.style.display = 'flex';
    
    // Show the pick again button after a short delay
    setTimeout(() => {
        const pickButton = document.getElementById('pick-food-btn');
        pickButton.textContent = 'Pick Again!';
        pickButton.style.display = 'block';
    }, 1500);
}

function resetFoodPicker() {
    // Reset all elements to initial state
    document.getElementById('food-options').disabled = false;
    document.getElementById('food-options').value = '';
    document.getElementById('food-options').style.textAlign = 'center';
    
    document.getElementById('pick-food-btn').textContent = "Pick!";
    document.getElementById('pick-food-btn').style.display = 'block';
    
    document.getElementById('countdown-display').style.display = 'none';
    document.getElementById('result-container').style.display = 'none';
}

// Setup floating hearts background
function setupHearts(canvasId) {
    const canvas = document.getElementById(canvasId);
    if (!canvas) return; // Skip if no canvas
    
    const ctx = canvas.getContext('2d');
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    let hearts = [];
    const colors = ['#ffb6c1', '#e75480', '#ff4d6d', '#ff1a4b'];
    
    function drawHeart(x, y, size, color) {
        ctx.fillStyle = color;
        ctx.globalAlpha = 1;
        
        ctx.beginPath();
        ctx.moveTo(x, y + size * 0.25);
        ctx.bezierCurveTo(
            x, y, 
            x - size * 0.5, y, 
            x - size * 0.5, y + size * 0.25
        );
        ctx.bezierCurveTo(
            x - size * 0.5, y + size * 0.4, 
            x, y + size * 0.7, 
            x, y + size * 0.8
        );
        ctx.bezierCurveTo(
            x, y + size * 0.7, 
            x + size * 0.5, y + size * 0.4, 
            x + size * 0.5, y + size * 0.25
        );
        ctx.bezierCurveTo(
            x + size * 0.5, y, 
            x, y, 
            x, y + size * 0.25
        );
        ctx.closePath();
        ctx.fill();
    }

    function createHeart() {
        const x = Math.random() * canvas.width;
        const y = canvas.height + 50;
        const size = Math.random() * 15 + 10;
        const speed = Math.random() * 1 + 0.5;
        const color = colors[Math.floor(Math.random() * colors.length)];
        const opacity = Math.random() * 0.5 + 0.3;
        const wobbleSpeed = Math.random() * 0.03 + 0.01;
        const wobbleSize = Math.random() * 25 + 5;
        
        hearts.push({
            x: x,
            y: y,
            origX: x,
            size: size,
            speed: speed,
            color: color,
            opacity: opacity,
            wobbleSpeed: wobbleSpeed,
            wobbleSize: wobbleSize,
            angle: 0
        });
        
        // Schedule next heart creation
        setTimeout(createHeart, Math.random() * 1000 + 300);
    }

    function animate() {
        requestAnimationFrame(animate);
        ctx.clearRect(0, 0, canvas.width, canvas.height);

        for (let i = 0; i < hearts.length; i++) {
            const h = hearts[i];
            
            // Update position
            h.y -= h.speed;
            h.angle += h.wobbleSpeed;
            h.x = h.origX + Math.sin(h.angle) * h.wobbleSize;
            
            // Remove hearts that have gone off screen
            if (h.y < -50) {
                hearts.splice(i, 1);
                i--;
                continue;
            }
            
            // Draw the heart
            ctx.globalAlpha = h.opacity;
            drawHeart(h.x, h.y, h.size, h.color);
        }
    }

    // Start animation and create first heart
    animate();
    createHeart();
    
    // Create initial set of hearts
    for (let i = 0; i < 10; i++) {
        setTimeout(() => {
            const x = Math.random() * canvas.width;
            const y = Math.random() * canvas.height;
            const size = Math.random() * 15 + 10;
            const speed = Math.random() * 1 + 0.5;
            const color = colors[Math.floor(Math.random() * colors.length)];
            const opacity = Math.random() * 0.5 + 0.3;
            const wobbleSpeed = Math.random() * 0.03 + 0.01;
            const wobbleSize = Math.random() * 25 + 5;
            
            hearts.push({
                x: x,
                y: y,
                origX: x,
                size: size,
                speed: speed,
                color: color,
                opacity: opacity,
                wobbleSpeed: wobbleSpeed,
                wobbleSize: wobbleSize,
                angle: 0
            });
        }, i * 300);
    }
    
    // Adjust for window resizing
    window.addEventListener('resize', function() {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
    });
}

// Toggle music play/pause
function toggleMusic() {
    const audio = document.getElementById('background-music');
    const button = document.getElementById('play-music');
    
    if (audio.paused) {
        audio.play();
        button.innerHTML = `
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                <rect x="6" y="4" width="4" height="16"/>
                <rect x="14" y="4" width="4" height="16"/>
            </svg>
            Pause music
        `;
    } else {
        audio.pause();
        button.innerHTML = `
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5" />
                <path d="M15.54 8.46a5 5 0 0 1 0 7.07" />
                <path d="M19.07 4.93a10 10 0 0 1 0 14.14" />
            </svg>
            Play our song
        `;
    }
}

// Setup all needed functionality when page loads
document.addEventListener('DOMContentLoaded', function() {
    console.log('Initializing smooth timers...');
    
    // Initialize timer classes
    initializeTimers();
    
    // Run hearts effect for all pages
    setupHearts('hearts-canvas-pw');
    setupHearts('hearts-canvas');
    setupHearts('hearts-canvas2');
    setupHearts('hearts-canvas3');
    setupHearts('hearts-canvas4');
    setupHearts('hearts-canvas5');
    setupHearts('hearts-canvas-picture');
    
    // Check if user has already authenticated in this session
    const isAuthenticated = sessionStorage.getItem('authenticated');
    if (isAuthenticated === 'true') {
        showPage('page1');
    }
    
    console.log('Smooth timer setup complete');
});

// Picture page functions
function updateCurrentDate() {
    const now = new Date();
    const options = { 
        year: 'numeric', 
        month: 'long', 
        day: 'numeric'
    };
    const dateString = now.toLocaleDateString('en-US', options);
    document.getElementById('current-date').textContent = dateString;
}

async function loadTodaysPicture() {
    const img = document.getElementById('daily-picture');
    const placeholder = document.getElementById('picture-placeholder');
    
    try {
        // First try to load from Supabase storage
        const { data, error } = await supabase.storage
            .from('daily-pictures')
            .list('', {
                limit: 1,
                sortBy: { column: 'created_at', order: 'desc' }
            });
            
        if (!error && data && data.length > 0) {
            // Get the most recent uploaded picture
            const latestFile = data[0];
            const { data: urlData } = supabase.storage
                .from('daily-pictures')
                .getPublicUrl(latestFile.name);
                
            img.onload = function() {
                placeholder.style.display = 'none';
                img.style.display = 'block';
            };
            
            img.onerror = function() {
                fallbackToLocalPicture();
            };
            
            img.src = urlData.publicUrl;
            return;
        }
    } catch (error) {
        console.log('Supabase error, falling back to local:', error);
    }
    
    // Fallback to local pic files
    fallbackToLocalPicture();
}

function fallbackToLocalPicture() {
    const img = document.getElementById('daily-picture');
    const placeholder = document.getElementById('picture-placeholder');
    const extensions = ['jpg', 'jpeg', 'png', 'heic'];
    let currentExtension = 0;
    
    function tryNextExtension() {
        if (currentExtension >= extensions.length) {
            placeholder.style.display = 'flex';
            img.style.display = 'none';
            return;
        }
        
        const extension = extensions[currentExtension];
        const imageUrl = `pic.${extension}`;
        
        img.onload = function() {
            placeholder.style.display = 'none';
            img.style.display = 'block';
        };
        
        img.onerror = function() {
            currentExtension++;
            tryNextExtension();
        };
        
        img.src = imageUrl;
    }
    
    tryNextExtension();
}

// Utility function for manual timer refresh (for debugging)
function refreshTimers() {
    if (relationshipTimer) relationshipTimer.refresh();
    if (concertTimer) concertTimer.refresh();
}