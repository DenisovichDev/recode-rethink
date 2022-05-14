// Thanks to Dan Shiffman

class Vehicle {
    constructor(x, y) {
        this.acceleration = createVector(0, 0);
        this.velocity = p5.Vector.random2D();
        this.position = createVector(x, y);
        this.r = 8;
        this.maxspeed = 8;
        this.velocity.setMag(this.maxspeed);
        this.maxforce = 0.4;
    }
    update() {
        this.velocity.add(this.acceleration);
        this.velocity.limit(this.maxspeed);
        this.position.add(this.velocity);
        this.acceleration.mult(0);
    }

    applyForce(force) {
        this.acceleration.add(force);
    }
    arrive(target) {
        var desired = p5.Vector.sub(target, this.position);
        var d = desired.mag();
        if (d < 100) {
            var m = map(d, 0, 200, 0, this.maxspeed);
            desired.setMag(m);
        } else {
            desired.setMag(this.maxspeed);
        }

        var steer = p5.Vector.sub(desired, this.velocity);
        steer.limit(this.maxforce);
        this.applyForce(steer);
    }
}
