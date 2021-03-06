jest.dontMock('../matchers/EpisodeNameMatcher');
jest.dontMock('fuse.js');

describe('EpisodeNameMatcher', function() {
	it('matches plain episode names', function() {
		var EpisodeNameMatcher = require('../matchers/EpisodeNameMatcher');
		var files = [
			{id:"my/Foo.mkv", name:"Foo.mkv", type:"f"},
			{id:"my/Bar.mkv", name:"Bar.mkv", type:"f"},
			{id:"my/Baz.mkv", name:"Baz.mkv", type:"f"},
		];
		var episodes = {
			"1": {id: "1", name: "Bar"}
		};
		var result = EpisodeNameMatcher.match(files, episodes);
		expect(result).toEqual({"my/Bar.mkv":"1"});
	});

	it('matches multiple episodes', function() {
		var EpisodeNameMatcher = require('../matchers/EpisodeNameMatcher');
		var files = [
			{id:"my/Foo.mkv", name:"Foo.mkv", type:"f"},
			{id:"my/Bar.mkv", name:"Bar.mkv", type:"f"},
			{id:"my/Baz.mkv", name:"Baz.mkv", type:"f"},
		];
		var episodes = {
			"1": {id: "1", name: "Bar"},
			"2": {id: "2", name: "Baz"},
			"3": {id: "3", name: "Foo"}
		};
		var result = EpisodeNameMatcher.match(files, episodes);
		expect(result).toEqual(
			{
				"my/Bar.mkv": "1",
				"my/Baz.mkv": "2",
				"my/Foo.mkv": "3",
			}
		);
	});

	it('returns the best match when there are more episodes than files', function() {
		var EpisodeNameMatcher = require('../matchers/EpisodeNameMatcher');
		var files = [
			{id:"my/Bar.mkv", name:"Bar.mkv", type:"f"}
		];
		var episodes = {
			"1": {id: "1", name: "Bar"},
			"2": {id: "2", name: "Baz"},
			"3": {id: "3", name: "Foo"}
		};
		var result = EpisodeNameMatcher.match(files, episodes);
		expect(result).toEqual(
			{
				"my/Bar.mkv": "1"
			}
		);
	});

	it('matches episode name with additional info', function() {
		var EpisodeNameMatcher = require('../matchers/EpisodeNameMatcher');
		var files = [
			{id:"my/The Simpsons - Bart Carny - 320p.mkv", name:"The Simpsons - Bart Carny - 320p.mkv", type:"f"},
			{id:"my/The Simpsons - Bart Star - 320p.mkv", name:"The Simpsons - Bart Star - 320p.mkv", type:"f"},
		];
		var episodes = {
			"1": {id: "1", name: "Bart Star"}
		};
		var result = EpisodeNameMatcher.match(files, episodes);
		expect(result).toEqual({"my/The Simpsons - Bart Star - 320p.mkv": "1"});
	});

	it('truncates episode names that are too long', function() {
		var EpisodeNameMatcher = require('../matchers/EpisodeNameMatcher');
		EpisodeNameMatcher.fuseMaxPatternLength = 16;
		var files = [
			{id:"my/VeryLongFileName.mkv", name:"VeryLongFileName.mkv", type:"f"},
			{id:"my/AnotherLongFileName.mkv", name:"AnotherLongFileName.mkv", type:"f"},
		];
		var episodes = {
			"1": {id: "1", name: "VeryLongFileName With Extra Words That Will Be Truncated"}
		};

		var result = EpisodeNameMatcher.match(files, episodes);
		expect(result).toEqual({"my/VeryLongFileName.mkv": "1"});
	});


});