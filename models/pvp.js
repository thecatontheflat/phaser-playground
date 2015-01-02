module.exports = {
    fight: function () {
        for (var i = 0; i < arguments.length; i++) {
            var object = arguments[i];
            object.fight();
        }
    }
};