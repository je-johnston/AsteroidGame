
class gamemanager extends Entity {

    constructor(engine) {

        super(engine, 0, 0);
        console.log("game manager created.");
        this.engine = engine;
        engine.addEntity(this);



        this.socket = io.connect("http://24.16.255.56:8888");
        this.socket.on("connect", function () {
            console.log("Socket connected.")
        });
        this.socket.on("disconnect", function () {
            console.log("Socket disconnected.")
        });
        this.socket.on("reconnect", function () {
            console.log("Socket reconnected.")
        });

        var that = this;
        this.socket.on("load", function (data) {
            that.loadState(data);
            //console.log(data.data.playerX);
        });

        //socket.emit("save", { studentname: "James Johnston", statename: "gameStart", data: "Goodbye World" });
        //socket.emit("load", { studentname: "Chris Marriott", statename: "aState" });
        //socket.emit("load", { studentname: "Chris Marriott", statename: "theState" });

        this.socket.on("ping", function (ping) {
            console.log(ping);
            socket.emit("pong");
        });



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
        var that = this;
        document.getElementById("saveState").onclick = function (event) {
            that.saveState();
        };

        var that = this;
        document.getElementById("loadState").onclick = function (event) {
            that.sendLoadSignal();
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

    /**
     * Saves the current state of the game.
     */
    saveState() {

        //This is an unbelievable shitty way to do this but I don't have the time to make it better.

        var curData = [];
        curData[0] = this.playerShip.getX();   //Data[0] = Player ship's current X.
        curData[1] = this.playerShip.getY();   //Data[1] = Player ship's current Y.
        curData[2] = this.asteroids[0].getX(); //Data[2] = Asteroid 1's current X.
        curData[3] = this.asteroids[0].getX(); //Data[3] = Asteroid 1's current Y.
        curData[4] = this.asteroids[1].getX(); //Data[4] = Asteroid 2's Current X.
        curData[5] = this.asteroids[1].getY(); //Data[5] = Asteroid 2's Current Y.
        curData[6] = this.asteroids[2].getX(); //Data[6] = Asteroid 3's Current X.
        curData[7] = this.asteroids[2].getY(); //Data[7] = Asteroid 3's Current Y.


        this.socket.emit("save", { studentname: "James Johnston", statename: "currGame", data: curData });
        console.log("Saved current state of game: ");
        for (const k of curData) {
            console.log(k);
        }
    }

    sendLoadSignal() {
        console.log("Sending load signal.");
        this.socket.emit("load", { studentname: "James Johnston", statename: "currGame"});
    }

    loadState(data) {
        console.log("Loading data.")
        this.playerShip.setX(data.data[0]);
        this.playerShip.setY(data.data[1]);
        this.asteroids[0].setX(data.data[2]);
        this.asteroids[0].setY(data.data[3]);
        this.asteroids[1].setX(data.data[4]);
        this.asteroids[1].setY(data.data[5]);
        this.asteroids[2].setX(data.data[6]);
        this.asteroids[2].setY(data.data[7]);

        console.log("Load Complete.");

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