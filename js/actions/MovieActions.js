var AppDispatcher = require('../dispatcher/AppDispatcher');
var MovieConstants = require('../constants/MovieConstants');

var MovieActions = {

  /**
   * @param  {Array} Movies
   */
  searchMovies: function(name) {
    AppDispatcher.handleViewAction({
      actionType: MovieConstants.MOVIE_SEARCH,
      name: name
    });
  },

  selectMovie: function(movieId) {
    AppDispatcher.handleViewAction({
      actionType: MovieConstants.MOVIE_SELECT,
      movieId: movieId
    });
  },

  handleMovieSearchResult: function(result) {
    AppDispatcher.handleServerAction({
      actionType: MovieConstants.MOVIE_SEARCH_RESULT,
      movies: result
    });
  },

  movieInfoLoaded: function(movieInfo) {
    AppDispatcher.handleServerAction({
      actionType: MovieConstants.MOVIE_INFO_LOADED,
      movies: result
    });
  }

};

module.exports = MovieActions;