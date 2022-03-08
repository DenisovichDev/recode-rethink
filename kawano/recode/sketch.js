let unitGrid = 20;
let cols, rows;
let palette = ["#130F0E", "#023AAE", "#DB0010", "#FEF263"];

function setup() {
    createCanvas(600, 800);

    bg = color("#DAD0C4");
    background(bg);

    cols = width / unitGrid;
    rows = height / unitGrid;
}

function draw() {
    background(bg);

    shuffle(palette).forEach((c) => {
        recursiveRects(randint(0, cols), randint(0, rows), c);
        recursiveRects(randint(0, cols), randint(0, rows), c);
    });

    // Gorilla Grain
    gorillaGrain(10);

    noLoop();
}

function recursiveRects(x, y, color) {
    if (x < 0 || y < 0) {
        recursiveRects(randint(0, cols), randint(0, rows), color);
        return;
    }
    if (random(1) < 0.015) return; // If we start with two recursions (in draw()) the probability of both of the failing in the first attempt is really low
    if (random(1) < 0.1) {
        x = randint(0, cols);
        y = randint(0, rows);
    }
    if (random(1) < 0.3) {
        color = random(palette);
    }

    let maxWidth, maxHeight;
    random(1) < 0.3 ? (maxWidth = cols / 4) : (maxWidth = (cols - x) / 8);
    random(1) < 0.3 ? (maxHeight = rows / 4) : (maxHeight = rows / 8);

    let w = randomSign() * randint(0, maxWidth); // available width = cols - x
    let h = randomSign() * randint(0, maxHeight); // available height = rows - x
    drawRect(x, y, w, h, color);
    // recursion with x, y being inside the current rect
    recursiveRects(randint(x, x + w), randint(y, y + h), color);
    // option to start another random one
}

function drawRect(x, y, w, h, color) {
    push();
    fill(color);
    noStroke();
    // noFill();
    // stroke(color);
    rect(x * unitGrid, y * unitGrid, w * unitGrid, h * unitGrid);
    pop();
}

function randint(low, high) {
    return floor(random(low, high + 1));
}

function randomSign() {
    return pow(-1, randint(1, 2));
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
