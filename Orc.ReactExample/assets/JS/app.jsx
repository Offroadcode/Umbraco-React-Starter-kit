// App entry point, from these references everything else should get pulled in by webpack if its needed

// Stash the two biggies we use (React and ReactRouter) in global space
global.React = require("react/addons");
Router = require("react-router");
global.Router = Router; 

// Put our stores into global scope so everything has them
global.ArticleStore = require("./stores/ArticleStore");

var ReactRunner = require("./reactrunner.jsx");

// Load our routes and stash them in SuperChargedReacts namespaced global object
var Routes = require('./routes.jsx');


