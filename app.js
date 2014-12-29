var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');

var routes = require('./routes/index');
var users = require('./routes/users');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

// uncomment after placing your favicon in /public
//app.use(favicon(__dirname + '/public/favicon.ico'));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', routes);
app.use('/users', users);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
});

// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
    app.use(function (err, req, res, next) {
        res.status(err.status || 500);
        res.render('error', {
            message: err.message,
            error: err
        });
    });
}

// production error handler
// no stacktraces leaked to user
app.use(function (err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
        message: err.message,
        error: {}
    });
});

var server = app.listen(3000, function () {

    var host = server.address().address;
    var port = server.address().port;

    console.log('Example app listening at http://%s:%s', host, port)

});

var io = require('socket.io').listen(server);


var objects = [];
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

    return {
        id: counter,
        x: 0, y: 0,
        toX: 0, toY: 0,
        size: 40,
        fillStyle: generateRandomColor()
    };
};

var Game = {
    objects: []
};

io.sockets.on('connection', function (client) {
    var object = spawnObject();
    client['object_id'] = object.id;
    Game.objects[object.id] = object;
    var speed = 3;

    var serverLoop = function () {
        Game.objects.forEach(function (object) {
            if (object.x < object.toX) {
                object.x += speed;
            }

            if (object.x > object.toX) {
                object.x -= speed;
            }

            if (object.y < object.toY) {
                object.y += speed;
            }

            if (object.y > object.toY) {
                object.y -= speed;
            }
        });

        client.volatile.emit('render', Game.objects);
    };

    setInterval(serverLoop, 60);

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


module.exports = app;
