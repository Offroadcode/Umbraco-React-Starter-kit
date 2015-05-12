var React = require("react/addons");
var Router = require("react-router");
var Route = Router.Route;
var Redirect = Router.Redirect;
var NotFoundRoute = Router.NotFoundRoute;
var DefaultRoute = Router.DefaultRoute;
var Link = Router.Link; 
var RouteHandler = Router.RouteHandler;

var ArticleServerActions = require("./actions/ArticleServerActionCreators");
var ArticleFolderApp = require("./components/ArticleFolder.jsx").ArticleFolderApp;
var ArticleApp = require("./components/Article.jsx").ArticleApp;

var App = React.createClass({ 
	contextTypes: {
    	router: React.PropTypes.func
  	},
	
 	componentWillMount: function() {
 		var routes = this.context.router.getCurrentRoutes();
		var handlerName = routes.reverse()[0].name;
		var parentHandlerName = routes.reverse()[1].name;
  		
  		switch( handlerName ) {
			case "articlesRoot":
				ArticleServerActions.gotArticles( this.props.model.articles );
				case "article":
				ArticleServerActions.GotFullDetails( this.props.model );
			break;
		}
	},
  
	render: function () {
	
		return (
			<div>
				<h1>Offroadcode React Example</h1>
				{/* Render the right component for this url */}
				<RouteHandler {...this.props} />
			</div>
		);
	} 
});

var CommingSoonPage = React.createClass({
	render: function() {
		return (
			<div>
				<p>Im Comming Soon!</p>
			</div>
		);
	}
});

var PageNotFound = React.createClass({
	render: function() {
		return (
			<div>
				<p>Page not found!</p>
			</div>
		); 
	}
});

/* GLOBAL ROUTES OBJECT - The server side rendering will read this in hence it being global */ 
var reactRoutesConfig = (
	<Route name="app" handler={App}>
		<Route name="articlesRoot" path="/articles" handler={ArticleFolderApp} />
		<Route name="article" path="/articles/:articleName" handler={ArticleApp} />
		<DefaultRoute handler={CommingSoonPage} />
		<NotFoundRoute handler={PageNotFound} />    
	</Route>
);

/* Store our routes globally so our server-side stuff can get to it easily */
global.SuperChargedReact.routes = reactRoutesConfig;