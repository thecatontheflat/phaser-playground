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
            //self.listenInput();
            self.recalculateWorld();
            self.render();
        };
    },

    clearCanvas: function () {
        this.field.ctx.clearRect(0, 0, this.field.width, this.field.height);
    },

    recalculateWorld: function () {
        this.now = Date.now();
        var timeDelta = (this.now - this.then) / 1000;

        for (var i = 0; i < this.objects.length; i++) {
            var object = this.objects[i];
            object.listenInput();
            object.recalculatePosition(timeDelta);
        }

        this.then = this.now;
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
        player.init();

        var projectile = Z.projectile.create(this.field);

        this.objects.push(player);
        this.objects.push(projectile);

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
            field: field,
            direction: undefined,
            ammo: 0,

            init: function () {
                var self = this;
                var updateAmmo = function () {
                    self.ammo += 10;
                    console.log(self.ammo);
                };

                setInterval(updateAmmo, 1000);
            },

            draw: function () {
                ctx.fillStyle = fillStyle;
                ctx.fillRect(this.x, this.y, this.size, this.size);
            },

            listenInput: function () {
                var midX = this.x + (this.size / 2);
                var midY = this.y + (this.size / 2);

                if (Z.codes.space in Z.game.keysDown) {
                    if (this.ammo > 0) {
                        var missile = Z.projectile.create(this.field, midX, midY, this.direction);

                        Z.game.attachObject(missile);

                        this.ammo--;
                    }
                }
            },

            recalculatePosition: function (timeDelta) {
                if (Z.codes.up in Z.game.keysDown) {
                    this.y -= this.speed * this.speed * timeDelta;
                    this.direction = Z.codes.up;
                }
                if (Z.codes.down in Z.game.keysDown) {
                    this.y += this.speed * this.speed * timeDelta;
                    this.direction = Z.codes.down;
                }
                if (Z.codes.left in Z.game.keysDown) {
                    this.x -= this.speed * this.speed * timeDelta;
                    this.direction = Z.codes.left;
                }
                if (Z.codes.right in Z.game.keysDown) {
                    this.x += this.speed * this.speed * timeDelta;
                    this.direction = Z.codes.right;
                }
            }
        };
    }
};

Z.projectile = {
    create: function (field, x, y, direction) {
        var speed = 20; //pixels per second
        var boxSize = 5;
        var ctx = field.ctx;
        var fillStyle = "rgb(200,200,200)";

        return {
            x: x,
            y: y,
            speed: speed,
            size: boxSize,
            ctx: ctx,
            direction: direction,

            draw: function () {
                ctx.fillStyle = fillStyle;
                ctx.fillRect(this.x, this.y, this.size, this.size);
            },

            recalculatePosition: function (timeDelta) {
                if (Z.codes.up == this.direction) {
                    this.y -= this.speed * this.speed * timeDelta;
                }
                if (Z.codes.down == this.direction) {
                    this.y += this.speed * this.speed * timeDelta;
                }
                if (Z.codes.left == this.direction) {
                    this.x -= this.speed * this.speed * timeDelta;
                }
                if (Z.codes.right == this.direction) {
                    this.x += this.speed * this.speed * timeDelta;
                }
            },

            listenInput: function () {
            }
        };
    }
};

Z.codes = {
    space: 32,
    up: 38,
    down: 40,
    left: 37,
    right: 39
};