var GameObjectPrototype = {
    x: 55, y: 55,
    toX: 55, toY: 55,
    boundingBox: 10,
    field: {
        height: 500,
        widgth: 500
    },

    id: undefined,
    size: undefined,
    fillStyle: undefined,
    speed: undefined,

    getCenterCoords: function () {
        return {
            x: this.x + this.size / 2,
            y: this.y + this.size / 2
        };
    },

    getLeftX: function () {
        return this.x;
    },

    getRightX: function () {
        return this.x + this.size;
    },

    getTopY: function () {
        return this.y;
    },

    getBottomY: function () {
        return this.y + this.size;
    },

    toUp: function () {
        return this.getCenterCoords().y < this.toY;
    },

    toDown: function () {
        return this.getCenterCoords().y > this.toY;
    },

    toLeft: function () {
        return this.getCenterCoords().x > this.toX;
    },

    toRight: function () {
        return this.getCenterCoords().x < this.toX;
    },

    canUp: function () {
        return this.getTopY() - this.boundingBox > 0;
    },

    canDown: function () {
        return this.getBottomY() + this.boundingBox > this.field.height;
    },

    canRight: function () {
        return this.getRightX() + this.boundingBox > this.field.widgth;
    },

    canLeft: function () {
        return this.getLeftX() - this.boundingBox > 0;
    },

    move: function () {
        if (this.toRight()) {
            this.x += this.speed;
        }

        if (this.toLeft()) {
            this.x -= this.speed;
        }

        if (this.toUp()) {
            this.y += this.speed;
        }

        if (this.toDown()) {
            this.y -= this.speed;
        }
    }
};

module.exports = {
    counter: 0,

    generateRandomFillStyle: function () {
        var color = [];
        color.push(Math.round(Math.random() * 255));
        color.push(Math.round(Math.random() * 255));
        color.push(Math.round(Math.random() * 255));

        return "rgb(" + color.join(',') + ")";
    },

    getRandomNumberInRange: function getRandomArbitrary (min, max) {
        return Math.random() * (max - min) + min;
    },

    spawn: function () {
        this.counter++;

        var object = Object.create(GameObjectPrototype);
        object.id = this.counter;
        object.size = this.getRandomNumberInRange(20, 40);
        object.speed = this.getRandomNumberInRange(3, 10);
        object.fillStyle = this.generateRandomFillStyle();

        return object;
    }
};