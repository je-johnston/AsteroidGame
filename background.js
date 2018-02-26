
class background extends Entity {

    constructor(game, spritesheet, x, y) {
        super(game, x, y);
        this.game = game;
        this.ctx = game.ctx;
        this.x = x;
        this.y = y;
        this.sheet = spritesheet;

        game.addEntity(this);
    }

    draw() {
        this.ctx.drawImage(this.sheet, this.x, this.y);
    }


}