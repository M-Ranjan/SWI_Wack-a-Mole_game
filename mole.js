let currMoleTile;
let currPlantTile;
let score = 0;
let gameOver = false;
let gameStarted = false;
let timer;
let timeLeft = 30; // Game duration in seconds
let moleInterval;
let plantInterval;

window.onload = function () {
    setGame();

    document.getElementById('startButton').addEventListener('click', startGame);
    document.getElementById('stopButton').addEventListener('click', stopGame);
};

function setGame() {
    for (let i = 0; i < 9; i++) {
        let tile = document.createElement("div");
        tile.id = i.toString();
        tile.addEventListener("click", selectTile);
        document.getElementById("board").appendChild(tile);
    }
}

function getRandomTile() {
    return Math.floor(Math.random() * 9).toString();
}

function setMole() {
    if (gameOver || !gameStarted) return;

    if (currMoleTile) currMoleTile.innerHTML = "";
    let mole = document.createElement("img");
    mole.src = "./monty-mole.png";

    let num = getRandomTile();
    if (currPlantTile && currPlantTile.id === num) return;

    currMoleTile = document.getElementById(num);
    currMoleTile.appendChild(mole);
}

function setPlant() {
    if (gameOver || !gameStarted) return;

    if (currPlantTile) currPlantTile.innerHTML = "";
    let plant = document.createElement("img");
    plant.src = "./piranha-plant.png";

    let num = getRandomTile();
    if (currMoleTile && currMoleTile.id === num) return;

    currPlantTile = document.getElementById(num);
    currPlantTile.appendChild(plant);
}

function selectTile() {
    if (gameOver || !gameStarted) return;

    if (this === currMoleTile) {
        score += 10;
        document.getElementById("score").innerText = `Score: ${score}`;
    } else if (this === currPlantTile) {
        document.getElementById("score").innerText = `GAME OVER: ${score}`;
        gameOver = true;
        stopGame();
    }
}

function startGame() {
    if (gameStarted) return;

    score = 0;
    gameOver = false;
    timeLeft = 30;
    document.getElementById("score").innerText = "Score: 0";
    document.getElementById("timer").innerText = "Timer: 30s";

    gameStarted = true;
    document.getElementById("startButton").disabled = true;
    document.getElementById("stopButton").disabled = false;

    timer = setInterval(function () {
        timeLeft--;
        document.getElementById("timer").innerText = `Timer: ${timeLeft}s`;

        if (timeLeft <= 0) stopGame();
    }, 1000);

    moleInterval = setInterval(setMole, 1000); // Slower mole appearance
    plantInterval = setInterval(setPlant, 1500); // Slower plant appearance
}

function stopGame() {
    gameStarted = false;
    gameOver = true;

    clearInterval(timer);
    clearInterval(moleInterval);
    clearInterval(plantInterval);

    currMoleTile && (currMoleTile.innerHTML = "");
    currPlantTile && (currPlantTile.innerHTML = "");

    document.getElementById("startButton").disabled = false;
    document.getElementById("stopButton").disabled = true;
    document.getElementById("timer").innerText = `Game Stopped! Final Score: ${score}`;
    document.getElementById("score").innerText = "Score: 0"; // Reset score for the next game
}
