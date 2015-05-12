/* 

You MUST include this file in your bundle.

This is the entry point to rendering your root React application/component.

We recommend webpack for combining these file, we also recommend including React and React-Router in your bundle

*/
React = require("react/addons");
Router = require("react-router");

// Our global SuperChargedReact settings object
global.SuperChargedReact = global.SuperChargedReact || {
	// Setup defaults
	routes: null,	// Your routes, you can set this later in your bundle via global.SuperChargedReact.routes = your_routes_here
	routerOutput: null,
	bootstrapper: function() {
		// Default failsafe
		console.error("No bootstrapper method defined!");
	}
};

/*

settings = An object built up in .net containing some of the data you might need to get React to play nice. At a minimum it will have the following

settings = {
	// Name of the component to render if not using ReactRouter
	componentName: "string",	
	
	// The name of the HTML element to inject your components output into, only used client-side
	containerId: "string"		
	
	// Any props object passed in, this will be the Model you passed in when calling Html.Render in your template
	props : {},					
	
	// ## React Router goodies only

	// Needed by ReactRouter to know which route to render
	requestdUrl : "string",		
}

*/

// One render function to rule them all...
global.SuperChargedReact.bootstrapper = function( settings ) {   
	if ( settings == null ) {
		// console.log( "Settings", settings ); // Handy for debugging
		console.error("Settings object is missing/empty for SuperChargedReact Render function");
	}
	
	// You can edit this to your hearts desire if you like or just leave it as it is and it will work out the box for ReactRouter and React components
	if ( typeof window == "undefined" ) {
	
		// #### Server-side rendering ####
		if ( global.SuperChargedReact.routes != null  ) {
			// If we have a routes object then we assume its a ReactRouter request, modify this if you are using a different Router you crazy cat
			Router.run( global.SuperChargedReact.routes, settings.requestedUrl, function( Handler ) { 
				// In this call back we render the right component for the given url to a string 
				// and store it in our global variable so the host can pick it up and render it
				global.SuperChargedReact.routerOutput = React.renderToString( React.createElement( Handler, settings.props ));
			});
		} else {
			// Plane old React component request
			// Render your requested component to a string and store it in our global variable so the host can pick it up and render it
			global.SuperChargedReact.routerOutput = React.renderToString( React.createElement( settings.componentNameToRender, settings.props ));
		}
	} else {
	
		// #### Client-side rendering ####
		if ( global.SuperChargedReact.routes != null ) {
			// If we have a routes object then we assume its a ReactRouter request, modify this if you are using a different Router you crazy cat
			Router.run( global.SuperChargedReact.routes, Router.HistoryLocation, function( Handler ) { 
				React.render(
					React.createElement( Handler, settings.props ), 
					document.getElementById( settings.containerId )
				);
			});
		} else {
			// Plane old React component request
			// Render your requested component to a string and store it in our global variable so the host can pick it up and render it
			React.render( 
				React.createElement( settings.componentNameToRender, settings.props ), 
				document.getElementById( settings.containerId )
			);
		}
	}        
} 
