var EventEmitter  = require('events').EventEmitter;
var assign        = require('object-assign');


var CHANGE_EVENT = 'change';
var StoreMixin = assign({}, EventEmitter.prototype, {
	emitChange: function() {
        this.emit(CHANGE_EVENT);
    },

    /**
    * @param {function} callback
    */
    addChangeListener: function(callback) {
        this.on(CHANGE_EVENT, callback);
    },

    /**
    * @param {function} callback
    */
    removeChangeListener: function(callback) {
        this.removeListener(CHANGE_EVENT, callback);
    }
});

module.exports = StoreMixin;
