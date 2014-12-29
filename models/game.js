module.exports = function (io) {
    var Game = {
        speed: 3,
        objects: [],

        attachObject: function (object) {
            this.objects[object.id] = object;
        },

        moveObject: function (client, to) {
            var id = client['object_id'];
            var object = Game.objects[id];

            object.toX = to.x;
            object.toY = to.y;
        },

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
        },

        disconnect: function (client) {
            var newObjects = [];
            this.objects.forEach(function (object) {
                if (object.id != client['object_id']) {
                    newObjects[object.id] = object;
                }
            });

            this.objects = newObjects;
        }
    };

    return Game;
};