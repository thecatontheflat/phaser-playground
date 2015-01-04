(function () {
    var game = new Phaser.Game(800, 600, Phaser.AUTO, 'phaser-app', {
        preload: preload,
        create: create,
        update: update,
        render: render
    });

    function preload () {
        game.load.image('earth', '/assets/scorched_earth.png');
        game.load.spritesheet('skeleton', '/images/skeleton_sprite.png', 64, 87);
    }

    var cursors;
    var skeleton;

    function create () {
        game.physics.startSystem(Phaser.Physics.ARCADE);

        skeleton = game.add.sprite(0, 0, 'skeleton');
        game.physics.enable(skeleton, Phaser.Physics.ARCADE);

        skeleton.anchor.setTo(0.5, 0.5);
        skeleton.animations.add('walk', [0, 1, 2]);
        skeleton.body.collideWorldBounds = true;

        cursors = game.input.keyboard.createCursorKeys();
    }

    function update () {
        if (cursors.left.isDown) {
            skeleton.body.velocity.x = -300;
            skeleton.animations.play('walk', 10, true);
            skeleton.scale.setTo(1, 1);
        } else if (cursors.right.isDown) {
            skeleton.body.velocity.x = 300;
            skeleton.animations.play('walk', 10, true);
            skeleton.scale.setTo(-1, 1);
        } else if (cursors.up.isDown) {
            skeleton.body.velocity.y = -300;
            skeleton.animations.play('walk', 10, true);
        } else if (cursors.down.isDown) {
            skeleton.body.velocity.y = 300;
            skeleton.animations.play('walk', 10, true);
        } else {
            skeleton.body.velocity.y = 0;
            skeleton.body.velocity.x = 0;
            skeleton.animations.stop('walk', true);
        }
    }

    function render () {
        // game.debug.text('Active Bullets: ' + bullets.countLiving() + ' / ' + bullets.length, 32, 32);
        //game.debug.text('Enemies: ' + enemiesAlive + ' / ' + enemiesTotal, 32, 32);
    }

})();