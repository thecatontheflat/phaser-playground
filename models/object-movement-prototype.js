var GameField = require('./game-field');

module.exports = {
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
        var newX, newY;
        var self = this;
        if (this.toRight() && this.canRight()) {
            newX = this.x + this.speed;
            if (false === GameField.checkCollision(self, newX, this.y)) {
                this.x = newX;
            }
        }

        if (this.toLeft() && this.canLeft()) {
            newX = this.x - this.speed;
            if (false === GameField.checkCollision(self, newX, this.y)) {
                this.x = newX;
            }
        }

        if (this.toDown() && this.canDown()) {
            newY = this.y + this.speed;
            if (false === GameField.checkCollision(self, this.x, newY)) {
                this.y = newY;
            }
        }

        if (this.toUp() && this.canUp()) {
            newY = this.y - this.speed;
            if (false === GameField.checkCollision(self, this.x, newY)) {
                this.y = newY;
            }
        }
    }
};