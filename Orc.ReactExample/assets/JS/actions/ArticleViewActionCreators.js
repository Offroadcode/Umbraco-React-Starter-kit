var ArticleDispatcher = require('../dispatchers/ArticleDispatcher');
var Constants = require('../Constants');
var ArticleStore = global.ArticleStore;
//var ArticleStoreHelpers = require("../stores/ArticleStoreHelpers");
var ActionTypes = Constants.ActionTypes;
var WebAPIUtils = require("../utils/WebAPIUtils" );

module.exports = {

	/** Fired when a search result is returned by the server */
	getFullDetails: function( urlSlug ) {
		ArticleDispatcher.handleViewAction({
			type: ActionTypes.GETTING_FULL_ARTICLE,
			urlSlug:urlSlug,
	
		});
		WebAPIUtils.getFullDetails( urlSlug );
	},


};