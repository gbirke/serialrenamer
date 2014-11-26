var Backbone = require('backbone');
var $ = require('jquery');
Backbone.$ = $;

var FolderModel = Backbone.Model.extend({});

var FolderCollection = Backbone.Collection.extend({
	model: FolderModel,
	baseUrl: "/folder",
	folder: ""
	url: function() {
		if (this.folder) {
			return this.baseUrl + "/" + this.folder;
		}
		else {
			return this.baseUrl;	
		}
	},
	setFolder: function(folder) {
		this.folder = folder;
		this.fetch({reset:true});
	}
});

module.exports = {
	FolderModel: FolderModel,
	FolderCollection: FolderCollection
});