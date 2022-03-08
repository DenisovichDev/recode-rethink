let unitGrid = 20;
let cols, rows;
// b bl r y
let palette = ["#130F0E", "#023AAE", "#DB0010", "#FEF263", "#DAD0C4"];

function setup() {
    createCanvas(600, 800);

    bg = color("#DAD0C4");
    background(bg);

    cols = width / unitGrid;
    rows = height / unitGrid;
}

function draw() {
    background(bg);

    let c = randomColor();

    for (let y = 0; y < rows; y++) {
        for (let x = 0; x < cols; x++) {
            if (random(1) < 0.2) c = randomColor();
            drawUnitRect(x, y, c);
        }
    }

    // Gorilla Grain
    gorillaGrain(15);

    noLoop();
}

function drawUnitRect(x, y, color) {
    push();
    fill(color);
    noStroke();
    // noFill();
    // stroke(color);
    rect(x * unitGrid, y * unitGrid, unitGrid, unitGrid);
    pop();
}

function randint(low, high) {
    return floor(random(low, high + 1));
}

function randomSign() {
    return pow(-1, randint(1, 2));
}

function randomColor() {
    return random(shuffle(palette));
}

function gorillaGrain(gA) {
    loadPixels();
    let d = pixelDensity();
    let halfImage = 4 * (width * d) * (height * d);
    for (let i = 0; i < halfImage; i += 4) {
        grainAmount = map(random(), 0, 1, -gA, gA);
        pixels[i] = pixels[i] + gA / 2;
        pixels[i + 1] = pixels[i + 1] + grainAmount;
        pixels[i + 2] = pixels[i + 2] + grainAmount;
        pixels[i + 3] = pixels[i + 3] + grainAmount;
    }
    updatePixels();
}
