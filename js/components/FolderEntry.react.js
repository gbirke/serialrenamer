var React = require('react');
var ReactPropTypes = React.PropTypes;
var FileActions = require('../actions/FileActions');

var FileEntry = React.createClass({

    propTypes: {
        entry: ReactPropTypes.object.isRequired
    },

    render: function() {
        return (
            <div>
                <a href="#" onClick={this._onChangePath} >{this.props.entry.name}</a>
            </div>
        );
    },

    _onChangePath: function() {
        FileActions.getPath(this.props.entry.id)
    }
});

module.exports = FileEntry;