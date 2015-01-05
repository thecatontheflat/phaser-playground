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
        game = new Phaser.Game(400, 400, Phaser.AUTO, 'phaser-app', {
            preload: preload,
            create: create,
            update: update,
            render: render
        });
    });

    function Skeleton (id, game, startX, startY) {
        this.toX = startX;
        this.toY = startY;

        this.id = id;
        this.game = game;

        this.sprite = game.add.sprite(startX, startY, 'skeleton');
        this.game.physics.startSystem(Phaser.Physics.ARCADE);
        this.game.physics.enable(this.sprite, Phaser.Physics.ARCADE);

        this.sprite.anchor.setTo(0.5, 0.5);
        this.sprite.animations.add('walk', [0, 1, 2]);
        this.sprite.body.collideWorldBounds = true;
    }

    Skeleton.prototype.toServer = function () {
        return {
            id: this.id,
            x: this.sprite.body.x,
            y: this.sprite.body.y
        };
    };

    Skeleton.prototype.update = function () {
        var radians = this.game.physics.arcade.moveToXY(this.sprite, this.toX, this.toY, 400);
        if (-1.5 < radians && radians < 1.5) {
            this.sprite.scale.setTo(-1, 1);
        } else {
            this.sprite.scale.setTo(1, 1);
        }

        this.sprite.animations.play('walk', 10, true);

        if (Phaser.Rectangle.contains(this.sprite.body, this.toX, this.toY)) {
            this.sprite.body.velocity.setTo(0, 0);
            this.sprite.animations.stop('walk', true);
        }
    };

    function preload () {
        game.stage.disableVisibilityChange = true;
        game.load.image('earth', '/assets/scorched_earth.png');
        game.load.spritesheet('skeleton', '/images/skeleton_sprite.png', 64, 87);
    }

    function create () {
        socket.emit('phaser-loaded');

        socket.on('start', function (data) {
            myId = data.id;
            //players[myId] = new Skeleton(myId, game);
            for (var i = 0; i < data.players.length; i++) {
                var player = data.players[i];
                //console.log(player);
                players[player.id] = new Skeleton(player.id, game, player.x, player.y);
                //game.physics.arcade.enable(players[player.id].sprite);
            }
        });

        socket.on('new-player', function (data) {
            players[data.id] = new Skeleton(data.id, game, data.x, data.y);
            //game.physics.arcade.enable(players[data.id].sprite);
        });

        socket.on('remove', function (data) {
            if (players[data.id]) {
                players[data.id].sprite.kill();
            }
        });
    }

    var counter = 0;

    function update () {
        var toServer = [];
        if (!players[myId]) return;

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
            toServer.push(skeleton.toServer());
        }

        counter++;
        if (counter > 100) {
            socket.emit('sync', toServer);

            counter = 0;
        }
    }

    function render () {
        // game.debug.text('Active Bullets: ' + bullets.countLiving() + ' / ' + bullets.length, 32, 32);
        //game.debug.text('Enemies: ' + enemiesAlive + ' / ' + enemiesTotal, 32, 32);
    }

})();