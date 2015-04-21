"use strict";

var ArticleDispatcher = require('../dispatchers/ArticleDispatcher');
var Constants = require('../Constants');
var EventEmitter = require('events').EventEmitter;
var assign = require("object-assign");
var ArticleViewActionCreators = require('../actions/ArticleViewActionCreators');
var ActionTypes = Constants.ActionTypes;
var CHANGE_EVENT = 'change';
var CHANGE_EVENT_FULL_DETAILS = 'gotFullDetails';
var _articles = {};
var _fullArticle=null;


var ArticleStore = assign( {}, EventEmitter.prototype, {

	emitChange: function() {
		this.emit(CHANGE_EVENT);
	},
	emitFullDetails: function() {
		this.emit(CHANGE_EVENT_FULL_DETAILS);
	},

	/**
	* @param {function} callback
	*/
	addFullDetailsChangeListener: function(callback) {
		this.on(CHANGE_EVENT_FULL_DETAILS, callback);
	},

	removeFullDetailsChangeListener: function(callback) {
		this.removeListener(CHANGE_EVENT_FULL_DETAILS, callback);
	},

	/**
	* @param {function} callback
	*/
	addChangeListener: function(callback) {
		this.on(CHANGE_EVENT, callback);
	},

	removeChangeListener: function(callback) {
		this.removeListener(CHANGE_EVENT, callback);
	},

	getArticles: function() {
		return JSON.parse(JSON.stringify(_articles));
	},	
	getFullArticle: function() {
		return JSON.parse(JSON.stringify(_fullArticle));
	},	

	getArticleAndStartGettingMoreInformation:function(urlSlug){

		if(_fullArticle != null && _fullArticle.urlName == urlSlug){
			return JSON.parse(JSON.stringify(_fullArticle));
		}

		var articles = JSON.parse(JSON.stringify(_articles));
		var found = {};
		for (var i = articles.length - 1; i >= 0; i--) {
			var article= articles[i];
			if(article.urlName == urlSlug){
				found = article;
			}
		};
		ArticleViewActionCreators.getFullDetails(urlSlug);
		return found;
	}
});

ArticleStore.dispatchToken = ArticleDispatcher.register(function(payload) {
  var action = payload.action;
	//console.log("ACTION FIRED",action);
  switch(action.type) {
  	case ActionTypes.FULL_DATA_RETRIEVED:
  		_fullArticle = action.article;
  		ArticleStore.emitFullDetails();
  		break;
    case ActionTypes.GOT_ARTICLES:
		_articles = action.articles;
		ArticleStore.emitChange();
		break;		
	case ActionTypes.ARTICLES_UPDATED:
		_articles = action.Article;
		ArticleStore.emitChange();
		break;
    default:
      // do nothing
  }

});

module.exports = ArticleStore;