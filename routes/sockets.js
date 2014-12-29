module.exports = function (io) {
    var Game = require('../models/game')(io);
    var ObjectFactory = require('../models/object-factory');

    io.sockets.on('connection', function (client) {
        var object = ObjectFactory.spawn(client);
        Game.attachObject(object);

        client.on('move', function (data) {
            Game.objects[client['object_id']].toX = data.x;
            Game.objects[client['object_id']].toY = data.y;
        });

        client.on('disconnect', function () {
            Game.disconnect(client);
        });
    });

    setInterval(Game.serverLoop, 60);
};