let w = 30
let marginX = 4 * w
let marginY = w / 2
let cols, rows
let boxes = []
let gridInfo = []

let count = 0
// let capture = true;

function setup() {
    createCanvas(637, 800)
    bg = color(0)
    background(bg)
    cols = floor((width - 2 * marginX) / w)
    rows = floor((height - 2 * marginY) / w)

    for (let j = 0; j < rows; j++) {
        for (let i = 0; i < cols; i++) {
            let index = i + j * cols
            boxes.push(new Box(i, j, w))
            gridInfo[index] = [
                createVector(boxes[index].x, boxes[index].y),
                boxes[index].rotation,
            ]
        }
    }

    strokeWeight(2)
    stroke(150)
    noFill()

    frameRate(4)
}

function draw() {
    background(bg)

    translate(width / 2, height / 2)
    scale(1.2)
    translate(-width / 2, -height / 2)
    for (let j = 0; j < rows; j++) {
        for (let i = 0; i < cols; i++) {
            let index = i + j * cols
            boxes[index].draw()
            boxes[index].update()
        }
    }

    // if (frameCount == 1) saveCanvas("0", "png");
    // if (boxes[0].lerpFrac >= 1) {
    //     saveCanvas("1", "png");
    //     noLoop();
    // }

    if (capture && !(boxes[0].lerpFrac >= 1)) {
        // if (frameCount % 3 === 0) {
        saveCanvas("output-" + count, "png")
        count++
        // }
    }
    console.log(frameCount, count)
}
