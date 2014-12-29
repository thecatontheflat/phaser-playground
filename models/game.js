module.exports = function (io) {
    var Game = {
        speed: 3,
        objects: [],

        serverLoop: function () {
            var updateRequired = false;
            Game.objects.forEach(function (object) {
                if (object.x < object.toX) {
                    object.x += Game.speed;
                }

                if (object.x > object.toX) {
                    object.x -= Game.speed;
                }

                if (object.y < object.toY) {
                    object.y += Game.speed;
                }

                if (object.y > object.toY) {
                    object.y -= Game.speed;
                }

                updateRequired = true;
            });

            if (updateRequired) {
                io.emit('render', Game.objects);
            }
        }
    };

    return Game;
};