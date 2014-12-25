var Z = Z || {};

Z.drawer = {
    x: 0,
    y: 0,
    draw: function () {
        this.clearCanvas();
        var ctx = document.getElementById('canvas').getContext('2d');

        ctx.fillStyle = "rgb(200,0,0)";
        ctx.fillRect(this.x, this.y, 55, 50);

        var plusOrMinus = Math.random() < 0.5 ? -1 : 1;
        this.x += Math.round(Math.random()) * plusOrMinus;
        this.y += Math.round(Math.random()) * plusOrMinus;
    },

    clearCanvas: function() {
        var ctx = document.getElementById('canvas').getContext('2d');
        ctx.clearRect(0, 0, 150, 150);
    }
};