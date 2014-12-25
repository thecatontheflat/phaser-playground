var Z = Z || {};

Z.walkingSquare = {
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

            recalculateCoordinates: function () {
                var self = this;

                var plusOrMinus = Math.random() < 0.5 ? -1 : 1;
                var newX = Math.round(Math.random()) * plusOrMinus;
                var newY = Math.round(Math.random()) * plusOrMinus;

                if (self.isLeftBorder(newX) && !self.isLeftCollision()) {
                    self.x += newX;
                }

                if (self.isRightBorder(newX) && !self.isRightCollision()) {
                    self.x += newX;
                }

                if (self.isTopBorder(newY)) {
                    self.y += newY;
                }

                if (self.isBottomBorder(newY)) {
                    self.y += newY;
                }
            },

            //checkCollisions: function () {
            //    var self = this;
            //
            //    var imgData = self.ctx.getImageData(self.x, self.y, 1, 1).data;
            //    console.log('r', imgData[0]);
            //    console.log('g', imgData[1]);
            //    console.log('b', imgData[2]);
            //},

            redraw: function () {
                var self = this;
                self.draw();
            },

            isLeftCollision: function () {
                var self = this;
                var rgb = self.ctx.getImageData(self.x - 5, self.y, 1, 1).data;

                return !(rgb[0] == 0 && rgb[1] == 0 && rgb[2] == 0);
            },

            isRightCollision: function () {
                var self = this;
                var rgb = self.ctx.getImageData(self.x + self.size + 5, self.y, 1, 1).data;

                return !(rgb[0] == 0 && rgb[1] == 0 && rgb[2] == 0);
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
        var square1 = Z.walkingSquare.create(this.field, 50, 50);
        var square2 = Z.walkingSquare.create(this.field, 0, 0);
        var square3 = Z.walkingSquare.create(this.field, 0, 100);

        square1.draw();
        square2.draw();
        square3.draw();

        this.squares.push(square1);
        this.squares.push(square2);
        this.squares.push(square3);
    },

    redraw: function () {
        var i = 0;
        for (i = 0; i < this.squares.length; i++) {
            this.squares[i].recalculateCoordinates();
        }

        this.clearCanvas();
        for (i = 0; i < this.squares.length; i++) {
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