var GameObjectPrototype = {
    id: undefined,
    x: 0, y: 0,
    toX: 1, toY: 1,
    size: undefined,
    fillStyle: undefined
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

    create: function () {
        this.counter++;

        var object = Object.create(GameObjectPrototype);
        object.id = this.counter;
        object.size = this.getRandomNumberInRange(20, 40);
        object.fillStyle = this.generateRandomFillStyle();

        return object;
    }
};