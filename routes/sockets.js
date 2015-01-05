module.exports = function (io) {
    var players = [];

    function Player (id, x, y) {
        this.id = id;
        this.x = x;
        this.y = y;
    }

    io.sockets.on('connection', function (client) {
        io.emit('new-player', {id: client.id});

        client.on('phaser-loaded', function () {
            players.push(new Player(client.id, 0, 0));
            client.emit('start', {id: client.id, players: players});
        });

        client.on('move', function (data) {
            data.id = client.id;
            io.emit('move', data);
        });

        client.on('sync', function (data) {
            players.forEach(function (player) {
                data.forEach(function (clientPlayer) {
                    if (player.id == clientPlayer.id) {
                        player.x = clientPlayer.x;
                        player.y = clientPlayer.y;
                    }
                });
            });
        });

        client.on('disconnect', function () {
            var newPlayers = [];
            players.forEach(function (player) {
                if (player.id != client.id) {
                    newPlayers.push(player);
                }
            });

            players = newPlayers;

            io.emit('remove', {id: client.id});
        });
    });
};
