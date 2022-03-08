let r = 100 / 2;
let angle = 0;
let margin = 50;

let col, row;

function setup() {
    createCanvas(600, 600);
    bg = color(217, 209, 196, 100);
    background(bg);
    strokeWeight(1.5);

    cols = floor(width / 100) - 1;
    rows = floor(height / 100) - 1;

    frameRate(30);
}

function draw() {
    background(bg);
    let d = 30;

    for (let j = 0; j < rows; j++) {
        for (let i = 0; i < cols; i++) {
            if (!(j === rows - 1 && i > cols / 2 - 1)) {
                noiseSeed(random(100000));
                drawTheThing(margin + i * 2 * r, margin + j * 2 * r, r, d);
            }
            d -= 1;
        }
    }

    // noLoop();
}

function drawTheThing(x, y, radius, iterations) {
    push();
    translate(x + radius, y + radius);
    let a1 = random(0, TAU);
    let a2;

    let pref = [
        random(0, PI / 2),
        random(PI / 2, PI),
        random(PI, (3 * PI) / 2),
        random((3 * PI) / 2, TAU),
    ];

    let offset = PI / 12;
    let c = 16;
    let noiseOffsetX = random(1000);
    let noiseOffsetY = random(1000);

    for (let i = 0; i < iterations; i++) {
        if (random() < 0.3) {
            a2 =
                (noise(noiseOffsetX + cos(a1), noiseOffsetY + sin(a1)) *
                    PI *
                    c) %
                TWO_PI;
        } else {
            a2 = random(pref) + random(-offset, offset);
        }

        // strokeWeight(max(5 - i / 8, 1));

        line(
            radius * cos(a1),
            radius * sin(a1),
            radius * cos(a2),
            radius * sin(a2)
        );

        a1 = a2;
    }
    pop();
}
