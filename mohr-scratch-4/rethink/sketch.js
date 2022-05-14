let unitGrid = 20
let minWidth = 10
let maxWidth = minWidth * 1.2
let minHeight = unitGrid * 0.5
let minGap = 5
let maxGap = 15
let rows, maxCols

let offset = 0
let seed

function setup() {
    createCanvas(600, 600)

    noLoop()
    rows = floor(height / (unitGrid * 2))
    maxCols = floor(width / minWidth)

    strokeWeight(2)

    bg = color(220, 215, 230)
    background(bg)

    seed = floor(random(1000000))
}

function draw() {
    background(bg)

    gorillaGrain(10)

    randomSeed(seed)

    translate(width / 2, height / 2)
    scale(0.72)
    translate(-width / 2, -height / 2)

    stroke(217, 82, 42, 50)

    for (let j = 0; j < rows; j++) {
        let iterations = floor(map(j, 0, rows - 1, 15, 5))
        for (let k = 0; k < iterations; k++) {
            let x = 0
            let randOffset = map(j, 0, rows - 1, 0.11, 0.02)
            push()
            translate(width / 2, height / 2)
            scale(map(j, 0, rows - 1, 1.2 + random(0, 0.1), 1), 1)
            translate(-width / 2, -height / 2)

            translate(0, (j + 1) * (unitGrid * 2) + randi(-10, 10))

            for (let i = 0; i < maxCols; i++) {
                let dx = randi(minGap, maxGap)
                let dy1 = randi(minHeight, unitGrid - 2)
                let dy2 = randi(minHeight, unitGrid - 2)

                if (random(1) < 0.5) {
                    random(1) < 0.5 ? (dy1 = 0) : (dy2 = 0)
                }

                line(x, 0, x + dx, 0)
                x += dx
                line(x, 0, x, -dy1)
                dx = randi(minWidth, maxWidth)

                line(x, -dy1, x + dx, -dy2)

                x += dx
                line(x, -dy2, x, 0)

                if (width - x <= maxWidth + maxGap / 2) {
                    if (width - x < 0) break
                    line(x, 0, width, 0)
                    break
                }
            }
            pop()
        }
    }

    // Main Print

    // stroke(0, 128, 128)

    for (let j = 0; j < rows; j++) {
        let x = 0
        push()
        translate(0, (j + 1) * (unitGrid * 2))

        let alpha = map(j, 0, rows - 1, 70, 255)
        stroke(0, alpha)
        strokeWeight(3)
        noFill()
        beginShape()
        for (let i = 0; i < maxCols; i++) {
            let dx = randi(minGap, maxGap)
            let dy1 = randi(minHeight, unitGrid - 2)
            let dy2 = randi(minHeight, unitGrid - 2)

            if (random(1) < 0.5) {
                random(1) < 0.5 ? (dy1 = 0) : (dy2 = 0)
            }

            vertex(x, 0)
            x += dx
            vertex(x, 0)
            vertex(x, -dy1)
            dx = randi(minWidth, maxWidth)

            x += dx
            vertex(x, -dy2)

            vertex(x, 0)

            if (width - x <= maxWidth + maxGap / 2) {
                if (width - x < 0) break
                line(x, 0, width, 0)
                break
            }
        }
        endShape()
        pop()
    }
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
