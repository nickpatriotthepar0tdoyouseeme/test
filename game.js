const allowedNames = ["Ilia", "Mostafa", "Nick", "Kasra"];
const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');
const clockDing = document.getElementById('clockDing');
const hitSound = document.getElementById('hitSound');
const missSound = document.getElementById('missSound');
let playerShots = 0;
let opponentShots = 0;
let gameStarted = false;
let playerHit = 0;
let opponentHit = 0;

function startGame() {
    const username = document.getElementById('username').value;
    if (!allowedNames.includes(username)) {
        alert("You cannot enter the game!");
        return;
    }

    document.getElementById('loginForm').style.display = 'none';
    canvas.style.display = 'block';
    clockDing.play();

    setTimeout(() => {
        gameStarted = true;
        draw();
    }, 2000); // Wait for clock ding sound before starting
}

function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    
    // Draw player character
    ctx.fillStyle = "blue";
    ctx.fillRect(50, canvas.height / 2 - 50, 50, 100);

    // Draw opponent character
    ctx.fillStyle = "red";
    ctx.fillRect(canvas.width - 100, canvas.height / 2 - 50, 50, 100);

    if (gameStarted) {
        requestAnimationFrame(draw);
    }
}

canvas.addEventListener('click', (event) => {
    if (!gameStarted || playerShots >= 3) return;

    const rect = canvas.getBoundingClientRect();
    const x = event.clientX - rect.left;
    const y = event.clientY - rect.top;

    if (x > canvas.width - 150 && x < canvas.width - 50 && y > canvas.height / 2 - 50 && y < canvas.height / 2 + 50) {
        hitSound.play();
        playerHit++;
        ctx.fillText('Hit!', canvas.width / 2, canvas.height / 2);
    } else {
        missSound.play();
        ctx.fillText('Miss!', canvas.width / 2, canvas.height / 2);
    }

    playerShots++;
    
    if (playerShots >= 3) {
        endGame();
    }
});

function endGame() {
    gameStarted = false;

    let result = '';
    if (playerHit > opponentHit) {
        result = 'You Win!';
    } else if (playerHit < opponentHit) {
        result = 'You Lose!';
    } else {
        result = 'It\'s a Draw!';
    }

    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.fillStyle = "black";
    ctx.font = "30px Arial";
    ctx.fillText(result, canvas.width / 2 - 50, canvas.height / 2);
}
