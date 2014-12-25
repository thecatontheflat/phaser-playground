var Z = Z || {};

Z.drawer = {
    x: 0,
    y: 0,
    draw: function () {
        var ctx = this.ctx();
        this.clearCanvas();

        ctx.fillStyle = "rgb(200,0,0)";
        ctx.fillRect(this.x, this.y, 50, 50);

        var plusOrMinus = Math.random() < 0.5 ? -1 : 1;
        //var plusOrMinus = 1;
        var newX = Math.round(Math.random()) * plusOrMinus;
        var newY = Math.round(Math.random()) * plusOrMinus;

        if (newX < 0 && this.x - newX != 0) {
            this.x += newX;
        } else if (newX > 0) {
            this.x += newX;
        }

        if (newY < 0 && this.y - newY != 0) {
            this.y += newY;
        } else if (newY > 0) {
            this.y += newY;
        }
    },

    clearCanvas: function () {
        var ctx = this.ctx();
        ctx.clearRect(0, 0, 150, 150);
    },

    ctx: function () {
        return document.getElementById('canvas').getContext('2d');
    }
};