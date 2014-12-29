module.exports = function (io) {
    var Game = require('../models/game')(io);
    var ObjectFactory = require('../models/object-factory');

    io.sockets.on('connection', function (client) {
        var object = ObjectFactory.spawn(client);
        Game.attachObject(object);

        client.on('move', function (to) {
            Game.moveObject(client, to);
        });

        client.on('disconnect', function () {
            Game.disconnect(client);
        });
    });

    setInterval(Game.serverLoop, 60);
};