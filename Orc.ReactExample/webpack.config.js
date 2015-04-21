var webpack = require("webpack");

module.exports = {
    entry: "./assets/JS/app.jsx",
    output: {
        filename: "./assets/bundle.js"
    },
	
	externals: {
	},
	
	module: {
        loaders: [
            { test: /\.jsx$/, loader: "jsx-loader" }
        ]
    },
	
	plugins: [
		new webpack.optimize.OccurenceOrderPlugin(),
		new webpack.optimize.DedupePlugin()
	],
	
	// Dev:
	devtool: "eval"
	
	// Prod:
	//devtool: "source-map"
}