let cellSize;
let gameHeight;
let cells;
let cellsNext;

function setup() {
    createCanvas(1920, 1080);
    cellSize = 50;
    gameHeight = 1000;
    cellRowCount = gameHeight / cellSize;
    cells = new Array(cellRowCount * cellRowCount).fill(false);
    cellsNext = [...cells];
    listenForCommand('#randomize', randomizeCells);
}

function draw() {
    drawGrid();
    cells.forEach((cell, index) => {
        const startX = 920 / 2;
        const startY = 80;
        fill(100);
        if (cell) {
            rect(
                startX + ((index % cellRowCount) * cellSize),
                startY + (Math.floor(index / cellRowCount) * cellSize),
                cellSize);
        }
    });
}

function drawGrid() {
    fill(255);
    strokeWeight(4);
    const startX = 920 / 2;
    const startY = 80;
    rect(startX, startY, gameHeight, gameHeight);
    strokeWeight(2)
    textSize(26);
    for (let count = 1; count <= cellRowCount; count += 1) {
        const y = startY + (count * cellSize);
        const x = startX + (count * cellSize);

        line(startX, y, startX + gameHeight, y);
        line(x, startY, x, startY + gameHeight);
        // TODO - align text properly
        // text(count, startX - cellSize - 10, startY + (count * cellSize));
        // text(count, startX + (count * cellSize), startY - cellSize - 10);
    }
}

function randomizeCells() {
    cells = cells.map(cell => {
        return Math.random() < 0.2 ? true : false;
    });

    cellsNext = [...cells];
}