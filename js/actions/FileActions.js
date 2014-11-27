var AppDispatcher = require('../dispatcher/AppDispatcher');
var FileConstants = require('../constants/FileConstants');

var FileActions = {

  /**
   * @param  {Array} files
   */
  loadFiles: function(files) {
    AppDispatcher.handleServerAction({
      actionType: FileConstants.FILES_LOADED,
      files: files
    });
  }

};

module.exports = FileActions;