var React = require('react');
var ReactPropTypes = React.PropTypes;

var FileEntry = React.createClass({

    propTypes: {
        entry: ReactPropTypes.object.isRequired
    },

    render: function() {
        return (
            <div>
                {this.props.entry.name}
            </div>
        );
    }
});

module.exports = FileEntry;