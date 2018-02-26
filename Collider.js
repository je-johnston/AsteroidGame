
class Collider extends Entity {
    constructor(engine, parent, x, y, height, width, tag, color) {
        super(engine, x, y);
        this.engine = engine;
        this.ctx = engine.ctx;
        this.parent = parent;
        this.x = x;
        this.y = y;
        this.height = height;
        this.width = width;
        this.tag = tag;
        this.color = color;
        this.engine.addEntity(this);
        this.showColliders = false;




    }

    toggleVisual() {
        this.showColliders = !this.showColliders;
    }

    getX() {
        return this.x;
    }

    getY() {
        return this.y;
    }

    getHeight() {
        return this.height;
    }

    getWidth() {
        return this.width;
    }

    getTag() {
        return this.tag;
    }

    getData() {
        var result = [];


        result[0] = this.x;
        result[1] = this.y; 
        result[2] = this.width;
        result[3] = this.height; 
        result[4] = this.tag;



        return result;
    }

    updateCollider(x, y, width, height) {
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;
    }

    draw() {
        if (this.showColliders) {
            this.ctx.strokeStyle = this.color;
            this.ctx.strokeRect(this.x, this.y, this.width, this.height);
        }
    }


}

