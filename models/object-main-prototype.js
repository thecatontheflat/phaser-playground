module.exports = {
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