var React = require('react');
var FileBrowser = require('./components/FileBrowser.react');
var FileActions = require('./actions/FileActions');

React.render(
    <FileBrowser />, 
    document.getElementById("main")
);

// load dummy data
FileActions.loadFiles([
    {name:"usr"},
    {name:"var"}
]);