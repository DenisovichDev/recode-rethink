const len = 30;
const initX = 50;
const initY = 150;
let cols, rows;

function setup() {
    createCanvas(1000, 600);
    background(230);
    cols = floor((width - 2 * initX) / len);
    rows = floor((height - (initY + initX)) / len);
    console.log(cols, rows);
}

function draw() {
    background(230);

    noStroke();
    fill(205, 35, 6, 200);

    let currentPos = createVector();
    let margin = 5;
    let randYSpace = 0;
    let randXOffset = 0;
    let offset = 0;

    for (let j = 0; j < rows; j++) {
        currentPos.y = randYSpace + initY + j * len;
        randXOffset = random(0, 10);
        for (let i = 0; i < cols; i++) {
            currentPos.x = initX + randXOffset + i * len;
            currentPos.y -= map(noise(offset), 0, 1, 0, 7);
            rect(currentPos.x, currentPos.y, len - margin, len - margin);
            offset += 0.2;
        }
        randYSpace = floor(random(0, margin));
        offset += 100;
    }

    // Thanks to Gorilla Sun for this one
    loadPixels();
    let d = pixelDensity();
    let halfImage = 4 * (width * d) * (height * d);
    for (let i = 0; i < halfImage; i += 4) {
        if (
            !(pixels[i] == 230 && pixels[i + 1] == 230 && pixels[i + 2] == 230)
        ) {
            grainAmount = random(-20, 20);
            pixels[i] = pixels[i] + grainAmount;
            pixels[i + 1] = pixels[i + 1] + grainAmount;
            pixels[i + 2] = pixels[i + 2] + grainAmount;
            pixels[i + 3] = pixels[i + 3] + grainAmount;
        }
    }
    updatePixels();

    noLoop();
}
