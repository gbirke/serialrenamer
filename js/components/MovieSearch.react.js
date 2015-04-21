var React 		 = require('react');
var SearchField  = require('./SearchField.react');
var MovieResult  = require('./MovieResult.react');
var MovieActions = require('../actions/MovieActions');
var MovieStore   = require('../stores/MovieStore');

function getMovieState() {
	return {
		movies: MovieStore.getMovies(),
        seasons: MovieStore.getSeasons()
	};
}

var MovieSearch = React.createClass({

	getInitialState: function() {
        return getMovieState();
    },

    componentDidMount: function() {
        MovieStore.addChangeListener(this._onChange);
    },

    componentWillUnmount: function() {
        MovieStore.removeChangeListener(this._onChange);
    },

    /**
    * Event handler for 'change' events coming from the MovieStore
    */
    _onChange: function() {
        this.setState(getMovieState());
    },

	render: function() {

		var movies = this.state.movies.map(function(movie){
	        return (<MovieResult key={movie.id} value={movie.id} label={movie.name} />);
	    });

        var seasonData = this.state.seasons,
            seasons = Object.keys(seasonData).map(function(seasonId){
            return (<option key={seasonId} value={seasonId}>{seasonData[seasonId]}</option>);
        });

		return (
			<div className="row">
				<div className="col-sm-12 form-inline">
					<div className="form-group">
						<label htmlFor="q">Search: </label>
						<SearchField className="form-control" id="q" size={80} onSave={this._onSearch} />
					</div>
				</div>
				<div className="col-sm-6 form-group">
					<select size="5" name="series" id="series" className="form-control" onChange={this._onMovieChange}>
						{movies}
					</select>
				</div>
				<div className="col-sm-6 form-group" onChange={this._onSeasonSelect}>
					<select size="5" name="season" id="season" className="form-control">
						{seasons}
					</select>
				</div>
			</div>

		);
	},

	_onSearch: function(name) {
		MovieActions.searchMovies(name);
		return false; // Avoid sending the form
	},

	_onMovieChange: function(event) {
		var sel = event.target,
			movieId = sel.options[sel.selectedIndex].value;
		if (movieId) {
			MovieActions.selectMovie(movieId);
		}

	},

	_onSeasonSelect: function(event) {
		var sel = event.target,
			season = sel.options[sel.selectedIndex].value;
		MovieActions.selectSeason(season);
	}

});

module.exports = MovieSearch;