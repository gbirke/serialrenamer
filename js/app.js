var React = require('react');
var FileBrowser = require('./components/FileBrowser.react');
var MovieSearch = require('./components/MovieSearch.react');
var FileActions = require('./actions/FileActions');

var mainElement = document.getElementById("main");

React.render(
	<div>
		<MovieSearch />
    	<FileBrowser />
    </div>, 
    mainElement
);

FileActions.loadFiles(JSON.parse(main.dataset.files));