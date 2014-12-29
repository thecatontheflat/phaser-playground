var Z = Z || {};

Z.game = {
    objects: [],
    field: {},
    keysDown: {},
    now: Date.now(),
    then: Date.now(),

    initField: function () {
        this.field.ctx = document.getElementById('canvas').getContext('2d');
        this.field.width = 500;
        this.field.height = 500;
    },

    attachObject: function (object) {
        this.objects.push(object);
    },

    loopCallback: function () {
        var self = this;

        return function () {
            self.render();
        };
    },

    clearCanvas: function () {
        this.field.ctx.clearRect(0, 0, this.field.width, this.field.height);
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
        this.initField();

        document.getElementById('canvas').addEventListener('mousedown', function (event) {
            var x = event.clientX;
            var y = event.clientY;

            var canvas = document.getElementById("canvas");

            var coords = {x: x, y: y};
            socket.emit('move', coords);
        }, false);

        this.loopCallback()();

        var socket = io.connect();
        socket.on('render', function (objects) {
            self.objects = [];
            for (var i = 0; i < objects.length; i++) {
                var object = objects[i];
                if (null != object) {
                    self.objects.push(Z.object.create(self.field.ctx, object));
                }
            }

            self.loopCallback()();
        });
    }
};

Z.object = {
    create: function (ctx, object) {
        return {
            x: object.x,
            y: object.y,
            size: object.size,
            ctx: ctx,

            draw: function () {
                this.ctx.fillStyle = this.fillStyle;
                this.ctx.fillRect(this.x, this.y, this.size, this.size);
            }
        };
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
            field: field,
            direction: undefined,

            init: function () {
            },

            draw: function () {
                ctx.fillStyle = fillStyle;
                ctx.fillRect(this.x, this.y, this.size, this.size);
            }
        };
    }
};