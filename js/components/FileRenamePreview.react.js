var React = require('react');
var ReactPropTypes = React.PropTypes;

var FileRenamePreview = React.createClass({

	propTypes: {
        files: ReactPropTypes.array.isRequired,
        episodes: ReactPropTypes.object.isRequired,
        matches: ReactPropTypes.object.isRequired,
    },

	render: function() {
		var matches = this.props.matches,
			episodes = this.props.episodes,
			pad = function(num, size) {
			    var s = "00000" + num;
			    return s.substr(s.length-size);
			},
			fileRows = this.props.files.map(function(file){
				var episode, episodeText;
				if (file.id in matches && matches[file.id] in episodes) {
					episode = episodes[matches[file.id]];
					episodeText = "S" + pad(episode.season,2) + "E" + pad(episode.number,2) + " - " + episode.name; // TODO make pattern configurable
				}
				else {
					episodeText = " - "
				}
		        return (
		        	<tr key={file.id}>
			        	<td>{file.name}</td>
			        	<td>{episodeText}</td>
		        	</tr>
		        );
		    });

		return (
			<table className="rename-preview table">
				<colgroup>
					<col width="50%" />
					<col width="50%" />
				</colgroup>
				<tbody>
					{fileRows}
				</tbody>
			</table>
		);
	}

});

module.exports = FileRenamePreview;