var React = require("react/addons");
var Router = require("react-router");
var Link = Router.Link;

var Comment = React.createClass({
	render:function(){
		return (<div>
					<div>
						{this.props.data.content}
					</div>
					by {this.props.data.author} at {this.props.data.date}
				</div>);
	}
});

var	ArticleApp = React.createClass({

	contextTypes: {
    	router: React.PropTypes.func
  	},

	// Listen for changes
	componentWillMount: function() {
		var ctx = this.context.router.getCurrentParams();

		this.setState(
			{ initialData : ArticleStore.getArticleAndStartGettingMoreInformation(ctx.articleName) } 
			);
		
		ArticleStore.addFullDetailsChangeListener(this._onChange);
	},

	// Unbind change listener
	componentWillUnmount: function() {
		ArticleStore.removeFullDetailsChangeListener(this._onChange);
	},

	_onChange: function() {
		var data = ArticleStore.getFullArticle();
		this.setState( {
		 initialData : data,
		  isLoading:false }
		   );
	},

	render: function() {
		var data = this.state.initialData;

		var comments = null;
		if(data.comments!=null){
			comments = data.comments.map(function(comment,i){
				return <Comment data={comment} />
			});
		}

		console.log("Rendering data",data);
		return (
			<div>
				<div className="article-content">
					<h1>{data.title}</h1>
					<div dangerouslySetInnerHTML={{__html: data.content}} />

				</div>

				<div className="comments">
					<h2>Comments</h2>
					{comments}
				</div>
			</div>
		);
	}
});

module.exports = { ArticleApp : ArticleApp };