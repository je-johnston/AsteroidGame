
class gamemanager extends Entity {

    constructor(engine) {

        super(engine, 0, 0);
        console.log("game manager created.");
        this.engine = engine;
        engine.addEntity(this);



        this.timer = 0;
        this.evadeDistance = 0;
        this.scanTimer = 600;

        var spritesheet = AM.getAsset("./Assets/sheet.png");
        var spaceSheet = AM.getAsset("./Assets/spaceBG.jpg");

        var bg = new background(engine, spaceSheet, 0, 0);


        this.asteroids = [];

        var that = this;
        var tempTimer = window.setInterval(function () {
            that.timer++;
            that.updateUI();
            //that.checkCollisions();
        }, 1000);

        var scanInterval = window.setInterval(function () {
            that.checkCollisions();
        }, this.scanTimer);

        //Create asteroids.
        for (var i = 0; i < 3; i++) {
            this.asteroids.push(new Asteroid(engine, spritesheet, (i * 250), (i * -155)));
        }

        this.playerShip = new SpaceShip(engine, spritesheet, 300, 600);

        var that = this;
        document.getElementById("pauseButton").onclick = function (event) {
            that.pauseAction();
        };
        var that = this;
        document.getElementById("showCols").onclick = function (event) {
            that.toggleCols();
        };

    }

    resetGame() {
        this.playerShip.setX(300);
        var i = 0;
        for (const ast of this.asteroids) {
            ast.setX(i * 250);
            ast.setY(i * - 155);
            i++;
        }

    }


    toggleCols() {
        for (const as of this.asteroids) {
            as.getCollider().toggleVisual();
        }

        this.playerShip.getSightCollider().toggleVisual();
        this.playerShip.getHullCollider().toggleVisual();

    }


    updateUI() {
        var timeDom = document.getElementById("tm");
        timeDom.innerHTML = this.timer;


    }

    checkCollisions() {

        console.log("Checking for Collisions.");
        var playerSightData = this.playerShip.getSightCollider().getData();
        var playerHullData = this.playerShip.getHullCollider().getData();

        for (const ast of this.asteroids) {
            var astData = ast.getCollider().getData();

            var rangeTilAsteroid = this.compareColliders(playerSightData, astData);
            var isHittingHull = this.compareColliders(playerHullData, astData);

            if (rangeTilAsteroid != false) {

              this.playerShip.changeDirection();
                
            }

            if (isHittingHull != false) {

                this.resetGame();
            }


        }


    }

    /*
    Pauses the game.
    */
    pauseAction() {
        this.playerShip.pause();
        for (const a of this.asteroids) {
            a.pause();
        }
    }

    /*
    Compares two colliders. 
    */
    compareColliders(colA, colB) {
        var result = false;

        if (colA[0] < colB[0] + colB[2] &&
            colA[0] + colA[2] > colB[0] &&
            colA[1] < colB[1] + colB[3] && 
            colA[3] + colA[1] > colB[1]) {
            
            //result = true;

            result = colB[1] - colA[1];

        }

        return result;
    }


    update() {
        

    }



}