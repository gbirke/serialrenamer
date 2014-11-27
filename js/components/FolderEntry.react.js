var React = require('react');
var ReactPropTypes = React.PropTypes;

var FileEntry = React.createClass({

    propTypes: {
        entry: ReactPropTypes.object.isRequired
    },

    render: function() {
        return (
            <div>
                <a href="#">{this.props.entry.name}</a>
            </div>
        );
    }
});

module.exports = FileEntry;