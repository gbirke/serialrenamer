"use strict";

var Fuse = require('fuse.js');

var EpisodeNameMatcher = {
	match: function(files, episodes) {
		var episodeFiles = {},
			fuseOptions = {
				keys: ["name"], 
				id: "id",
				includeScore: true
			},
			f = new Fuse(files, fuseOptions),
			e, bestMatches;
		for (e in episodes) {
			bestMatches = f.search(episodes[e].name);
			if (bestMatches && bestMatches.length > 0) {
				episodeFiles[bestMatches[0].item] = e;
			}
		}
		return episodeFiles;
	},
	
};

module.exports = EpisodeNameMatcher;