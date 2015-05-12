// keyMirror is a simple helper for making Enums (of sorts)
var keyMirror = require('react/lib/keyMirror');

module.exports = {
	// These characters can cause some grief if in your strings/components so we use the Unicode strings instead.
    Unicodes : {
        PoundSign : "\u00A3",
        NonBreakingSpace : "\u00A0",
		Ampersand: "\u0026",
		Apostrophe: "\u0027"
    },

	// Always useful to have in your code, here incase you need it, does nothing right now though but at least you know where to put it!
    Debug:false,

	// Flux related: Types of action that can be triggered, these are sent out to our stores via Flux
	ActionTypes: keyMirror({
		GOT_ARTICLES: null,
		GETTING_FULL_ARTICLE:null,
		FULL_DATA_RETRIEVED:null
	}),

	// Flux related: Where did our action originate from, helpful for debugging
	PayloadSources: keyMirror({
		SERVER_ACTION: null,
		VIEW_ACTION: null
	}),
	
	// Super handy shortcuts to stop you messing up and aid readability
	IsClientSide: typeof window !== "undefined",
	IsServerSide: typeof window == "undefined"
};