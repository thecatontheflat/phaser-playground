(function () {
    var game = new Phaser.Game(800, 600, Phaser.AUTO, 'phaser-app', {
        preload: preload,
        create: create,
        update: update,
        render: render
    });

    function preload () {

        game.load.atlas('tank', '/assets/tanks.png', '/assets/tanks.json');
        game.load.atlas('enemy', '/assets/enemy-tanks.png', '/assets/tanks.json');
        game.load.image('bullet', '/assets/bullet.png');
        game.load.image('earth', '/assets/scorched_earth.png');
        game.load.spritesheet('kaboom', '/assets/explosion.png', 64, 64, 23);
        game.load.image('skeleton', '/images/skeleton.png')

    }

    var land;

    var shadow;
    var tank;
    var turret;

    var enemies;
    var enemyBullets;
    var enemiesTotal = 0;
    var enemiesAlive = 0;
    var explosions;

    var currentSpeed = 0;
    var cursors;

    var bullets;
    var fireRate = 100;
    var nextFire = 0;

    var skeleton;

    function create () {
        game.physics.startSystem(Phaser.Physics.ARCADE);
        //  Resize our game world to be a 2000 x 2000 square
        game.world.setBounds(-1000, -1000, 2000, 2000);

        //  Our tiled scrolling background
        land = game.add.tileSprite(0, 0, 800, 600, 'earth');
        land.fixedToCamera = true;

        skeleton = game.add.sprite(0,0,'skeleton', 'skeleton');
        skeleton.scale.setTo(0.2, 0.2);
        game.physics.enable(skeleton, Phaser.Physics.ARCADE);

        game.camera.follow(skeleton);
        game.camera.deadzone = new Phaser.Rectangle(150, 150, 500, 300);
        game.camera.focusOnXY(0, 0);

        cursors = game.input.keyboard.createCursorKeys();

    }

    function update () {

        if (cursors.left.isDown) {
            skeleton.body.velocity.x = -300;
        }  else if (cursors.right.isDown) {
            skeleton.body.velocity.x = 300;
        }  else if (cursors.up.isDown) {
            skeleton.body.velocity.y = -300;
        }  else if (cursors.down.isDown) {
            skeleton.body.velocity.y = 300;
        } else {
            skeleton.body.velocity.y = 0;
            skeleton.body.velocity.x = 0;
            //if (currentSpeed > 0) {
            //    currentSpeed -= 4;
            //}
        }

        if (currentSpeed > 0) {
            //game.physics.arcade.velocityFromRotation(skeleton.rotation, currentSpeed, skeleton.body.velocity);
        }

        land.tilePosition.x = -game.camera.x;
        land.tilePosition.y = -game.camera.y;

        //  Position all the parts and align rotations
        //shadow.x = tank.x;
        //shadow.y = tank.y;
        //shadow.rotation = tank.rotation;

        //turret.x = tank.x;
        //turret.y = tank.y;

        //turret.rotation = game.physics.arcade.angleToPointer(turret);

        if (game.input.activePointer.isDown) {
            //  Boom!
            //fire();
        }

    }

    function bulletHitPlayer (tank, bullet) {

        bullet.kill();

    }

    function bulletHitEnemy (tank, bullet) {

        bullet.kill();

        var destroyed = enemies[tank.name].damage();

        if (destroyed) {
            var explosionAnimation = explosions.getFirstExists(false);
            explosionAnimation.reset(tank.x, tank.y);
            explosionAnimation.play('kaboom', 30, false, true);
        }

    }

    function fire () {

        if (game.time.now > nextFire && bullets.countDead() > 0) {
            nextFire = game.time.now + fireRate;

            var bullet = bullets.getFirstExists(false);

            bullet.reset(turret.x, turret.y);

            bullet.rotation = game.physics.arcade.moveToPointer(bullet, 1000, game.input.activePointer, 500);
        }

    }

    function render () {

        // game.debug.text('Active Bullets: ' + bullets.countLiving() + ' / ' + bullets.length, 32, 32);
        //game.debug.text('Enemies: ' + enemiesAlive + ' / ' + enemiesTotal, 32, 32);

    }

})();