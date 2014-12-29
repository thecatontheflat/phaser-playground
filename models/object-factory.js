module.exports = {
    counter: 0,

    generateRandomColor: function () {
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

        return {
            id: this.counter,
            x: 0, y: 0,
            toX: 0, toY: 0,
            size: this.getRandomNumberInRange(20, 40),
            fillStyle: this.generateRandomColor()
        };
    }
};