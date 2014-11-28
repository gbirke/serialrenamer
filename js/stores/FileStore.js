var AppDispatcher = require('../dispatcher/AppDispatcher');
var FileConstants = require('../constants/FileConstants');
var FileActions   = require('../actions/FileActions');
var EventEmitter  = require('events').EventEmitter;
var assign        = require('object-assign');

var CHANGE_EVENT = 'change';

var _files = [];
var _currentPath = "";

function setFiles(files) {
    _files = files;
}

function changePath(path) {
    var xhr = new XMLHttpRequest();
    xhr.open('GET', '/path/' + path, true);
    xhr.onreadystatechange = function () {
        if (xhr.readyState == 4) {
            _currentPath = path;
            FileActions.loadFiles(JSON.parse(xhr.responseText));
        }
    };
    xhr.send();
    // TODO: Loading indicator event?
}

var FileStore = assign({}, EventEmitter.prototype, {
    getAll: function() {
        return _files;
    },

    getFiles: function() {
        return _files.filter(function(file) { return file.type == "f"; });
    },

    getFolders: function() {
        return _files.filter(function(file) { return file.type == "d"; });
    },

    getCurrentPath: function() {
        return _currentPath;
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
        case FileConstants.FILES_CHANGE_PATH:
            changePath(action.path);
            return true;
        default:
            return true;
    }
    FileStore.emitChange();
    return true;
});

module.exports = FileStore;