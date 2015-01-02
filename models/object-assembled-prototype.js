var _ = require('underscore');

var GameObjectMovementPrototype = require('./object-movement-prototype');
var GameObjectPrototype = require('./object-main-prototype');

_.extend(GameObjectPrototype, GameObjectMovementPrototype);

module.exports = GameObjectPrototype;