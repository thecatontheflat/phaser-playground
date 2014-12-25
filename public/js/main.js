var Z = Z || {};

Z.drawer = {
    x: 0,
    y: 0,
    draw: function () {
        var ctx = document.getElementById('canvas').getContext('2d');
        ctx.clearRect(0, 0, 150, 150);

        ctx.fillStyle = "rgb(200,0,0)";
        ctx.fillRect(this.x, this.y, 55, 50);

        this.x += 10;
        this.y += 10;
    }
};