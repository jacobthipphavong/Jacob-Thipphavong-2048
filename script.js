const gameContainer = document.querySelector('.game-container');
const scoreDisplay = document.getElementById('score');
const gameOverMessage = document.getElementById('game-over');
const restartButton = document.getElementById('restart-button');

let tiles = [];
let board = Array.from({ length: 4 }, () => Array(4).fill(0));
let score = 0;
let isGameOver = false;

function createTile(value, x, y) {
    const tile = document.createElement('div');
    tile.classList.add('tile');
    tile.textContent = value;
    tile.style.gridColumn = x + 1;
    tile.style.gridRow = y + 1;
    gameContainer.appendChild(tile);
    return tile;
}

function updateTiles() {
    tiles.forEach(tile => {
        tile.parentNode.removeChild(tile);
    });
    tiles = [];

    for (let y = 0; y < 4; y++) {
        for (let x = 0; x < 4; x++) {
            if (board[y][x] !== 0) {
                tiles.push(createTile(board[y][x], x, y));
            }
        }
    }

    scoreDisplay.textContent = `Score: ${score}`;

    if (isGameOver) {
        gameOverMessage.style.display = 'block';
    } else {
        gameOverMessage.style.display = 'none';
    }
}

function generateRandomTile() {
    const availableTiles = [];
    for (let y = 0; y < 4; y++) {
        for (let x = 0; x < 4; x++) {
            if (board[y][x] === 0) {
                availableTiles.push({ x, y });
            }
        }
    }

    if (availableTiles.length > 0) {
        const randomIndex = Math.floor(Math.random() * availableTiles.length);
        const { x, y } = availableTiles[randomIndex];
        board[y][x] = Math.random() < 0.9 ? 2 : 4;
    }
}

function moveTiles(moveFn) {
    const originalBoard = JSON.parse(JSON.stringify(board));
    moveFn();
    if (JSON.stringify(originalBoard) !== JSON.stringify(board)) {
        generateRandomTile();
    }
    updateTiles();
}

function moveLeft() {
    moveTiles(() => {
        for (let y = 0; y < 4; y++) {
            for (let x = 0; x < 3; x++) {
                if (board[y][x] === 0) {
                    continue;
                }
                for (let i = x + 1; i < 4; i++) {
                    if (board[y][i] === 0) {
                        continue;
                    }
                    if (board[y][x] === board[y][i]) {
                        board[y][x] *= 2;
                        score += board[y][x];
                        board[y][i] = 0;
                    }
                    break;
                }
            }

            for (let x = 0; x < 3; x++) {
                if (board[y][x] === 0) {
                    for (let i = x + 1; i < 4; i++) {
                        if (board[y][i] !== 0) {
                            board[y][x] = board[y][i];
                            board[y][i] = 0;
                            break;
                        }
                    }
                }
            }
        }
    });
}

function moveRight() {
    moveTiles(() => {
        for (let y = 0; y < 4; y++) {
            for (let x = 3; x > 0; x--) {
                if (board[y][x] === 0) {
                    continue;
                }
                for (let i = x - 1; i >= 0; i--) {
                    if (board[y][i] === 0) {
                        continue;
                    }
                    if (board[y][x] === board[y][i]) {
                        board[y][x] *= 2;
                        score += board[y][x];
                        board[y][i] = 0;
                    }
                    break;
                }
            }

            for (let x = 3; x > 0; x--) {
                if (board[y][x] === 0) {
                    for (let i = x - 1; i >= 0; i--) {
                        if (board[y][i] !== 0) {
                            board[y][x] = board[y][i];
                            board[y][i] = 0;
                            break;
                        }
                    }
                }
            }
        }
    });
}

function moveUp() {
    moveTiles(() => {
        for (let x = 0; x < 4; x++) {
            for (let y = 0; y < 3; y++) {
                if (board[y][x] === 0) {
                    continue;
                }
                for (let i = y + 1; i < 4;
