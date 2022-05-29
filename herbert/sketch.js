let gridInfo = []

function setup() {
    l = min(windowHeight, windowWidth)
    createCanvas((w = l), (h = l))

    noLoop()
    rectMode(CENTER)

    step = l / 30
}

function draw() {
    background("#E8E2E2")
    blendMode(MULTIPLY)
    translate(w / 2, h / 2)
    scale(0.8)
    translate(-w / 2, -h / 2)

    let sLen = l / 30

    for (let i = 0; i < 80; i++) {
        let coords = subDivSelection(l / 10, sLen)
        putSquare(coords.x, coords.y, 20, 0.6, "#CD4499")
    }

    gridInfo = []
    for (let i = 0; i < 40; i++) {
        let coords = subDivSelection(l / 8, 2 * sLen)
        putSquare(coords.x, coords.y, 40, 0.7, "#fe925c")
    }

    gridInfo = []
    for (let i = 0; i < 4; i++) {
        let coords = subDivSelection(l / 4, 6 * sLen)
        putSquare(coords.x, coords.y, 120, 0, "#000")
    }

    gorillaGrain(10)
}

function putSquare(x, y, len, prob, col) {
    if (len / 2 > x || x > w - len / 2 || len / 2 > y || y > h - len / 2) return

    stroke(col)
    strokeWeight(3)
    noFill()
    rect(x, y, len, len, 2)
    if (random() > prob) return

    let step = len * 0.8
    let newX = x + randi(-1, 1) * step
    let newY = y + randi(-1, 1) * step

    putSquare(newX, newY, len, prob, col)
}

function subDivSelection(unit, len) {
    let rows = floor(h / unit)
    let cols = floor(w / unit)

    if (gridInfo.length == rows * cols) return
    let i, j
    while (true) {
        j = randi(0, rows - 1)
        i = randi(0, cols - 1)

        let arrEl = gridInfo.find((e) => e[0] == j && e[1] == i)
        if (arrEl == undefined) break
    }
    gridInfo.push([j, i])
    let x = random(i * unit + len / 2, (i + 1) * unit - len / 2)
    let y = random(j * unit + len / 2, (j + 1) * unit - len / 2)

    return { x: x, y: y }
}

function randi(l, h) {
    return floor(random(l, h + 1))
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
