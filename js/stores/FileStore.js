var AppDispatcher = require('../dispatcher/AppDispatcher');
var FileConstants = require('../constants/FileConstants');
var EventEmitter = require('events').EventEmitter;
var assign = require('object-assign');

var CHANGE_EVENT = 'change';

var _files = [];

function setFiles(files) {
    _files = files;
}

var FileStore = assign({}, EventEmitter.prototype, {
    getAll: function() {
        return _files;
    },

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

FileStore.dispatchToken = AppDispatcher.register(function(payload) {
    var action = payload.action;
    switch (action.actionType) {
        case FileConstants.FILES_LOADED:
            setFiles(action.files);
            break;
    }
    FileStore.emitChange();
    return true;
});

module.exports = FileStore;