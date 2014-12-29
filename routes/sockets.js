var Game = require('../models/game');
var ObjectFactory = require('../models/object-factory');

module.exports = function (io) {
    io.sockets.on('connection', function (client) {
        var object = ObjectFactory.create();
        client['object_id'] = object.id;
        Game.objects[object.id] = object;

        client.on('move', function (data) {
            Game.objects[client['object_id']].toX = data.x;
            Game.objects[client['object_id']].toY = data.y;
        });

        client.on('disconnect', function () {
            var newObjects = [];
            Game.objects.forEach(function (object) {
                if (object.id != client['object_id']) {
                    newObjects[object.id] = object;
                }
            });

            Game.objects = newObjects;
        });
    });

    var serverLoop = function () {
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
    };

    setInterval(serverLoop, 60);
};