
class Asteroid extends Entity {

    constructor(engine, spritesheet, x, y) {
        super(engine, x, y);
        this.engine = engine;
        this.ctx = engine.ctx;
        this.sheetX = 330;
        this.sheetY = 450;
        this.sheetWidth = 95;
        this.sheetHeight = 100;
        this.x = x;
        this.y = y;
        this.centerX = this.x + 25;
        this.speed = 2;
        this.isPaused = false;


        this.spritesheet = spritesheet;
        this.rotation = 0;

        this.colliders = [];
        this.colliders.push(new Collider(engine, this, 64, 64, 64, 64, "asteroid", "yellow"));


        engine.addEntity(this);
        console.log("Asteroid created");
    }

    getColliders() {
        return this.colliders;
    }

    getCollider() {
        return this.colliders[0];
    }

    getX() {
        return this.x;
    }

    getY() {
        return this.y;
    }

    setX(newX) {
        this.x = newX;
    }

    setY(newY) {
        this.y = newY;
    }

    getCenterX() {
        return this.centerX;
    }


    draw() {
        this.ctx.drawImage(this.spritesheet, this.sheetX, this.sheetY, this.sheetWidth, this.sheetHeight, this.x, this.y, 64, 64);
    }

    pause() {
        this.isPaused = !this.isPaused;
    }

    updateColliders() {
        for (const col of this.colliders) {
            col.updateCollider(this.x, this.y, 64, 64);
        }
    }


    update() {

        if (this.isPaused === false) {
            this.updateColliders();
            this.centerX = this.x;
            this.y += this.speed;

            if (this.y > 900) {
                //If asteroid goes off screen, move it to random location.
                this.y = -150;
                this.x = this.getRand(100, 700);
            }
        }
    }

    getRand(min, max) {
        min = Math.ceil(min);
        max = Math.floor(max);
        return Math.floor(Math.random() * (max - min + 1)) + min; //The maximum is inclusive and the minimum is inclusive 
    }


}