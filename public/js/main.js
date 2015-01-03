var Z = Z || {};

Z.game = {
    objects: [],
    field: {},
    canvas: undefined,

    initField: function () {
        this.field.ctx = document.getElementById('canvas').getContext('2d');
        this.field.width = 900;
        this.field.height = 600;
        this.canvas = document.getElementById('canvas');
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

    getMousePosition: function (canvas, evt) {
        var rect = canvas.getBoundingClientRect();
        return {
            x: evt.clientX - rect.left,
            y: evt.clientY - rect.top
        };
    },

    init: function () {
        var self = this;
        this.initField();
        this.render();
        var socket = io.connect();

        this.canvas.addEventListener('mousedown', function (event) {
            var coords = self.getMousePosition(self.canvas, event);

            socket.emit('move', coords);
        }, false);

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
                //this.ctx.beginPath();
                //this.ctx.fillStyle = this.fillStyle;
                //this.ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2, true);
                //this.ctx.closePath();
                //this.ctx.fill();
            }
        };
    }
};