const len = 30;
const initX = 50;
const initY = 150;
let cols, rows;

let margin = 5;
let randYSpace = [];
let randXOffset = [];
let yOff = 0;

const noiseY = new NoiseLoop(1, 0, 10);
const totalFrames = 250;
let percent;

function setup() {
    createCanvas(1000, 600);
    background(230);
    cols = floor((width - 2 * initX) / len);
    rows = floor((height - (initY + initX)) / len);

    for (let j = 0; j < rows; j++) {
        randYSpace[j] = floor(random(0, margin));
        randXOffset[j] = random(0, 10);
    }
}

function draw() {
    background(230);

    noStroke();
    fill(205, 35, 6, 200);

    let currentPos = createVector();
    let xOff = 0;

    percent = float(frameCount % totalFrames) / totalFrames;

    for (let j = 0; j < rows; j++) {
        currentPos.y = randYSpace[j] + initY + j * len;
        yOff = 0;
        for (let i = 0; i < cols; i++) {
            currentPos.x = initX + randXOffset[j] + i * len;
            currentPos.y -= noiseY.value(percent * TWO_PI + xOff + yOff);
            rect(currentPos.x, currentPos.y, len - margin, len - margin);
            yOff += PI / 24;
        }
        xOff += 100;
    }
}
