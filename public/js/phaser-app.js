(function () {
    var socket = io.connect();
    var game;
    var myId;
    var players = [];

    socket.on('move', function (data) {
        if (players[data.id] && data.id !== myId) {
            var skeleton = players[data.id];
            skeleton.toX = data.toX;
            skeleton.toY = data.toY;
        }
    });

    socket.on('connect', function () {
        game = new Phaser.Game(800, 600, Phaser.AUTO, 'phaser-app', {
            preload: preload,
            create: create,
            update: update,
            render: render
        });
    });

    function Skeleton (id, game) {
        this.toX = null;
        this.toY = null;
        this.id = id;
        this.game = game;

        this.skeleton = game.add.sprite(0, 0, 'skeleton');
        this.game.physics.startSystem(Phaser.Physics.ARCADE);
        this.game.physics.enable(this.skeleton, Phaser.Physics.ARCADE);

        this.skeleton.anchor.setTo(0.5, 0.5);
        this.skeleton.animations.add('walk', [0, 1, 2]);
        this.skeleton.body.collideWorldBounds = true;
    }

    Skeleton.prototype.update = function () {
        var radians = this.game.physics.arcade.moveToXY(this.skeleton, this.toX, this.toY, 400);
        if (-1.5 < radians && radians < 1.5) {
            this.skeleton.scale.setTo(-1, 1);
        } else {
            this.skeleton.scale.setTo(1, 1);
        }

        this.skeleton.animations.play('walk', 10, true);

        if (Phaser.Rectangle.contains(this.skeleton.body, this.toX, this.toY)) {
            this.skeleton.body.velocity.setTo(0, 0);
            this.skeleton.animations.stop('walk', true);
        }
    };

    function preload () {
        game.load.image('earth', '/assets/scorched_earth.png');
        game.load.spritesheet('skeleton', '/images/skeleton_sprite.png', 64, 87);
    }

    var skeleton;

    function create () {
        socket.emit('phaser-loaded');

        socket.on('start', function (data) {
            myId = data.id;
            players[myId] = new Skeleton(myId, game);
        });

        socket.on('new-player', function (data) {
            players[data.id] = new Skeleton(data.id, game);
        });

        socket.on('remove', function (data) {
            if (players[data.id]) {
                players[data.id].skeleton.kill();
            }
        });
    }

    function update () {
        var mySkeleton = players[myId];
        if (game.input.mousePointer.isDown) {
            mySkeleton.toX = this.game.input.x;
            mySkeleton.toY = this.game.input.y;

            socket.emit('move', {toX: mySkeleton.toX, toY: mySkeleton.toY});
        }

        for (var id in players) {
            var skeleton = players[id];
            if (!skeleton) continue;

            skeleton.update();
        }
    }

    function render () {
        // game.debug.text('Active Bullets: ' + bullets.countLiving() + ' / ' + bullets.length, 32, 32);
        //game.debug.text('Enemies: ' + enemiesAlive + ' / ' + enemiesTotal, 32, 32);
    }

})();