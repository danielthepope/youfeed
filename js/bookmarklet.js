(function(){
	if (document.URL.indexOf("youtube.com") > -1) {
		window.open("http://danielthepope.github.io/index.html?v=2&yfinput="+encodeURIComponent(document.URL));
	} else if (document.URL.indexOf("youfeed.") > -1) {
		alert("Drag that button you just clicked into your bookmarks bar. Then click the bookmark when you have a YouTube channel or playlist open.");
	} else {
		alert("Currently, the YouFeed bookmarklet only works with YouTube pages.");
		return false;
	}
})();
