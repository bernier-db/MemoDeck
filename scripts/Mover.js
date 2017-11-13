class Mover {
    constructor(_gridx, _gridy, color) {
        this.gridX = _gridx;
        this.gridY = _gridy;
        this.h = 20;
        this.w = 10;
        var screen = isometricToScreen(_gridx, _gridy);
        this.y = 0;
        this.x = screen.x;
        this.centerY = screen.y;
        this.counter = 1;
        this.osc = 0;
        this.shadowY;
        this.shadowY;
        this.color = color;
        this.destination = new PVector(_gridx, _gridy);

        this.maxSpeed = 10;
        this.accForce = 0.5;
        this.velocity = new PVector(0, 0);
        this.acc = new PVector();
    }

    get isAtDestination() {
        return Math.round(this.gridX) === this.destination.x && Math.round(this.gridY) === this.destination.y;
    }



    update() {

        //        if (!this.isAtDestination) {
        this.move();
        this.velocity.add(this.acc);
        this.acc.mult(0);
        this.velocity.limit(this.maxSpeed);
        this.x += this.velocity.x;
        this.centerY += this.velocity.y;

        var iso = screenToIsometric(this.x, this.centerY);
        this.gridX = iso.x;
        this.gridY = iso.y;
        //        } else {


        //            /*** Conversion de position **/
        //            var screenPos = isometricToScreen(this.gridX, this.gridY);
        //            this.x = screenPos.x;
        //            this.centerY = screenPos.y + TILE_SURFACE_H / 2;
        //            /********************************/
        //        }
    }


    applyCard(dir, dist) {
        //0: N, 1: S, 2: W, 3: E
        switch (dir) {
            case 0:
                this.destination.y -= dist;
                break;
            case 1:
                this.destination.y += dist;
                break;
            case 2:
                this.destination.x -= dist;
                break;
            case 3:
                this.destination.x += dist;
                break;
        }
        if (this.destination.y > BOARD_H) this.destination.y = BOARD_H;
        else if (this.destination.y < 0)
            this.destination.y = 0;
         if (this.destination.x > BOARD_W) this.destination.x = BOARD_W;
        else if (this.destination.x < 0)
            this.destination.x = 0;
    }

    move() {
        var target = isometricToScreen(this.destination.x, this.destination.y);
        this.desired = PVector.staticSub(target, {
            x: this.x,
            y: this.centerY
        });

        var d = this.desired.mag();

        this.desired.normalize();
        if (d < 128) {
            var m = map(d, 0, 128, 0, this.maxSpeed);
            this.desired.mult(m);
        } else {
            this.desired.mult(this.maxSpeed);
        }
        //this.applyForce(this.desired);

        var steer = PVector.staticSub(this.desired, this.velocity);
        steer.limit(this.accForce);
        this.applyForce(steer);
    }



    applyForce(f) {
        this.acc.add(f);
    }

    bounce() {
        /* bouncing effect */
        if (this.counter > INTERVAL) {
            this.counter = 1;
        }
        this.counter += 0.5;

        this.osc = 2 * Math.sin(2 * Math.PI * this.counter / INTERVAL);
        this.y = this.osc + this.centerY - this.h * 1.25;
        /*****************************/
    }

    drawShadow() {
        //draw shadow
        CTX.beginPath();
        CTX.ellipse(this.x, this.centerY + TILE_SURFACE_H / 2, this.w - this.osc, 3, 0 * Math.PI / 180, 2 * Math.PI, false)
        CTX.fillStyle = "rgba(100,100,100,0.2)";
        CTX.fill();
    }

    draw() {
        this.bounce();
        CTX.save();
        CTX.translate(WIDTH / 2, Y_OFFSET);

        this.drawShadow();

        //perso
        CTX.beginPath();
        CTX.ellipse(this.x, this.y + TILE_SURFACE_H / 2, this.w, this.h, 0 * Math.PI / 180, 2 * Math.PI, false);
        CTX.fillStyle = this.color;
        CTX.fill();


        CTX.restore();
    }



}
