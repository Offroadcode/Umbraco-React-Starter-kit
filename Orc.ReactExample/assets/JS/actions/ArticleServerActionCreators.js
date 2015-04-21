var ArticleDispatcher = require('../dispatchers/ArticleDispatcher');
var Constants = require('../Constants');

var ActionTypes = Constants.ActionTypes;

module.exports = {

	updatingArticle: function(model) {
		ArticleDispatcher.handleServerAction({
			type: ActionTypes.UPDATING_Article,
			Article: model
		});
	},

	ArticleUpdated: function(ArticleModel) {
		ArticleDispatcher.handleServerAction({
			type: ActionTypes.Article_UPDATED,
			Article: ArticleModel
		});
	},	
	GotFullDetails:function(article){
		ArticleDispatcher.handleServerAction({
			type: ActionTypes.FULL_DATA_RETRIEVED,
			article: article
		});
	},
		/** Fired when a search result is returned by the server */
	gotArticles: function(articles) {
		ArticleDispatcher.handleServerAction({
			type: ActionTypes.GOT_ARTICLES,
			articles: articles
		});
	},
	
	errorUpdatingArticle: function( error ) {
		ArticleDispatcher.handleServerAction({
			type: ActionTypes.ERROR,
			error: error
		});
		
		console.error( error );
	}
  
  // TODO: See ChatMessageActionCreators for some store manipulation here for adding results to a store https://github.com/facebook/flux/blob/master/examples/flux-chat/js/actions/ChatMessageActionCreators.js
};