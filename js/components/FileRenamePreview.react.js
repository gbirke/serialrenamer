var React = require('react');
var ReactPropTypes = React.PropTypes;

var FileRenamePreview = React.createClass({

	propTypes: {
        files: ReactPropTypes.array.isRequired,
        episodes: ReactPropTypes.object.isRequired
    },

	render: function() {

		var files = this.props.files.map(function(file){
	        return (<tr key={file.id}>
		        	<td>{file.name}</td>
		        	<td>-</td>
	        	</tr>);
	    });

		return (
			<table className="rename-preview table">
				<colgroup>
					<col width="50%" />
					<col width="50%" />
				</colgroup>
				<tbody>
					{files}
				</tbody>
			</table>
		);
	}

});

module.exports = FileRenamePreview;