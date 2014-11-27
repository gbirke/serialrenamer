var React = require('react');
var ReactPropTypes = React.PropTypes;
var FileActions = require('../actions/FileActions');

var FileEntry = React.createClass({

    propTypes: {
        entry: ReactPropTypes.object.isRequired
    },

    render: function() {
        return (
            <div className="folder-entry">
                <a href="#" onClick={this._onChangePath} >{this.props.entry.name}</a>
            </div>
        );
    },

    _onChangePath: function() {
        var path = this.props.entry.path,
            newPath = this.props.entry.id;
        if (this.props.entry.name == "..") {
            if (path.indexOf("/") == -1) {
                newPath = "";
            }
            else {
                newPath = path.substr(0, path.lastIndexOf("/"));
            }
        }
        FileActions.changePath(newPath);
    }
});

module.exports = FileEntry;