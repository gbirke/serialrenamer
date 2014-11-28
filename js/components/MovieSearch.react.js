var React = require('react');

var MovieSearch = React.createClass({

	render: function() {
		return (
			<div className="row">
				<div className="col-sm-12">
					<form action="#" method="post" className="form-inline">
						<div className="form-group">
							<label for="q">Search: </label>
							<input className="form-control" type="search" name="q" id="q" size="80" />
						</div>
					</form>
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
	}

});

module.exports = MovieSearch;