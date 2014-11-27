var React = require('react');
var FileStore = require('../stores/FileStore');
var FileEntry = require('./FileEntry.react');
var FolderEntry = require('./FolderEntry.react');

function getFileState() {
    return {
        files: FileStore.getFiles(),
        folders: FileStore.getFolders()
    };
}

var FileBrowser = React.createClass({

    getInitialState: function() {
        return getFileState();
    },

    componentDidMount: function() {
        FileStore.addChangeListener(this._onChange);
    },

    componentWillUnmount: function() {
        FileStore.removeChangeListener(this._onChange);
    },

    /**
    * Event handler for 'change' events coming from the TodoStore
    */
    _onChange: function() {
        this.setState(getFileState());
    },

  /**
   * @return {object}
   */
  render: function() {
    var files = this.state.files.map(function(file){
        return (<FileEntry key={file.name} entry={file} />)
    });
    var folders = this.state.folders.map(function(folder){
        return (<FolderEntry key={folder.name} entry={folder} />)
    });
    return (
      <section className="filelist">
        {folders}
        {files}
      </section>
    );
  },

});

module.exports = FileBrowser;