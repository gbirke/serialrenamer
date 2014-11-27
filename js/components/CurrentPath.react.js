var React = require('react');
var ReactPropTypes = React.PropTypes;
var FolderEntry = require('./FolderEntry.react');

var CurrentPath = React.createClass({

    propTypes: {
        path: ReactPropTypes.string.isRequired
    },

    render: function() {
        var pathParts = [], 
            prev = "", 
            rootData = {name: "<root>", id:"", type:"d"};
        if (this.props.path) {
            this.props.path.split("/").forEach(function(p) {
                var id = prev + p, 
                    folder = { 
                        name: p,
                        id: id,
                        type: "d"
                    };
                pathParts.push(<FolderEntry key={id} entry={folder} />);
                prev += p + "/"
            });
        }

        return (
            <div className="current-path filelist">
                <span>Current Path:</span> <FolderEntry entry={rootData} /> {pathParts}
            </div>
        );
    }
});

module.exports = CurrentPath;