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

        this.positionOffsetY = random(this.minPosOffY, this.maxPosOffY);
        this.positionOffsetX = random(this.minPosOffX, this.maxPosOffX);

        this.y += this.positionOffsetY;
        this.x += pow(-1, floor(random(2))) * this.positionOffsetX;
    }

    draw() {
        push();
        translate(this.x + this.w / 2, this.y + this.w / 2);
        let rotationLim = map(this.row, 0, 2 * rows, 0, PI / 3);

        // Mapped rotation
        rotate(
            pow(-1, floor(random(2))) * map(this.row, 0, 3 * rows, 0, PI / 2)
        );
        // Random rotation
        rotate(random(-rotationLim, rotationLim));

        rectMode(CENTER);
        rect(0, 0, this.w, this.w, this.r);
        pop();
    }
}
