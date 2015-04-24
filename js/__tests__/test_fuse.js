
// An exploratory test of the fuse library

jest.dontMock('fuse.js');

describe('Fuse', function() {
	it('can search something', function() {
		var Fuse = require('fuse.js');
		var files = [
			{id:"my/Foo.mkv", name:"Foo.mkv", type:"f"},
			{id:"my/Bar.mkv", name:"Bar.mkv", type:"f"},
			{id:"my/Baz.mkv", name:"Baz.mkv", type:"f"},
		];
		var fuseOptions = {
				keys: ["name"], 
				id: "id",
				includeScore: true
			};
		var f = new Fuse(files, fuseOptions)
		var result = f.search("Bar");
		expect(result).toEqual([{item: "my/Bar.mkv", score: 0}, {item: "my/Baz.mkv", score:1/3}]);	
	});
});