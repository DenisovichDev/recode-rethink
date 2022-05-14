let w = 37;
let marginX = 2 * w;
let marginY = w / 2;
let cols, rows;
let boxes = [];

function setup() {
    createCanvas(600, 800);
    bg = color(240);
    background(bg);
    cols = floor((width - 2 * marginX) / w);
    rows = floor((height - 2 * marginY) / w);

    for (let j = 0; j < rows; j++) {
        for (let i = 0; i < cols; i++) {
            boxes.push(new Box(i, j, w));
        }
    }

    strokeWeight(2);
    noFill();
}

function draw() {
    background(bg);

    for (let j = 0; j < rows; j++) {
        for (let i = 0; i < cols; i++) {
            let index = i + j * cols;
            boxes[index].draw();
        }
    }

    noLoop();
}
