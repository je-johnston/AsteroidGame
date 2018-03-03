
class SpaceShip extends Entity {

    constructor(engine, spritesheet, x, y) {
        super(engine, x, y);
        this.engine = engine;
        this.ctx = engine.ctx;
        this.sheetX = 112;
        this.sheetY = 718;
        this.sheetWidth = 112;
        this.sheetHeight = 74;
        this.x = x;
        this.y = y;
        this.centerX = this.x + 25;
        this.speed = 2.0;
        this.isPaused = false;
        this.spritesheet = spritesheet;
        this.isEmergency = false;

        //Collider Data.
        this.sightDistance = 400;
        this.sightWidth = 10;
        this.xOffset = 25;
        

        this.colliders = [];

        this.colliders.push(new Collider(this.engine, this, this.x, this.y, 100, 100, "shipSensor", 'green'));
        this.colliders.push(new Collider(this.engine, this, this.x, this.y, 100, 100, "shipHull", 'red'));

        //var slider = document.getElementById("scanSlider");
        //var that = this;
        //slider.oninput = function () {
        //    that.sightDistance = slider.value;
        //}

        engine.addEntity(this);
        console.log("Spaceship created");
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

    getColliders() {
        return this.colliders;
    }

    getSightCollider() {

        for (const col of this.colliders) {
            if (col.getTag() == "shipSensor") {
                return col;
            }
        }
    }

    getHullCollider() {
        for (const col of this.colliders) {
            if (col.getTag() == "shipHull") {
                return col;
            }
        }
    }


    draw() {
        this.ctx.drawImage(this.spritesheet, this.sheetX, this.sheetY, this.sheetWidth, this.sheetHeight, this.x, this.y, 64, 64);
    }

    changeDirection() {

        if (this.speed > 0) {
            this.speed = -2;
        } else {
            this.speed = 2;
        }


    }

    updateUI() {
        var UIx = document.getElementById("sensX");
        var UIy = document.getElementById("sensY");
        var UIw = document.getElementById("sensWidth");
        var UIh = document.getElementById("sensHeight");

        var arr = [];

        for (const col of this.colliders) {
            if (col.getTag() == "shipSensor") {
                arr = col.getData();
            }
        }

        UIx.innerHTML = arr[0];
        UIy.innerHTML = arr[1];
        UIw.innerHTML = arr[2];
        UIh.innerHTML = arr[3];


    }

    pause() {
        this.isPaused = !this.isPaused;
    }

    updateColliders() {

        for (const col of this.colliders) {
            if (col.getTag() === "shipSensor") {
                col.updateCollider((this.x + this.xOffset), (this.y - this.sightDistance), this.sightWidth, this.sightDistance);
            }
            if (col.getTag() === "shipHull") {
                col.updateCollider(this.x, this.y, 64, 64);
            }

        }

    }


    update() {

        if (this.isPaused === false) { 
        this.x += this.speed;
        this.centerX = this.x + 25;
        this.updateColliders();
        }

        this.updateUI();

        if (this.x > 740 && this.speed > 0) {
            this.changeDirection();
        }

        if (this.x < 10 && this.speed < 0) {
            this.changeDirection();
        }

    }

    


}