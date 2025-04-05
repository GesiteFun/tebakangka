document.addEventListener('DOMContentLoaded', () => {
    const guessInput = document.getElementById('guess-input');
    const guessBtn = document.getElementById('guess-btn');
    const newGameBtn = document.getElementById('new-game-btn');
    const message = document.getElementById('message');
    const attemptsDisplay = document.getElementById('attempts');
    const bestScoreDisplay = document.getElementById('best-score');
    const historyContainer = document.getElementById('history');
    
    let secretNumber;
    let attempts;
    let bestScore = localStorage.getItem('bestScore') || null;
    
    // Initialize game
    initGame();
    
    // Set best score display
    if (bestScore) {
        bestScoreDisplay.textContent = bestScore;
    }
    
    // Guess button event
    guessBtn.addEventListener('click', checkGuess);
    
    // Also check guess when Enter is pressed
    guessInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
            checkGuess();
        }
    });
    
    // New game button event
    newGameBtn.addEventListener('click', initGame);
    
    function initGame() {
        secretNumber = Math.floor(Math.random() * 100) + 1;
        attempts = 0;
        attemptsDisplay.textContent = attempts;
        message.textContent = '';
        historyContainer.innerHTML = '';
        guessInput.value = '';
        guessInput.focus();
    }
    
    function checkGuess() {
        const guess = parseInt(guessInput.value);
        
        // Validate input
        if (isNaN(guess)) {
            message.textContent = 'Silakan masukkan angka yang valid!';
            message.style.color = '#ff6b6b';
            return;
        }
        
        if (guess < 1 || guess > 100) {
            message.textContent = 'Angka harus antara 1 dan 100!';
            message.style.color = '#ff6b6b';
            return;
        }
        
        // Increment attempts
        attempts++;
        attemptsDisplay.textContent = attempts;
        
        // Add to history
        const historyItem = document.createElement('div');
        historyItem.classList.add('history-item');
        historyItem.textContent = guess;
        historyContainer.prepend(historyItem);
        
        // Check guess
        if (guess === secretNumber) {
            // Win condition
            message.textContent = `Selamat! Anda menebak angka ${secretNumber} dalam ${attempts} percobaan!`;
            message.style.color = '#2ecc71';
            
            // Update best score
            if (!bestScore || attempts < bestScore) {
                bestScore = attempts;
                bestScoreDisplay.textContent = bestScore;
                localStorage.setItem('bestScore', bestScore);
            }
            
            guessInput.disabled = true;
            guessBtn.disabled = true;
        } else if (guess < secretNumber) {
            message.textContent = 'Terlalu rendah! Coba lagi.';
            message.style.color = '#4facfe';
        } else {
            message.textContent = 'Terlalu tinggi! Coba lagi.';
            message.style.color = '#4facfe';
        }
        
        // Clear input
        guessInput.value = '';
        guessInput.focus();
    }
});