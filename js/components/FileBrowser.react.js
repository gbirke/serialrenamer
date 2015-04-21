var React = require('react');
var FileStore = require('../stores/FileStore');
var MovieStore = require('../stores/MovieStore');
var FileRenamePreview = require('./FileRenamePreview.react');
var FolderEntry = require('./FolderEntry.react');
var CurrentPath = require('./CurrentPath.react');

function getFileState() {
    return {
        files: FileStore.getFiles(),
        folders: FileStore.getFolders(),
        currentPath: FileStore.getCurrentPath(),
        episodes: MovieStore.getEpisodesForCurrentSeason()
    };
}

var FileBrowser = React.createClass({

    getInitialState: function() {
        return getFileState();
    },

    componentDidMount: function() {
        FileStore.addChangeListener(this._onChange);
        MovieStore.addChangeListener(this._onChange);
    },

    componentWillUnmount: function() {
        FileStore.removeChangeListener(this._onChange);
        MovieStore.removeChangeListener(this._onChange);
    },

    /**
    * Event handler for 'change' events coming from the FileStore
    */
    _onChange: function() {
        this.setState(getFileState());
    },

  /**
   * @return {object}
   */
  render: function() {
    
    var folders = this.state.folders.map(function(folder){
        return (<FolderEntry key={folder.id} entry={folder} />)
    });
    return (
        <div className="row">
            <div className="col-sm-3 file-browser">
                <div className="panel panel-default">
                    <div className="panel-body">
                        <CurrentPath path={this.state.currentPath} />  
                        <section className="filelist">
                            {folders}
                        </section>
                    </div>
                </div>
            </div>
            <div className="col-sm-9">
                <FileRenamePreview files={this.state.files} episodes={this.state.episodes} />
            </div>
        </div>
    );
  },

});

module.exports = FileBrowser;