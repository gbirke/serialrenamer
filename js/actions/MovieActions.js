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

  handleMovieSearchResult: function(result) {
    AppDispatcher.handleServerAction({
      actionType: MovieConstants.MOVIE_SEARCH_RESULT,
      movies: result
    });
  }

};

module.exports = MovieActions;