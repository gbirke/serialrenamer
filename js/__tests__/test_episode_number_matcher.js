jest.dontMock('../matchers/EpisodeNumberMatcher');

describe('EpisodeNumberMatcher', function() {
	it('matches episode and season numbers', function() {
		var EpisodeNumberMatcher = require('../matchers/EpisodeNumberMatcher');
		var files = [
			{id:"my/S03E1 Foo.mkv", name:"S03E1 Foo.mkv", type:"f"},
			{id:"my/S03E2 Bar.mkv", name:"S03E2 Bar.mkv", type:"f"},
			{id:"my/S03E3 Baz.mkv", name:"S03E3 Baz.mkv", type:"f"},
		];
		var episodes = {
			"1": {id: "1", number: 1, season: 3}
		};
		var result = EpisodeNumberMatcher.match(files, episodes);
		expect(result).toEqual({"my/S03E1 Foo.mkv":"1"});
	});

	it('matches multiple mixed case episode and season numbers', function() {
		var EpisodeNumberMatcher = require('../matchers/EpisodeNumberMatcher');
		var files = [
			{id:"my/S03E1 Foo.mkv", name:"S03E1 Foo.mkv", type:"f"},
			{id:"my/s03e2 Bar.mkv", name:"s03e2 Bar.mkv", type:"f"},
			{id:"my/S03E3 Baz.mkv", name:"S03E3 Baz.mkv", type:"f"},
		];
		var episodes = {
			"1": {id: "1", number: 1, season: 3},
			"5": {id: "5", number: 2, season: 3},
			"7": {id: "7", number: 3, season: 3}
		};
		var result = EpisodeNumberMatcher.match(files, episodes);
		expect(result).toEqual({
			"my/S03E1 Foo.mkv": "1",
			"my/s03e2 Bar.mkv": "5",
			"my/S03E3 Baz.mkv": "7"
		});
	});

	it('matches with and without leading zeroes', function() {
		var EpisodeNumberMatcher = require('../matchers/EpisodeNumberMatcher');
		var files = [
			{id:"my/S03E01 Foo.mkv", name:"S03E01 Foo.mkv", type:"f"},
			{id:"my/S3E2 Bar.mkv", name:"S3E2 Bar.mkv", type:"f"},
			{id:"my/S03E13 Baz.mkv", name:"S03E13 Baz.mkv", type:"f"},
		];
		var episodes = {
			"1": {id: "1", number: 1, season: 3},
			"5": {id: "5", number: 2, season: 3},
			"7": {id: "7", number: 13, season: 3}
		};
		var result = EpisodeNumberMatcher.match(files, episodes);
		expect(result).toEqual({
			"my/S03E01 Foo.mkv": "1",
			"my/S3E2 Bar.mkv": "5",
			"my/S03E13 Baz.mkv": "7"
		});
	});

});