// App entry point, from these references everything else should get pulled in by webpack if its needed
global.React = require("react/addons");
Router = require("react-router");
global.Router = Router; 

// Put our stores into global scope so everything has them
global.ArticleStore = require("./stores/ArticleStore");

var Routes = require('./routes.jsx');

