var keyMirror = require('react/lib/keyMirror');

module.exports = {
    SearchTypes: keyMirror({
        AccomOnly: null,
        FlightOnly: null,
        Inclusive: null
    }),

    Unicodes : {
        PoundSign : "\u00A3",
        NonBreakingSpace : "\u00A0",
		Ampersand: "\u0026",
		Apostrophe: "\u0027"
    },

    Debug:false,

	ActionTypes: keyMirror({
		GOT_ARTICLES: null,
		GETTING_FULL_ARTICLE:null,
		FULL_DATA_RETRIEVED:null
	}),
	PayloadSources: keyMirror({
		SERVER_ACTION: null,
		VIEW_ACTION: null
	}),
	
	
	IsClientSide: typeof window !== "undefined",
	IsServerSide: typeof window == "undefined"
};