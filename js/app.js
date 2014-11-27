var React = require('react');
var FileBrowser = require('./components/FileBrowser.react');
var FileActions = require('./actions/FileActions');

var mainElement = document.getElementById("main");

React.render(
    <FileBrowser />, 
    mainElement
);

FileActions.loadFiles(JSON.parse(main.dataset.files));