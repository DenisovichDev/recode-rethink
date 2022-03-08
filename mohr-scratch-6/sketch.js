let unitGrid = 12;
let cols, rows;
let offset = 1;
let gap = unitGrid / 5;

function setup() {
    createCanvas(1200, 1200);
    bg = "#E1DDD2";

    background(bg);

    noLoop();

    cols = width / unitGrid;
    rows = height / (2 * unitGrid);

    strokeWeight(1);
}

function draw() {
    background(bg);

    gorillaGrain(10);

    translate(width / 2, height / 2);
    scale(0.85);
    translate(-width / 2, -height / 2);

    for (let j = 0; j < rows; j++) {
        for (let i = 0; i < cols; i++) {
            push();
            translate(
                i * unitGrid + unitGrid / 2,
                j * 2 * unitGrid + unitGrid / 2
            );
            line(-unitGrid / 2, offset, unitGrid / 2, offset);
            line(-unitGrid / 2, -offset, unitGrid / 2, -offset);
            if (random(1) < 0.5)
                line(
                    -(unitGrid / 2 - gap / 2),
                    2 * offset,
                    unitGrid / 2 - gap / 2,
                    2 * offset
                );
            if (random(1) < 0.5)
                line(
                    -(unitGrid / 2 - gap / 2),
                    -2 * offset,
                    unitGrid / 2 - gap / 2,
                    -2 * offset
                );
            pop();
        }
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
