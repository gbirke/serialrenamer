var AppDispatcher  = require('../dispatcher/AppDispatcher');
var MovieActions   = require('../actions/MovieActions');
var MovieConstants = require('../constants/MovieConstants');
var StoreMixin     = require('./StoreMixin');
var assign         = require('object-assign');

var _movies = [];
var _currentMovie = {};

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
                if (!responseJSON) {
                    return;
                }
                if (responseJSON.constructor !== Array) {
                    console.log("response is not an array!");
                    console.log(responseJSON);
                    return;
                }
                console.log(responseJSON);
                MovieActions.handleMovieSearchResult(responseJSON);
            }
            else {
                // TODO error handler
                console.log(responseJSON);
            }
        }
    };
    xhr.send(params);
}

function setMovies(movies) {
    _movies = movies;
}

var MovieStore = assign({}, StoreMixin, {
    getMovies: function() {
        return _movies;
    },
    getCurrentMovie: function() {
        return _currentMovie;
    }
});

MovieStore.dispatchToken = AppDispatcher.register(function(payload) {
    var action = payload.action;
    switch (action.actionType) {
        case MovieConstants.MOVIE_SEARCH:
            searchMovies(action.name);
            return true;
        case MovieConstants.MOVIE_SEARCH_RESULT:
            setMovies(action.movies);
            break;
        case MovieConstants.MOVIE_SELECT:
            console.log("TODO getMovieInfo")
            console.log(action.movieId);
            // TODO getMovieInfo
            return true;
        case MovieConstants.MOVIE_INFO_LOADED:
            // TODO setCurrentMovie
        default:
            return true;
    }
    MovieStore.emitChange();
    return true;
});

module.exports = MovieStore;