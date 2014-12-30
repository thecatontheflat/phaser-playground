var GameObjectPrototype = {
    x: 55, y: 55,
    toX: 55, toY: 55,
    boundingBox: 10,
    field: {
        height: 500,
        width: 500
    },

    id: undefined,
    size: undefined,
    fillStyle: undefined,
    speed: undefined,

    getCenterCoords: function () {
        return {
            x: Math.round(this.x + this.size / 2),
            y: Math.round(this.y + this.size / 2)
        };
    },

    getLeftX: function () {
        return Math.round(this.x - this.boundingBox);
    },

    getRightX: function () {
        return Math.round(this.x + this.size + this.boundingBox);
    },

    getTopY: function () {
        return Math.round(this.y - this.boundingBox);
    },

    getBottomY: function () {
        return Math.round(this.y + this.size + this.boundingBox);
    },

    toUp: function () {
        return this.getCenterCoords().y > this.toY;
    },

    toDown: function () {
        return this.getCenterCoords().y < this.toY;
    },

    toLeft: function () {
        return this.getCenterCoords().x > this.toX;
    },

    toRight: function () {
        return this.getCenterCoords().x < this.toX;
    },

    canUp: function () {
        return this.getTopY() > 0;
    },

    canDown: function () {
        return this.getBottomY() < this.field.height;
    },

    canLeft: function () {
        return this.getLeftX() > 0;
    },

    canRight: function () {
        return this.getRightX() < this.field.width;
    },

    move: function () {
        if (this.toRight() && this.canRight()) {
            this.x += this.speed;
        }

        if (this.toLeft() && this.canLeft()) {
            this.x -= this.speed;
        }

        if (this.toDown() && this.canDown()) {
            this.y += this.speed;
        }

        if (this.toUp() && this.canUp()) {
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