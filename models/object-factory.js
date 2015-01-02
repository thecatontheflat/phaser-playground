var _ = require('underscore');
var GameObjectMovementPrototype = require('./object-movement-prototype');

var GameObjectPrototype = {
    x: 55, y: 55,
    toX: 55, toY: 55,
    boundingBox: 10,

    id: undefined,
    size: undefined,
    fillStyle: undefined,
    speed: undefined,

    get collisionRadius () {
        return Math.round(this.size / 2);
    },

    fight: function () {
        if (this.size > 10) {
            this.size--;
        }
    }
};

_.extend(GameObjectPrototype, GameObjectMovementPrototype);

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
        object.size = this.getRandomNumberInRange(70, 80);
        object.speed = this.getRandomNumberInRange(3, 10);
        object.fillStyle = this.generateRandomFillStyle();

        return object;
    }
};
