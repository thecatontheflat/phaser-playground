var Z = Z || {};

Z.game = {
    objects: [],
    field: {},
    keysDown: {},

    initField: function () {
        this.field.ctx = document.getElementById('canvas').getContext('2d');
        this.field.width = 500;
        this.field.height = 500;
    },

    loopCallback: function () {
        var self = this;
        var now = Date.now();
        var then = Date.now();
        var delta = 0;

        return function () {
            now = Date.now();
            delta = (now - then) / 1000;
            //handleInput();
            self.recalculateWorld(delta);
            self.render();

            then = now;
        };
    },

    clearCanvas: function () {
        this.field.ctx.clearRect(0, 0, this.field.width, this.field.height);
    },

    recalculateWorld: function (delta) {
        var player = this.objects[0];

        if (38 in this.keysDown) { // Player holding up
            player.y -= player.speed * player.speed * delta;
        }
        if (40 in this.keysDown) { // Player holding down
            player.y += player.speed * player.speed * delta;
        }
        if (37 in this.keysDown) { // Player holding left
            player.x -= player.speed * player.speed * delta;
        }
        if (39 in this.keysDown) { // Player holding right
            player.x += player.speed * player.speed * delta;
        }
    },

    render: function () {
        this.clearCanvas();

        for (var i = 0; i < this.objects.length; i++) {
            var object = this.objects[i];
            object.draw();
        }
    },

    init: function () {
        var self = this;
        addEventListener('keydown', function (e) {
            self.keysDown[e.keyCode] = true;
        }, false);

        addEventListener('keyup', function (e) {
            delete self.keysDown[e.keyCode];
        }, false);

        this.initField();
        var player = Z.player.create(this.field);

        this.objects.push(player);

        window.setInterval(this.loopCallback(), 1);
    }
};

Z.player = {
    create: function (field) {
        var startX = 0;
        var startY = 0;
        var speed = 10; //pixels per second
        var boxSize = 40;
        var ctx = field.ctx;
        var fillStyle = "rgb(200,0,0)";

        return {
            x: startX,
            y: startY,
            speed: speed,
            size: boxSize,
            ctx: ctx,

            draw: function () {
                ctx.fillStyle = fillStyle;
                ctx.fillRect(this.x, this.y, this.size, this.size);
            }
        };
    }
};