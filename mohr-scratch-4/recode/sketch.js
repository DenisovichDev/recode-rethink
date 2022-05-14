let unitGrid = 20
let minWidth = 10
let maxWidth = minWidth * 1.2
let minHeight = unitGrid * 0.5
let minGap = 5
let maxGap = 15
let minBigGap = 15
let maxBigGap = 30
let rows, maxCols

let offset = 0

function setup() {
    createCanvas(1200, 1200)

    noLoop()
    rows = floor(height / unitGrid)
    maxCols = floor(width / minWidth)

    stroke("#FFFFFF")
    strokeWeight(2)
}

function draw() {
    background("#0D0D0D")

    translate(width / 2, height / 2)
    scale(0.85)
    translate(-width / 2, -height / 2)

    for (let j = 0; j < rows; j++) {
        let x = 0
        push()
        translate(0, (j + 1) * unitGrid)
        // line(0, 0, width, 0)
        for (let i = 0; i < maxCols; i++) {
            let dx = randi(minGap, maxGap)
            let dy1 = randi(minHeight, unitGrid - 5)
            let dy2 = randi(minHeight, unitGrid - 5)

            if (random(1) < 0.5) {
                random(1) < 0.5 ? (dy1 = 0) : (dy2 = 0)
            }

            random(1) < 0.05 ? (dx = random(minBigGap, maxBigGap)) : (dx += 0)

            line(x, 0, x + dx, 0)
            x += dx
            line(x, 0, x, -dy1)
            dx = randi(minWidth, maxWidth)

            push()
            strokeWeight(3)
            let borderOff = 1
            line(x + borderOff, -dy1, x + dx - borderOff, -dy2)
            pop()
            x += dx
            line(x, -dy2, x, 0)

            if (width - x <= maxWidth + maxGap * 0.7) {
                if (width - x < 0) break
                line(x, 0, width, 0)
                break
            }
        }
        pop()
    }

    gorillaGrainGray(13)
}

function gorillaGrainGray(gA) {
    loadPixels()
    let d = pixelDensity()
    let halfImage = 4 * (width * d) * (height * d)
    for (let i = 0; i < halfImage; i += 4) {
        grainAmount = map(random(), 0, 1, -gA, gA)
        pixels[i] = pixels[i] + grainAmount
        pixels[i + 1] = pixels[i + 1] + grainAmount
        pixels[i + 2] = pixels[i + 2] + grainAmount
        pixels[i + 3] = pixels[i + 3] + grainAmount
    }
    updatePixels()
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

function randi(min, max) {
    return floor(random(min, max + 1))
}
