var React 		 = require('react');
var SearchField  = require('./SearchField.react');
var MovieActions = require('../actions/MovieActions');
var MovieStore   = require('../stores/MovieStore');

function getMovieState() {
	return {
		movies: MovieStore.getMovies()
	};
}

var MovieSearch = React.createClass({

	render: function() {
		return (
			<div className="row">
				<div className="col-sm-12 form-inline">
					<div className="form-group">
						<label htmlFor="q">Search: </label>
						<SearchField className="form-control" id="q" size={80} onSave={this._onSearch} />
					</div>
				</div>
				<div className="col-sm-6 form-group">
					<select size="5" name="series" id="series" className="form-control">
						<option>Castle</option>
						<option>Castles in England</option>
					</select>
				</div>
				<div className="col-sm-6 form-group">
					<select size="5" name="season" id="season" className="form-control">
						<option>Season 1</option>
						<option>Season 2</option>
					</select>
				</div>
			</div>

		);
	},

	_onSearch: function(name) {
		MovieActions.searchMovies(name);
		return false; // Avoid sending the form
	}

});

module.exports = MovieSearch;