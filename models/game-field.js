var pvp = require('./pvp');

module.exports = {
    objects: [],

    checkCollision: function (currentObject, currentObjectNewX, currentObjectNewY) {
        var collides = false;

        this.objects.forEach(function (object) {
            if (object.id != currentObject.id) {
                var dx = (currentObjectNewX + currentObject.collisionRadius) - (object.x + object.collisionRadius);
                var dy = (currentObjectNewY + currentObject.collisionRadius) - (object.y + object.collisionRadius);
                var distance = Math.sqrt(dx * dx + dy * dy);

                if (distance < currentObject.collisionRadius + object.collisionRadius) {
                    pvp.fight(object, currentObject);
                    collides = true;
                }
            }
        });

        return collides;
    }
};
