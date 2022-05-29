/*
Recoded by Denisovich
Original Artwork by Piet Mondrian: https://www.artsy.net/artwork/piet-mondrian-composition-in-colour-a
*/

const mondrian = ["#AF6C38", "#0C408A", "#B14F76"]
const black_ = "#041015"
const n = 0.04
const n_ = 0.04

function setup() {
    l = min(windowWidth, windowHeight)
    createCanvas((w = l), (h = l))

    noLoop()
}

function draw() {
    background("#F3F1F2")

    let r = l - l / 6
    let r_ = l

    for (let i = 0; i < n * l; i++) {
        createSquare(
            (r / 2) * sqrt(random()) * cos(random(TAU)) + w / 2,
            (r / 2) * sqrt(random()) * sin(random(TAU)) + h / 2,
            random(l / 10, l / 7),
            random(mondrian)
        )
    }

    for (let j = 0; j < n_ * l; j++) {
        push()
        let v = createVector(
            (r_ / 2) * sqrt(random()) * cos(random(TAU)) + w / 2,
            (r_ / 2) * sqrt(random()) * sin(random(TAU)) + h / 2
        )
        let w_ = l / 60
        let h_ = random(l / 30, l / 20)
        noStroke()
        translate(v.x, v.y)
        if (random() < 0.5) rotate(PI / 2)
        rectMode(CENTER)
        fill(black_)
        rect(0, 0, w_, h_)
        pop()
    }

    gorillaGrain(13)
}

function createSquare(x, y, l, color) {
    push()
    rectMode(CENTER)
    noStroke()
    fill(color)
    rect(x, y, l, l)
    pop()
}

function gorillaGrain(gA) {
    loadPixels()
    let d = pixelDensity()
    let halfImage = 4 * (w * d) * (h * d)
    for (let i = 0; i < halfImage; i += 4) {
        grainAmount = map(random(), 0, 1, -gA, gA)
        pixels[i] = pixels[i] + gA / 2
        pixels[i + 1] = pixels[i + 1] + grainAmount
        pixels[i + 2] = pixels[i + 2] + grainAmount
        pixels[i + 3] = pixels[i + 3] + grainAmount
    }
    updatePixels()
}
