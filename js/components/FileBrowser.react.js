var React = require('react');
var FileStore = require('../stores/FileStore');
var FileEntry = require('./FileEntry.react');
var FolderEntry = require('./FolderEntry.react');
var CurrentPath = require('./CurrentPath.react');

function getFileState() {
    return {
        files: FileStore.getFiles(),
        folders: FileStore.getFolders(),
        currentPath: FileStore.getCurrentPath()
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
        return (<FileEntry key={file.id} entry={file} />)
    });
    var folders = this.state.folders.map(function(folder){
        return (<FolderEntry key={folder.id} entry={folder} />)
    });
    return (
        <div className="row">
            <div className="col-sm-6 file-browser">
                <CurrentPath path={this.state.currentPath} />  
                <section className="filelist">
                    {folders}
                    {files}
                </section>
            </div>
        </div>
    );
  },

});

module.exports = FileBrowser;