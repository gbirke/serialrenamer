var MovieConstants = require('../constants/MovieConstants');
var AppDispatcher  = require('../dispatcher/AppDispatcher');
var NameMatcher    = require('../matchers/EpisodeNameMatcher');
var NumberMatcher  = require('../matchers/EpisodeNumberMatcher');
var FileStore      = require('./FileStore');
var MovieStore     = require('./MovieStore');
var StoreMixin     = require('./StoreMixin');
var assign         = require('object-assign');

var _matches = {};

function resetFiles() {
    var files = FileStore.getFiles();
    console.log(files);
	_matches = files.reduce(function(o, file) {
		o[file.id] = null;
        return o;
	}, {});
};

function seasonSelect(season) {
    var files = FileStore.getFiles(),
        episodes = MovieStore.getEpisodesForSeason(season)
        ;
    _matches = assign(
        {},
        NameMatcher.match(files, episodes),
        NumberMatcher.match(files, episodes)
    );
}


/**
 * The MatchStore stores the filename => episode id assignments.
 * It tries automatic matching whenever a season is selected
 */
var MatchStore = assign({}, StoreMixin, {
    getMatches: function() {
        return _matches;
    }

});

FileStore.addChangeListener(resetFiles);

MatchStore.dispatchToken = AppDispatcher.register(function(payload) {
    var action = payload.action;
    switch (action.actionType) {
        case MovieConstants.MOVIE_SELECT_SEASON:
            seasonSelect(action.season);
            break;
        default:
            return true;
    }
    MatchStore.emitChange();
    return true;
});


module.exports = MatchStore;

