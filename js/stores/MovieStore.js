var AppDispatcher  = require('../dispatcher/AppDispatcher');
var MovieActions   = require('../actions/MovieActions');
var MovieConstants = require('../constants/MovieConstants');
var StoreMixin     = require('./StoreMixin');
var assign         = require('object-assign');

var _movies = [];
var _currentMovie = {};
var _episodes = {}
var _seasons = {}

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

function getEpisodes(movieId) {
    var xhr = new XMLHttpRequest();
    xhr.open('GET', '/series/' + movieId + '/episodes', true);
    xhr.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
    xhr.onreadystatechange = function () {
        if (xhr.readyState == 4) {
            var responseJSON = JSON.parse(xhr.responseText);
            if (xhr.status == 200) {
                if (!responseJSON) {
                    return;
                }
                if (!responseJSON.episodes) {
                    console.log("response has no episode info!");
                    console.log(responseJSON);
                    return;
                }
                MovieActions.episodeInfoLoaded(responseJSON.episodes);
            }
            else {
                // TODO error handler
                console.log(responseJSON);
            }
        }
    };
    xhr.send();
}

function storeEpisodeInfo(episodes) {
    _episodes = {};
    _seasons = {};
    var id, episode, season;
    for (id in episodes) {
        episode = episodes[id];
        if (episode.hasOwnProperty("season") && (typeof episode.season != "undefined") && episode.season !== null) {
            season = episode.season;
        }
        else {
            console.log("episode has no season");
            console.log(episode);
        }
        _seasons[season] = "Season " + season;
        if (!_episodes[season]) {
            _episodes[season] = {};
        }
        _episodes[season][episode.id] = episode;
    }
}

function setCurrentMovie(movieId) {
    for(var i=0; i<_movies.length; i++) {
        if (_movies[i].id == movieId ) {
            _currentMovie = _movies[i];
            return _currentMovie;
        }
    }
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
    },
    getSeasons: function() {
        return _seasons;
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
            if ( setCurrentMovie(action.movieId)) {
                getEpisodes(action.movieId);
            }
            return true;
        case MovieConstants.MOVIE_EPISODE_INFO_LOADED:
            storeEpisodeInfo(action.episodes);
            break;
        default:
            return true;
    }
    MovieStore.emitChange();
    return true;
});

module.exports = MovieStore;