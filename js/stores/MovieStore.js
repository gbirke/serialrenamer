var AppDispatcher  = require('../dispatcher/AppDispatcher');
var MovieActions   = require('../actions/MovieActions');
var MovieConstants = require('../constants/MovieConstants');
var StoreMixin     = require('./StoreMixin');
var assign        = require('object-assign');

var _movies = [];

function searchMovies(name) {
	var xhr = new XMLHttpRequest(),
		params = "q="+encodeURIComponent(name);
    xhr.open('POST', '/search', true);
    xhr.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
	xhr.setRequestHeader("Content-length", params.length);
	xhr.setRequestHeader("Connection", "close");
    xhr.onreadystatechange = function () {
        if (xhr.readyState == 4) {
            var responseJSON = JSON.parse(xhr.responseText);
            if (xhr.status == 200) {
            	// TODO send search_result event and handle it in Store
                console.log("Success!");
                console.log(responseJSON);

            }
            else {
            	// TODO error handler
                console.log(responseJSON);
            }
        }
    };
    xhr.send(params);
}

var MovieStore = assign({}, StoreMixin, {
	getMovies: function() {
		return _movies;
	}
});

MovieStore.dispatchToken = AppDispatcher.register(function(payload) {
    var action = payload.action;
    switch (action.actionType) {
    	case MovieConstants.MOVIE_SEARCH:
    		searchMovies(action.name)
    		return true;
        default:
            return true;
    }
    MovieStore.emitChange();
    return true;
});

module.exports = MovieStore;