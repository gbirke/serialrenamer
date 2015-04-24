var Fuse = require('fuse.js');
var assign = require('object-assign');

function MatchHelper(files, fuseOptions) {
	fuseOptions = fuseOptions ? fuseOptions : {}
	this.episodeFiles = {};
	this.episodeScores = {};
	this.fuseOptions = assign(fuseOptions, {
			keys: ["name"],
			id: "id",
			includeScore: true
		});
	this.fuse = new Fuse(files, this.fuseOptions);
}

MatchHelper.prototype.matchEpisode = function(episode) {
	var name = episode.name.substr(0, this.fuse.options.maxPatternLength),
		matches = this.fuse.search(name),
		fileId, fileScore;
	if (!matches || matches.length < 1) {
		return;
	}
	fileId = matches[0].item;
	fileScore = matches[0].score;
	if (this.scoreForFileIsBetter(fileId, fileScore)) {
		this.episodeScores[fileId] = fileScore;
		this.episodeFiles[fileId] = episode.id;
	}
};

MatchHelper.prototype.scoreForFileIsBetter = function(fileId, fileScore) {
	return !(fileId in this.episodeScores) || this.episodeScores[fileId] > fileScore;
};

var EpisodeNameMatcher = {
	fuseMaxPatternLength: 64, // global option is not the best here, but will do for the time being
	match: function(files, episodes) {
		var matcher = new MatchHelper(files, {maxPatternLength: this.fuseMaxPatternLength});		
		for (var e in episodes) {
			matcher.matchEpisode(episodes[e]);
		}
		return matcher.episodeFiles;
	},
	
};

module.exports = EpisodeNameMatcher;