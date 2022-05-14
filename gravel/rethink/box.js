let a = 0;

class Box {
    constructor(col, row, w) {
        this.w = w;
        this.col = col;
        this.row = row;
        this.x = marginX + this.col * this.w;
        this.y = marginY + this.row * this.w;
        this.r = 2;

        this.minPosOffY = map(this.row, 0, rows, 0, this.w / 3);
        this.maxPosOffY = map(this.row, 0, (3 * rows) / 2, 2, 2 * this.w);

        this.minPosOffX = 0;
        this.maxPosOffX = map(this.row, 0, 2 * rows, 0, this.w);

        // Will stay
        this.positionOffsetY = random(this.minPosOffY, this.maxPosOffY);
        this.positionOffsetX = random(this.minPosOffX, this.maxPosOffX);

        this.y += this.positionOffsetY;
        this.x += pow(-1, floor(random(2))) * this.positionOffsetX;
        this.pos = createVector(this.x, this.y);

        // Rotation
        let rotationLim = map(this.row, 0, 2 * rows, 0, PI / 3);

        this.mappedRotation =
            pow(-1, floor(random(2))) * map(this.row, 0, 3 * rows, 0, PI / 2);
        this.randRotation = random(-rotationLim, rotationLim);

        this.rotation = this.mappedRotation + this.randRotation;

        this.lerpFrac = 0;
    }

    draw() {
        push();
        translate(this.pos.x + this.w / 2, this.pos.y + this.w / 2);

        rotate(this.rotation);

        rectMode(CENTER);
        rect(0, 0, this.w, this.w, this.r);
        pop();
    }

    update() {
        let currentIdx = this.col + this.row * cols;
        let nextIdx = this.col + (this.row + 1) * cols;
        if (nextIdx >= cols * rows) return;
        if (this.lerpFrac >= 1) return;

        this.pos = p5.Vector.lerp(
            gridInfo[currentIdx][0],
            gridInfo[nextIdx][0],
            this.lerpFrac
        );
        this.rotation = lerp(
            gridInfo[currentIdx][1],
            gridInfo[nextIdx][1],
            this.lerpFrac
        );

        this.lerpFrac += 0.01;
        // console.log(this.lerpFrac);
    }
}
