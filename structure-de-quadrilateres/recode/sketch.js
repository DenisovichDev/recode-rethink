let grid;
let len;

function setup() {
    createCanvas(600, 600);
    bg = color(220, 215, 230);
    background(bg);

    grid = width / 8;
    len = grid * 0.6;

    rectMode(CENTER);
    stroke(0);
    strokeWeight(2);
    noFill();
}

function draw() {
    background(bg);

    loadPixels();
    let d = pixelDensity();
    let halfImage = 4 * (width * d) * (height * d);
    for (let i = 0; i < halfImage; i += 4) {
        grainAmount = random(-5, 5);
        pixels[i] = pixels[i] + grainAmount;
        pixels[i + 1] = pixels[i + 1] + grainAmount;
        pixels[i + 2] = pixels[i + 2] + grainAmount;
        pixels[i + 3] = pixels[i + 3] + grainAmount;
    }
    updatePixels();

    for (let i = 1; i < 7; i++) {
        for (let j = 1; j < 7; j++) {
            let x = i * grid + grid / 2;
            let y = j * grid + grid / 2;

            // point(x, y);

            // rect(x, y, grid, grid);
            // rect(x, y, len, len);

            push();
            strokeWeight(1);

            for (let n = 0; n < 10; n++) {
                stroke(0, 100);
                if (random() < 0.5) stroke(42, 68, 96, 150);

                let a1 = createVector(x - len / 2, y - len / 2);
                let a2 = createVector(x + len / 2, y - len / 2);
                let a3 = createVector(x + len / 2, y + len / 2);
                let a4 = createVector(x - len / 2, y + len / 2);

                drawRandomQuadrilateral(a1, a2, a3, a4, len * 0.4, len * 0.6);
            }

            let sub;
            if (j > 4) {
                const density = [30, 28, 25, 20, 20, 15];

                j == 5 ? (sub = 7) : (sub = 0);

                for (let n = 0; n < density[i - 1] - sub; n++) {
                    stroke(0, 100);

                    let a1 = createVector(x - len / 2, y - len / 2);
                    let a2 = createVector(x + len / 2, y - len / 2);
                    let a3 = createVector(x + len / 2, y + len / 2);
                    let a4 = createVector(x - len / 2, y + len / 2);

                    drawRandomQuadrilateral(
                        a1,
                        a2,
                        a3,
                        a4,
                        len * 0.25,
                        len * 0.25
                    );
                }
            }
            pop();
        }
    }

    noLoop();
}

function drawRandomQuadrilateral(a1, a2, a3, a4, min, max) {
    a1.add(random(-min, max), random(-min, max));
    a2.add(random(-min, max), random(-min, max));
    a3.add(random(-min, max), random(-min, max));
    a4.add(random(-min, max), random(-min, max));

    beginShape();
    vertex(a1.x, a1.y);
    vertex(a2.x, a2.y);
    vertex(a3.x, a3.y);
    vertex(a4.x, a4.y);
    endShape(CLOSE);
}
