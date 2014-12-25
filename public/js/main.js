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
            redrawCounter: 0,

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

                if (self.isLeftBorder(newX)) {
                    self.x += newX;
                }

                if (self.isRightBorder()) {
                    self.x += newX;
                }

                if (self.isTopBorder(newY)) {
                    self.y += newY;
                }

                if (self.isBottomBorder(newY)) {
                    self.y += newY;
                }

                self.draw();
            },

            isLeftBorder: function (x) {
                var self = this;
                return x < 0 && self.x - x != 0;
            },

            isRightBorder: function (x) {
                var self = this;
                return x > 0 && self.x + self.size + x != self.fieldWidth;
            },

            isTopBorder: function (y) {
                var self = this;
                return y < 0 && self.y - y != 0;
            },

            isBottomBorder: function (y) {
                var self = this;
                return y > 0 && self.y + self.size + y != self.fieldHeight;
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
        var square1 = Z.walkingSquare.create(this.field, 50, 25);
        //var square2 = Z.walkingSquare.create(this.field, 0, 0);

        square1.draw();
        //square2.draw();

        this.squares.push(square1);
        //this.squares.push(square2);
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