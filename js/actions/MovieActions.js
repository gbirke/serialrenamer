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
      actionType: MovieConstants.MOVIE_SELECT_MOVIE,
      movieId: movieId
    });
  },

  selectSeason: function(season) {
    AppDispatcher.handleViewAction({
      actionType: MovieConstants.MOVIE_SELECT_SEASON,
      season: season
    });
  },

  handleMovieSearchResult: function(result) {
    AppDispatcher.handleServerAction({
      actionType: MovieConstants.MOVIE_SEARCH_RESULT,
      movies: result
    });
  },

  episodeInfoLoaded: function(episodeInfo) {
    AppDispatcher.handleServerAction({
      actionType: MovieConstants.MOVIE_EPISODE_INFO_LOADED,
      episodes: episodeInfo
    });
  }

};

module.exports = MovieActions;