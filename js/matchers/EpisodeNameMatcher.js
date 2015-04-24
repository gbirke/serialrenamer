var Fuse = require('fuse.js');

function MatchHelper(files) {
	this.episodeFiles = {};
	this.episodeScores = {};
	var fuseOptions = {
			keys: ["name"],
			id: "id",
			includeScore: true
		};
	this.fuse = new Fuse(files, fuseOptions);
}

MatchHelper.prototype.matchEpisode = function(episode) {
	var matches = this.fuse.search(episode.name),
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
	match: function(files, episodes) {
		var matcher = new MatchHelper(files);		
		for (var e in episodes) {
			matcher.matchEpisode(episodes[e]);
		}
		return matcher.episodeFiles;
	},
	
};

module.exports = EpisodeNameMatcher;