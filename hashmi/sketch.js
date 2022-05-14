/*
Inspired by Zarina Hashmi's Abyss (2013)
https://twitter.com/ZarinaStudio/status/1476883848625537034

Made during the Russian invasion of Ukraine
*/

const path = document.getElementById("path")
const pathLength = Math.floor(path.getTotalLength())
const pathWidth = path.getBoundingClientRect().width
const pathHeight = path.getBoundingClientRect().height

const l = Math.max(pathWidth, pathHeight)

let n = 200

function setup() {
    createCanvas((w = 600), (h = 600))

    noLoop()
}

function draw() {
    background("#E9E0D8")

    translate(w / 2, h / 2)
    scale(0.8)
    translate(-w / 2, -h / 2)

    let sclX = w * 0.9
    let sclY = pathHeight * (sclX / pathWidth)

    noStroke()
    fill(30)
    // yazidRect(0, 0, w, h)
    rect(0, 0, w, h)
    push()
    translate((w - sclX) / 2, (h - sclY) / 2)

    for (let i = 0; i <= 100; i += 1 / (n / 100)) {
        shapeAtPercent(i, sclX)
    }
    pop()

    gorillaGrain(9)
}

function shapeAtPercent(percent, scl) {
    let currLen = (percent * pathLength) / 100

    pt = path.getPointAtLength(currLen)
    let x = (Math.round(pt.x) / l) * scl
    let y = (Math.round(pt.y) / l) * scl

    noFill()
    drawShape(x, y)
}

function drawShape(x, y) {
    let y1 = y - random(3, 10)
    let y2 = y + random(3, 10)
    let d = y2 - y1
    let maxWidth = 3
    let rightOff = random(20000)
    let leftOff = random(20000)
    let noiseInc = random(0.01, 0.03)
    let step = w / random(1000, 2000)
    colorMode(HSL)
    let lightOff = random(-10, 10)
    for (let i = 0; i < d; i += step) {
        let x1 = x - noise(rightOff) * (maxWidth / 2)
        let x2 = x + noise(leftOff) * (maxWidth / 2)
        strokeWeight(1)
        // stroke("#E9E0D8")
        stroke(28, 28, 88 + lightOff)
        line(x1, y1 + i, x2, y1 + i)
        rightOff += noiseInc
        leftOff += noiseInc
    }
    colorMode(RGB)
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
