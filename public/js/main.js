var Z = Z || {};

Z.game = {
    objects: [],
    field: {},

    initField: function () {
        this.field.ctx = document.getElementById('canvas').getContext('2d');
        this.field.width = 500;
        this.field.height = 500;
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

        var getMousePosition = function (canvas, evt) {
            var rect = canvas.getBoundingClientRect();
            return {
                x: evt.clientX - rect.left,
                y: evt.clientY - rect.top
            };
        };

        var canvas = document.getElementById('canvas');
        canvas.addEventListener('mousedown', function (event) {
            var coords = getMousePosition(canvas, event);

            socket.emit('move', coords);
        }, false);

        this.render();

        var socket = io.connect();
        socket.on('render', function (objects) {
            self.objects = [];
            for (var i = 0; i < objects.length; i++) {
                var object = objects[i];
                if (null != object) {
                    self.objects.push(Z.object.create(self.field.ctx, object));
                }
            }

            self.render();
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
            fillStyle: object.fillStyle,

            draw: function () {
                this.ctx.fillStyle = this.fillStyle;
                this.ctx.fillRect(this.x, this.y, this.size, this.size);
            }
        };
    }
};