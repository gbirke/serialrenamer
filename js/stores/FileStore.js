var AppDispatcher = require('../dispatcher/AppDispatcher');
var FileConstants = require('../constants/FileConstants');
var FileActions   = require('../actions/FileActions');
var StoreMixin    = require('./StoreMixin');
var assign        = require('object-assign');

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
            var responseJSON = JSON.parse(xhr.responseText);
            if (xhr.status == 200) {
                _currentPath = path;
                FileActions.loadFiles(responseJSON);    
            }
            else {
                // TODO error handler
                console.log(responseJSON);
            }
        }
    };
    xhr.send();
    // TODO: Loading indicator event?
}

var FileStore = assign({}, StoreMixin, {
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