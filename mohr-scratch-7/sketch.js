let angle, a, L, offset;
let prob = 0.5;

let unitGrid = 30;
let cols, rows;

// Recording
let count = 0;

// Tweak Pane
// const pane = new Tweakpane.Pane();
let PARAMS;

function setup() {
    createCanvas(600, 600);
    bg = "#E7E3D7";
    background(bg);

    noLoop();

    // Grid Related
    cols = floor(width / unitGrid);
    rows = floor(height / unitGrid);

    // Cuboid Segment Related

    PARAMS = {
        angle: radians(90 - 15),
        L: unitGrid, // length of a single grid
        a: unitGrid / 2.777, //10.8, // length of a side of the cuboid
        offset: unitGrid / 3.84, //7.81,
    };

    // pane.addInput(PARAMS, "angle", {
    //     min: PI / 4,
    //     max: PI / 2,
    // });
    // pane.addInput(PARAMS, "a", {
    //     min: 30 / 6,
    //     max: 30,
    // });
    // pane.addInput(PARAMS, "offset", {
    //     min: 30 / 6,
    //     max: 30,
    // });

    strokeWeight(1.5);
}

function draw() {
    background(bg);

    gorillaGrain(10);

    // translate(width / 2, height / 2);
    // scale(0.85);
    // translate(-width / 2, -height / 2);

    for (let j = 0; j < rows; j++) {
        for (let i = 0; i < cols; i++) {
            push();
            translate(i * unitGrid, j * unitGrid);
            drawSingleSegment(PARAMS.offset, PARAMS.offset);
            pop();
        }
        line(0, j * unitGrid, width, j * unitGrid);
    }
    line(0, rows * unitGrid, width, rows * unitGrid);
}

function drawSingleSegment(x, y) {
    dL = PARAMS.L - x;
    dx = PARAMS.a * cos(PARAMS.angle);
    dy = PARAMS.a * sin(PARAMS.angle);
    x2 = dL - PARAMS.a + dx;
    y2 = dL - dy;

    with (PARAMS) {
        if (random(1) < prob) line(x, y, x + a, y); // AB
        if (random(1) < prob) line(x + a, y, x - dx + a, y + dy); // BC
        if (random(1) < prob) line(x - dx + a, y + dy, x - dx, y + dy); // CD
        if (random(1) < prob) line(x - dx, y + dy, x, y); // DA
        if (random(1) < prob) line(x2, y2, x2 + a, y2); // A'B'
        if (random(1) < prob) line(x2 + a, y2, x2 - dx + a, y2 + dy); // B'C'
        if (random(1) < prob) line(x2 - dx + a, y2 + dy, x2 - dx, y2 + dy); // C'D'
        if (random(1) < prob) line(x2 - dx, y2 + dy, x2, y2); // D'A'
        if (random(1) < prob) line(x, y, x2, y2); // AA'
        if (random(1) < prob) line(x + a, y, x2 + a, y2); //BB'
        if (random(1) < prob) line(x - dx + a, y + dy, x2 - dx + a, y2 + dy); // CC'
        if (random(1) < prob) line(x - dx, y + dy, x2 - dx, y2 + dy); // DD'
    }
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

function keyPressed() {
    redraw();
    // saveCanvas("input-" + count, "png");
    count++;
}
