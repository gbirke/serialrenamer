var EpisodeNumberMatcher = {
	match: function(files, episodes) {
		var rx = /s0*(\d+)e0*(\d+)/i,
			episodeIndex = {},
			episodeFiles = {},
			e, i, idx, matches;
		for (e in episodes) {
			idx = "S" + episodes[e].season + "E" + episodes[e].number;
			episodeIndex[idx] = e;
		}
		for (i=0; i < files.length; i++) {
			matches = rx.exec(files[i].name);
			if (!matches) {
				continue;
			}
			idx = "S" + matches[1] + "E" + matches[2];
			if (idx in episodeIndex) {
				episodeFiles[files[i].id] = episodeIndex[idx];
			}
		}
		return episodeFiles;
	}
};

module.exports = EpisodeNumberMatcher;