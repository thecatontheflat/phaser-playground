module.exports = function (io) {
    var Game = {
        speed: 3,
        objects: [],
        updateRequired: false,

        attachObject: function (object) {
            this.objects[object.id] = object;
        },

        moveObject: function (client, to) {
            var id = client['object_id'];
            var object = Game.objects[id];

            object.toX = to.x;
            object.toY = to.y;
        },

        getRecalculatePositionCallback: function() {
            return function (object) {
                if (object.getCenterCoords().x < object.toX) {
                    object.x += Game.speed;
                }

                if (object.getCenterCoords().x > object.toX) {
                    object.x -= Game.speed;
                }

                if (object.getCenterCoords().y < object.toY) {
                    object.y += Game.speed;
                }

                if (object.getCenterCoords().y > object.toY) {
                    object.y -= Game.speed;
                }

                Game.updateRequired = true;
            };
        },

        serverLoop: function () {
            Game.updateRequired = false;
            Game.objects.forEach(Game.getRecalculatePositionCallback());

            if (Game.updateRequired) {
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