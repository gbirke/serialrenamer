var React = require('react');
var FileStore = require('../stores/FileStore');

function getFileState() {
    return {
        files: FileStore.getAll()
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
        return (<div key={file.name}>{file.name}</div>)
    });
    return (
      <section className="filelist">
        {files}
      </section>
    );
  },

});

module.exports = FileBrowser;