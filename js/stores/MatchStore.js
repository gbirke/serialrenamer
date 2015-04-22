var MovieConstants = require('../constants/MovieConstants');
var AppDispatcher  = require('../dispatcher/AppDispatcher');
var FileStore      = require('./FileStore');
var MovieStore     = require('./MovieStore');
var StoreMixin     = require('./StoreMixin');
var assign         = require('object-assign');
var Fuse           = require('fuse.js');

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
        episodeFiles = {} // episodeFiles holds episode_id => [file_ids]
    ; 
    // TODO check file name for S01E07 patterns. If those patterns exist for the majority of files, build _matches and return

    // TODO If there is no pattern, use fuse.js fuzzy matching on the file name as follows:
    //      1. for each episode, use it as a search pattern for files, append the best match to episodeFiles
    //      2. build _matches from episodeFiles 

    // Just some testing stuff
	console.log("react to seasonSelect in MatchStore ")
	console.log(MovieStore.getEpisodesForSeason(season));
	console.log(_matches);
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

