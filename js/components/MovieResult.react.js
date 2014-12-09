var React = require('react');
var ReactPropTypes = React.PropTypes;

var MovieResult = React.createClass({

	propTypes: {
        value: ReactPropTypes.number.isRequired,
        label: ReactPropTypes.string.isRequired
    },

	render: function() {
		return (
			<option value={this.props.value}>{this.props.label}</option>
		);
	}

});

module.exports = MovieResult;