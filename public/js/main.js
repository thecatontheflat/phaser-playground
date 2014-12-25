var Z = Z || {};

Z.walkingSquare = {
    x: 0,
    y: 0,
    fillStyle: "rgb(200,0,0)",
    size: 50,

    create: function (field, x, y) {
        return {
            x: x,
            y: y,
            size: this.size,
            fillStyle: this.fillStyle,
            ctx: field.ctx,
            fieldWidth: field.width,
            fieldHeight: field.height,

            draw: function () {
                var self = this;

                self.ctx.fillStyle = self.fillStyle;
                self.ctx.fillRect(self.x, self.y, self.size, self.size);
            },

            redraw: function () {
                var self = this;

                var plusOrMinus = Math.random() < 0.5 ? -1 : 1;
                var newX = Math.round(Math.random()) * plusOrMinus;
                var newY = Math.round(Math.random()) * plusOrMinus;

                // Check left border
                if (newX < 0 && self.x - newX != 0) {
                    self.x += newX;
                }

                // Check right border
                if (newX > 0 && self.x + self.size + newX != self.fieldWidth) {
                    self.x += newX;
                }

                // Check top border
                if (newY < 0 && self.y - newY != 0) {
                    self.y += newY;
                }

                // Check bottom border
                if (newY > 0 && self.y + self.size + newY != self.fieldHeight) {
                    self.y += newY;
                }

                self.draw();
            }
        };
    }
};

Z.drawer = {
    squares: [],
    field: {
        width: 150,
        height: 150,
        ctx: ''
    },

    init: function () {
        this.initField();
        var square = Z.walkingSquare.create(this.field, 0, 0);

        square.draw();

        this.squares.push(square);
    },

    redraw: function () {
        this.clearCanvas();

        for (var i = 0; i < this.squares.length; i++) {
            this.squares[i].redraw();
        }
    },

    clearCanvas: function () {
        this.field.ctx.clearRect(0, 0, this.field.width, this.field.height);
    },

    initField: function () {
        this.field.ctx = document.getElementById('canvas').getContext('2d');
    }
};