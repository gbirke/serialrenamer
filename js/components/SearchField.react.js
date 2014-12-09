var React = require('react');
var ReactPropTypes = React.PropTypes;

var ENTER_KEY_CODE = 13;

var SearchField = React.createClass({

	propTypes: {
	    className: ReactPropTypes.string,
	    id: ReactPropTypes.string,
	    size: ReactPropTypes.number,
	    onSave: ReactPropTypes.func.isRequired,
  	},

	getInitialState: function() {
	    return {
	      	value: ''
	    };
	},

	render: function() {
		return (
			<input
				className={this.props.className}
		        id={this.props.id}
		        name={this.props.id}
		        type="search"
		        size={this.props.size}
		        onChange={this._onChange}
		        onKeyDown={this._onKeyDown}
		        value={this.state.value}
		        autoFocus={true}
		    />
		);
	},

  /**
   * Invokes the callback passed in as onSave, allowing this component to be
   * used in different ways.
   */
  _save: function() {
    this.props.onSave(this.state.value);
  },

  /**
   * @param {object} event
   */
  _onChange: function(/*object*/ event) {
    this.setState({
      value: event.target.value
    });
  },

  /**
   * @param  {object} event
   */
  _onKeyDown: function(event) {
    if (event.keyCode === ENTER_KEY_CODE) {
      this._save();
    }
  }

});

module.exports = SearchField;