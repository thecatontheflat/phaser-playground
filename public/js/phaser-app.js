(function () {
    var tank;
    var game = new Phaser.Game(800, 600, Phaser.CANVAS, 'phaser-app', {
        preload: preload,
        create: create,
        update: update
    });

    function preload () {
        game.load.image('tank', '/assets/tank_w.png');
    }

    function create () {
        tank = game.add.sprite(0, 0, 'tank');

        game.physics.startSystem(Phaser.Physics.ARCADE);
        game.physics.enable(tank, Phaser.Physics.ARCADE);
        tank.body.collideWorldBounds = true;
    }

    function update () {
        if (game.input.mousePointer.isDown) {
            game.add.tween(tank.body).to({
                x: game.input.mousePointer.clientX,
                y: game.input.mousePointer.clientY
            }, 400, Phaser.Easing.Linear.None, true);
        }
    }

})();