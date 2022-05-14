let unitGrid = 15
let cols, rows

let PARAMS

let occurrences = []
let numOfSetSides

function setup() {
    createCanvas(600, 600)
    bg = "#0D0D0D"
    background(bg)

    noLoop()

    // Grid Related
    cols = floor(width / unitGrid)
    rows = floor(height / unitGrid)

    // Cuboid Segment Related

    PARAMS = {
        angle: radians(90 - 15),
        L: unitGrid, // length of a single grid
        a: unitGrid / 2.777, //10.8, // length of a side of the cuboid
        offset: unitGrid / 3.84, //7.81,
    }

    numOfSetSides = random([2, 10])

    strokeWeight(1)
    stroke("#FFFFFF")
}

function draw() {
    background(bg)

    gorillaGrain(10)

    translate(width / 2, height / 2)
    scale(0.85)
    translate(-width / 2, -height / 2)

    for (let j = 0; j < rows; j++) {
        for (let i = 0; i < cols; i++) {
            push()
            translate(i * unitGrid, j * unitGrid)
            drawSingleSegment(PARAMS.offset, PARAMS.offset, i, j)
            pop()
        }
        line(0, j * unitGrid, width, j * unitGrid)
    }
    line(0, rows * unitGrid, width, rows * unitGrid)

    joinAllPoints()
}

function drawSingleSegment(x, y, i, j) {
    let dL = PARAMS.L - x
    let dx = PARAMS.a * cos(PARAMS.angle)
    let dy = PARAMS.a * sin(PARAMS.angle)
    let x2 = dL - PARAMS.a + dx
    let y2 = dL - dy
    let a = PARAMS.a

    let edgeVar = randi(1, 4095)

    if ((edgeVar & 0b1) >> 0) line(x, y, x + a, y) // AB
    if ((edgeVar & 0b10) >> 1) line(x + a, y, x - dx + a, y + dy) // BC
    if ((edgeVar & 0b100) >> 2) line(x - dx + a, y + dy, x - dx, y + dy) // CD
    if ((edgeVar & 0b1000) >> 3) line(x - dx, y + dy, x, y) // DA
    if ((edgeVar & 0b10000) >> 4) line(x2, y2, x2 + a, y2) // A'B'
    if ((edgeVar & 0b100000) >> 5) line(x2 + a, y2, x2 - dx + a, y2 + dy) // B'C'
    if ((edgeVar & 0b1000000) >> 6) line(x2 - dx + a, y2 + dy, x2 - dx, y2 + dy) // C'D'
    if ((edgeVar & 0b10000000) >> 7) line(x2 - dx, y2 + dy, x2, y2) // D'A'
    if ((edgeVar & 0b100000000) >> 8) line(x, y, x2, y2) // AA'
    if ((edgeVar & 0b1000000000) >> 9) line(x + a, y, x2 + a, y2) //BB'
    if ((edgeVar & 0b10000000000) >> 10)
        line(x - dx + a, y + dy, x2 - dx + a, y2 + dy) // CC'
    if ((edgeVar & 0b100000000000) >> 11) line(x - dx, y + dy, x2 - dx, y2 + dy) // DD'

    if (countSetBits(edgeVar) == numOfSetSides)
        occurrences.push({ x: i * unitGrid + x, y: j * unitGrid + y })
}

function countSetBits(n) {
    let count = 0
    while (n) {
        count += n & 1
        n >>= 1
    }
    return count
}

function joinAllPoints() {
    for (let i = 0; i < occurrences.length; i++) {
        for (let j = i + 1; j < occurrences.length; j++) {
            yazidStyleLine(
                occurrences[i].x,
                occurrences[i].y,
                occurrences[j].x,
                occurrences[j].y,
                1
            )
        }
    }
}

function gorillaGrain(gA) {
    loadPixels()
    let d = pixelDensity()
    let halfImage = 4 * (width * d) * (height * d)
    for (let i = 0; i < halfImage; i += 4) {
        grainAmount = map(random(), 0, 1, -gA, gA)
        pixels[i] = pixels[i] + gA / 2
        pixels[i + 1] = pixels[i + 1] + grainAmount
        pixels[i + 2] = pixels[i + 2] + grainAmount
        pixels[i + 3] = pixels[i + 3] + grainAmount
    }
    updatePixels()
}

function randi(l, h) {
    return floor(random(l, h + 1))
}

function yazidStyleLine(x1, y1, x2, y2, weight) {
    let theta = atan2(y2 - y1, x2 - x1)
    let d = dist(x1, y1, x2, y2)
    let step = width / random(1000, 2000)
    let off = random(0.2, 0.5)
    for (let i = 0; i < d; i += step) {
        let diam = random(width / 2000, width / 900) * weight
        noFill()
        circle(
            x1 + i * cos(theta) + random(-off, off),
            y1 + i * sin(theta) + random(-off, off),
            diam
        )
    }
}
