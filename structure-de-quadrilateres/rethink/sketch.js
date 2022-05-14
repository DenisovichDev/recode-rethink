let grid;
let len;

let positions = [];
let targets = [];
let oldTargets = [];

let numberOfShapes = 15;

let min;
let max;

let pal = ["#009796", "#003687", "#F07A29", "#642DAC", "#000000"];
let colors = [];

let capture = false;
count = 0;

function setup() {
    createCanvas(400, 400);
    bg = color("#DEE0E4");
    background(bg);

    frameRate(5);

    grid = width / 8;
    len = grid * 0.6;

    min = len * 0.4;
    max = len * 0.6;

    strokeWeight(1);
    noFill();

    for (let j = 1; j < 7; j++) {
        for (let i = 1; i < 7; i++) {
            let x = i * grid + grid / 2;
            let y = j * grid + grid / 2;

            let a1 = createVector(x - len / 2, y - len / 2);
            let a2 = createVector(x + len / 2, y - len / 2);
            let a3 = createVector(x + len / 2, y + len / 2);
            let a4 = createVector(x - len / 2, y + len / 2);

            for (let n = 0; n < numberOfShapes; n++) {
                let v1 = new Vehicle(x - len / 2, y - len / 2);
                let v2 = new Vehicle(x + len / 2, y - len / 2);
                let v3 = new Vehicle(x + len / 2, y + len / 2);
                let v4 = new Vehicle(x - len / 2, y + len / 2);

                positions.push([v1, v2, v3, v4]);

                let t1 = p5.Vector.add(
                    a1,
                    new p5.Vector(random(-min, max), random(-min, max))
                );
                let t2 = p5.Vector.add(
                    a2,
                    new p5.Vector(random(-min, max), random(-min, max))
                );
                let t3 = p5.Vector.add(
                    a3,
                    new p5.Vector(random(-min, max), random(-min, max))
                );
                let t4 = p5.Vector.add(
                    a4,
                    new p5.Vector(random(-min, max), random(-min, max))
                );

                targets.push([t1, t2, t3, t4]);
                colors.push(random(pal));
            }
        }
    }
}

function draw() {
    background(bg);

    for (let j = 0; j < 6; j++) {
        for (let i = 0; i < 6; i++) {
            for (let n = 0; n < numberOfShapes; n++) {
                let index = j * numberOfShapes * 6 + i * numberOfShapes + n;

                stroke(colors[index] + "c8");

                drawNormalQuadrilateral(
                    positions[index][0].position,
                    positions[index][1].position,
                    positions[index][2].position,
                    positions[index][3].position
                );

                for (let m = 0; m < 4; m++) {
                    positions[index][m].arrive(targets[index][m]);
                    positions[index][m].update();
                }
            }
        }
    }

    // noLoop();

    if (frameCount === 200) {
        capture = true;
        randomizeTargets();
    }

    if (frameCount === 270) {
        targets = Array.from(oldTargets);
    }

    if (capture && frameCount <= 340) {
        if (frameCount % 3 === 0) {
            saveCanvas("output-" + count, "png");
            count++;
        }
    }
    console.log(frameCount);
}

function randomizeTargets() {
    oldTargets = Array.from(targets);
    for (let j = 1; j < 7; j++) {
        for (let i = 1; i < 7; i++) {
            let x = i * grid + grid / 2;
            let y = j * grid + grid / 2;

            let a1 = createVector(x - len / 2, y - len / 2);
            let a2 = createVector(x + len / 2, y - len / 2);
            let a3 = createVector(x + len / 2, y + len / 2);
            let a4 = createVector(x - len / 2, y + len / 2);

            for (let n = 0; n < numberOfShapes; n++) {
                let index =
                    (j - 1) * numberOfShapes * 6 + (i - 1) * numberOfShapes + n;

                let t1 = p5.Vector.add(
                    a1,
                    new p5.Vector(random(-min, max), random(-min, max))
                );
                let t2 = p5.Vector.add(
                    a2,
                    new p5.Vector(random(-min, max), random(-min, max))
                );
                let t3 = p5.Vector.add(
                    a3,
                    new p5.Vector(random(-min, max), random(-min, max))
                );
                let t4 = p5.Vector.add(
                    a4,
                    new p5.Vector(random(-min, max), random(-min, max))
                );

                targets[index] = [t1, t2, t3, t4];
            }
        }
    }
}

function drawNormalQuadrilateral(a1, a2, a3, a4) {
    beginShape();
    vertex(a1.x, a1.y);
    vertex(a2.x, a2.y);
    vertex(a3.x, a3.y);
    vertex(a4.x, a4.y);
    endShape(CLOSE);
}
