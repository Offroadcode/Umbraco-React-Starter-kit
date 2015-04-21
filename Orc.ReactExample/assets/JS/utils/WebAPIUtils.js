var ArticleServerActionCreators = require("../actions/ArticleServerActionCreators");
var request = require("superagent");
var Constants = require('../Constants');

var makeRequest = function( url, postData, onError, onSuccess ) {
	request
		.post(url)
		.send( postData )
		.set('Accept', 'application/json')
		.set('X-Requested-With', "XMLHttpRequest" )
		.end( function( error, res ) {
			if ( error == null ) {
				if(res.body.error){
					onError(res.body.error);
				}else{
					onSuccess(res.body);
				}
			} else {
				onError(error);
			}
		});
};

module.exports = {
	getFullDetails:function(url){
		//BookingServerActionCreators.updatingBooking( pax );
		makeRequest( 
			"/articles/"+url, 
			{},
			ArticleServerActionCreators.errorUpdatingArticle,
			ArticleServerActionCreators.GotFullDetails
		);
	},
}
