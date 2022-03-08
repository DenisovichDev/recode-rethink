let unitGrid = 10;
let cols, rows;
let palette = ["#130F0E", "#023AAE", "#DB0010", "#FEF263", "#DAD0C4"];
let strips = [];
let stripLen;
let frame = 0;
let stripPhases = [];

// Recording
let capture = false;
let count = 0;

function setup() {
    createCanvas(450, 450);

    bg = color("#DAD0C4");
    background(bg);

    frameRate(7);

    cols = width / unitGrid;
    rows = height / unitGrid;

    stripLen = cols * 2;

    for (let j = 0; j < rows; j++) {
        strips[j] = [];
        let c = randomColor();
        for (let i = 0; i < stripLen; i++) {
            if (random(1) < 0.2) c = randomColor();
            strips[j][i] = c;
        }
        stripPhases[j] = randint(0, cols);
    }
}

function draw() {
    background(bg);
    if (frame >= stripLen) frame = 0;
    // console.log(frame);

    for (let y = 0; y < rows; y++) {
        for (let x = 0; x < cols; x++) {
            let i = x + frame + stripPhases[y];
            if (i >= stripLen) i -= stripLen;
            c = strips[y][i];
            drawUnitRect(x, y, c);
        }
    }
    frame++;

    if (capture && frameCount <= 90) {
        saveCanvas("output-" + count, "png");
        count++;
    }
}

function drawUnitRect(x, y, color) {
    push();
    fill(color);
    noStroke();
    rect(x * unitGrid, y * unitGrid, unitGrid, unitGrid);
    pop();
}

function randint(low, high) {
    return floor(random(low, high + 1));
}

function randomColor() {
    return random(shuffle(palette));
}
