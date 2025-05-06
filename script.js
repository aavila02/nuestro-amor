// Function to show specific page
function showPage(pageId) {
    document.querySelectorAll('.page').forEach(page => {
        page.classList.remove('active');
    });
    document.getElementById(pageId).classList.add('active');
    
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
}

// Password validation
function checkPassword() {
    const password = document.getElementById('password-input').value;
    const correctPassword = "ariadne123"; // Set your password here
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

// Setup the relationship timer
function updateTimer() {
    // Set the date we're counting from (March 8th, 2025)
    const startDate = new Date(2025, 2, 8); // Month is 0-based, so 2 = March
    
    // Get current date and time
    const now = new Date();
    
    // Calculate time difference
    let timeDiff = now - startDate;
    
    // If current date is before start date, show zeros
    if (timeDiff < 0) {
        document.getElementById('months').textContent = '0';
        document.getElementById('days').textContent = '0';
        document.getElementById('hours').textContent = '00';
        document.getElementById('minutes').textContent = '00';
        document.getElementById('seconds').textContent = '00';
        return;
    }
    
    // Calculate months (approximate, using 30.44 days per month)
    const months = Math.floor(timeDiff / (1000 * 60 * 60 * 24 * 30.44));
    
    // Calculate remaining days after removing full months
    const days = Math.floor((timeDiff - months * 1000 * 60 * 60 * 24 * 30.44) / (1000 * 60 * 60 * 24));
    
    // Calculate hours
    let remainingTime = timeDiff - months * 1000 * 60 * 60 * 24 * 30.44 - days * 1000 * 60 * 60 * 24;
    const hours = Math.floor(remainingTime / (1000 * 60 * 60));
    
    // Calculate minutes
    remainingTime -= hours * (1000 * 60 * 60);
    const minutes = Math.floor(remainingTime / (1000 * 60));
    
    // Calculate seconds
    remainingTime -= minutes * (1000 * 60);
    const seconds = Math.floor(remainingTime / 1000);
    
    // Update the display
    document.getElementById('months').textContent = months;
    document.getElementById('days').textContent = days;
    document.getElementById('hours').textContent = hours < 10 ? '0' + hours : hours;
    document.getElementById('minutes').textContent = minutes < 10 ? '0' + minutes : minutes;
    document.getElementById('seconds').textContent = seconds < 10 ? '0' + seconds : seconds;
}

// Kevin Kaarl Concert countdown timer
function updateConcertTimer() {
    // Set the concert date to August 13th, 2025 at 8:00 PM
    const concertDate = new Date(2025, 7, 13, 20, 0, 0); // August 13th, 2025 at 8:00 PM
    
    // Get current date and time
    const now = new Date();
    
    // Calculate time difference
    let timeDiff = concertDate - now;
    
    // If current date is past concert date, show zeros
    if (timeDiff < 0) {
        document.getElementById('concert-days').textContent = '0';
        document.getElementById('concert-hours').textContent = '00';
        document.getElementById('concert-minutes').textContent = '00';
        document.getElementById('concert-seconds').textContent = '00';
        return;
    }
    
    // Calculate days
    const days = Math.floor(timeDiff / (1000 * 60 * 60 * 24));
    
    // Calculate hours
    let remainingTime = timeDiff - days * 1000 * 60 * 60 * 24;
    const hours = Math.floor(remainingTime / (1000 * 60 * 60));
    
    // Calculate minutes
    remainingTime -= hours * (1000 * 60 * 60);
    const minutes = Math.floor(remainingTime / (1000 * 60));
    
    // Calculate seconds
    remainingTime -= minutes * (1000 * 60);
    const seconds = Math.floor(remainingTime / 1000);
    
    // Update the display
    document.getElementById('concert-days').textContent = days;
    document.getElementById('concert-hours').textContent = hours < 10 ? '0' + hours : hours;
    document.getElementById('concert-minutes').textContent = minutes < 10 ? '0' + minutes : minutes;
    document.getElementById('concert-seconds').textContent = seconds < 10 ? '0' + seconds : seconds;
}

// Return date countdown timer
function updateReturnTimer() {
    // Set the return date to August 10th, 2025 at 1:00 AM
    const returnDate = new Date(2025, 7, 10, 1, 0, 0); // August 10th, 2025 at 1:00 AM
    
    // Get current date and time
    const now = new Date();
    
    // Calculate time difference
    let timeDiff = returnDate - now;
    
    // If current date is past return date, show zeros
    if (timeDiff < 0) {
        document.getElementById('return-days').textContent = '0';
        document.getElementById('return-hours').textContent = '00';
        document.getElementById('return-minutes').textContent = '00';
        document.getElementById('return-seconds').textContent = '00';
        return;
    }
    
    // Calculate days
    const days = Math.floor(timeDiff / (1000 * 60 * 60 * 24));
    
    // Calculate hours
    let remainingTime = timeDiff - days * 1000 * 60 * 60 * 24;
    const hours = Math.floor(remainingTime / (1000 * 60 * 60));
    
    // Calculate minutes
    remainingTime -= hours * (1000 * 60 * 60);
    const minutes = Math.floor(remainingTime / (1000 * 60));
    
    // Calculate seconds
    remainingTime -= minutes * (1000 * 60);
    const seconds = Math.floor(remainingTime / 1000);
    
    // Update the display
    document.getElementById('return-days').textContent = days;
    document.getElementById('return-hours').textContent = hours < 10 ? '0' + hours : hours;
    document.getElementById('return-minutes').textContent = minutes < 10 ? '0' + minutes : minutes;
    document.getElementById('return-seconds').textContent = seconds < 10 ? '0' + seconds : seconds;
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
    // Run hearts effect for all pages
    setupHearts('hearts-canvas-pw');
    setupHearts('hearts-canvas');
    setupHearts('hearts-canvas2');
    setupHearts('hearts-canvas3');
    setupHearts('hearts-canvas4');
    setupHearts('hearts-canvas5');
    
    // Check if user has already authenticated in this session
    const isAuthenticated = sessionStorage.getItem('authenticated');
    if (isAuthenticated === 'true') {
        showPage('page1');
    }
    
    // Initial update for all timers
    updateTimer();
    updateConcertTimer();
    updateReturnTimer();
    
    // Set interval for timers
    setInterval(updateTimer, 1000);
    setInterval(updateConcertTimer, 1000);
    setInterval(updateReturnTimer, 1000);
});