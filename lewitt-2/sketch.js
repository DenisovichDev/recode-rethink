const grid = 64
let u

function setup() {
    l = min(windowWidth, windowHeight)
    createCanvas((w = l), (h = l))
    u = l / 64

    noLoop()
}

function draw() {
    background(255)
    translate(w / 2, h / 2)
    scale(0.99)
    translate(-w / 2, -h / 2)
    noStroke()
    fill(27)
    rect(0, 0, w, h)

    drawGrid()
    // center
    emerge(w / 2, h / 2, 0, TAU, 0)
    // sides
    emerge(
        w / 2,
        0,
        0 + random(PI * 0.01, PI * 0.08),
        PI - random(PI * 0.01, PI * 0.08),
        0
    )
    emerge(
        w,
        h / 2,
        PI / 2 + random(PI * 0.01, PI * 0.08),
        (PI * 3) / 2 - random(PI * 0.01, PI * 0.08),
        0
    )
    emerge(
        w / 2,
        h,
        PI + random(PI * 0.01, PI * 0.08),
        TAU - random(PI * 0.01, PI * 0.08),
        0
    )
    emerge(
        0,
        h / 2,
        -PI / 2 + random(PI * 0.01, PI * 0.08),
        PI / 2 - random(PI * 0.01, PI * 0.08),
        0
    )
    // Corner
    emerge(0, 0, 0 + random(PI * 0.03, PI * 0.04), PI / 2, 0)
    emerge(w, 0, PI / 2 + random(PI * 0.03, PI * 0.04), PI, 0)
    emerge(w, h, PI + random(PI * 0.03, PI * 0.04), (3 * PI) / 2, 0)
    emerge(0, h, (3 * PI) / 2 + random(PI * 0.03, PI * 0.04), TAU, 0)
}

function drawGrid() {
    noFill()
    stroke(255, 10)
    for (let j = 0; j < grid; j++) {
        for (let i = 0; i < grid; i++) {
            rect(i * u, j * u, u, u)
        }
    }
}

function emerge(x, y, lowerBound, upperBound, randomOff) {
    stroke(230, 242, 255, 150)
    strokeWeight(1)

    let delta = upperBound - lowerBound
    let phi = delta / 16
    let maxLen = max(
        dist(x, y, 0, 0),
        dist(x, y, 0, h),
        dist(x, y, w, 0),
        dist(x, y, w, h)
    )
    for (let i = 0; i < 16; i++) {
        let theta =
            lowerBound + i * phi + random([-1, 1]) * random(phi * randomOff)
        let cx, cy
        do {
            let a = random(l * 0.2, maxLen)
            cx = x + a * cos(theta)
            cy = y + a * sin(theta)
        } while (cx < 0 || cx > w || cy < 0 || cy > h)
        cx = u * floor(cx / u)
        cy = u * floor(cy / u)
        line(x, y, cx, cy)
    }
}
