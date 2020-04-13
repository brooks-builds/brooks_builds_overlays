let cellSize;
let gameHeight;
let cells;
let startsIn;
let paintingMode;
let timer;

function setup() {
    createCanvas(1920, 1080);
    cellSize = 50;
    gameHeight = 1000;
    cellRowCount = gameHeight / cellSize;
    // cells = new Array(cellRowCount * cellRowCount).fill(false);
    cells = new Array(cellRowCount).fill(false).map(row => new Array(cellRowCount).fill(false));
    // listenForCommand('#randomize', randomizeCells);
    listenForCommand('#paint', paintCell);
    startsIn = 60 * 4;
    timer = setInterval(() => startsIn--, 1000);
    paintingMode = true;
    // randomizeCells();
}

function draw() {
    drawGrid();
    drawText();
    cells.forEach((row, rowIndex) => {
        const startX = 920 / 2;
        const startY = 50;
        fill(100);
        row.forEach((cell, cellIndex) => {
            if (cell) {
                rect(
                    startX + cellIndex * cellSize,
                    startY + rowIndex * cellSize,
                    cellSize
                );
            }
        })
    });
    if (startsIn < 0) {
        paintingMode = false;
        frameRate(2);
        runSimulation();
    }
    if (!paintingMode) clearInterval(timer);
}

function drawGrid() {
    clear();
    fill(255);
    strokeWeight(4);
    const startX = 920 / 2;
    const startY = 50;
    rect(startX, startY, gameHeight, gameHeight);
    strokeWeight(2)
    textSize(26);
    for (let count = 1; count <= cellRowCount; count += 1) {
        const y = startY + (count * cellSize);
        const x = startX + (count * cellSize);

        line(startX, y, startX + gameHeight, y);
        line(x, startY, x, startY + gameHeight);
        // TODO - align text properly
        // fill(0)
        text(count, startX - cellSize - 5, startY + (count * cellSize - 20));
        text(count, startX + (count * cellSize) - 40, startY - cellSize + 25);
    }
}

function randomizeCells() {
    cells.forEach(row => {
        for (let index = 0; index < row.length; index++) {
            if (random() < 0.2) row[index] = true;
        }
    });
}

function paintCell(coordinates) {
    coordinates = coordinates.split(',');
    const x = coordinates[0] - 1;
    const y = coordinates[1] - 1;
    cells[y][x] = !cells[y][x];
}

function drawText() {
    const instructions = `To fill a square`;
    const example = 'For example #paint 5,4';

    fill(255);
    text('Game of Life!', 50, 75);
    text('To paint a square', 50, height / 2 - 75);
    text("'#paint x,y' in chat", 50, height / 2);
    text("for example '#paint 5,4'", 50, height / 2 + 75);
    if (paintingMode) {
        text('Simulation starts in', 50, height - 200);
        text(startsIn, 150, height - 150);
    } else {
        text('Simulation running', 50, height - 200);
    }
}

function runSimulation() {
    const nextStageCells = JSON.parse(JSON.stringify(cells));
    cells.forEach((row, rowIndex) => {
        row.forEach((cell, cellIndex) => {
            const neighborCount = countNeighbors(cellIndex, rowIndex);
            if (cell) {
                if (neighborCount < 2 || neighborCount > 3) {
                    // if a cell is alive and has 2 or 3 cells next to it, it stays alive
                    // all other live cells die
                    nextStageCells[rowIndex][cellIndex] = false;
                }
            } else {
                // if a cell is empty and has exactly 3 living cells next to it, it becomes alive
                if (neighborCount == 3) {
                    nextStageCells[rowIndex][cellIndex] = true;
                }
            }
        });
    });
    cells = nextStageCells;
}

function countNeighbors(x, y) {
    let aliveCells = 0;
    if (cells[y - 1] && cells[y - 1][x]) aliveCells++;
    if (cells[y - 1] && cells[y - 1][x + 1]) aliveCells++;
    if (cells[y] && cells[y][x + 1]) aliveCells++;
    if (cells[y + 1] && cells[y + 1][x + 1]) aliveCells++;
    if (cells[y + 1] && cells[y + 1][x]) aliveCells++;
    if (cells[y + 1] && cells[y + 1][x - 1]) aliveCells++;
    if (cells[y] && cells[y][x - 1]) aliveCells++;
    if (cells[y - 1] && cells[y - 1][x - 1]) aliveCells++;
    return aliveCells;
}