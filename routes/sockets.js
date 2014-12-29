var Game = require('../models/game');

module.exports = function (io) {
    var counter = 0;
    var spawnObject = function () {
        counter++;

        var generateRandomColor = function () {
            var color = [];
            color.push(Math.round(Math.random() * 255));
            color.push(Math.round(Math.random() * 255));
            color.push(Math.round(Math.random() * 255));

            return "rgb(" + color.join(',') + ")";
        };

        var getRandomInRange = function getRandomArbitrary (min, max) {
            return Math.random() * (max - min) + min;
        };

        return {
            id: counter,
            x: 0, y: 0,
            toX: 0, toY: 0,
            size: getRandomInRange(20, 40),
            fillStyle: generateRandomColor()
        };
    };

    io.sockets.on('connection', function (client) {
        var object = spawnObject();
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