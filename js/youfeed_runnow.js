var currentVersion = 4;
var urlVars = getUrlVars();

function getUrlVars() {
    var vars = [], hash;
    var hashes = window.location.href.slice(window.location.href.indexOf('?') + 1).split('&');
    for(var i = 0; i < hashes.length; i++)
    {
        hash = hashes[i].split('=');
        vars.push(hash[0]);
        vars[hash[0]] = decodeURIComponent(hash[1]);
    }
    return vars;
}

function getVar(property) {
	return urlVars[property];
}

function openInFeedly(input, newTab) {
	var rssUrl = '';
	if (input.indexOf('//www.youtube.com/') != -1) {
		rssUrl = youtube(input);
	// TODO uncomment when feature is completed.
	} else if (input.indexOf('.wordpress.com') != -1) {
		rssUrl = wordpress(input);
	} else if (input.indexOf('.blogspot.') != -1) {
		rssUrl = blogspot(input);
	} else if (input.indexOf('.tumblr.') != -1) {
		rssUrl = tumblr(input);

	// } else if () { // New patterns here

	} else {
		// Unrecognised or unsupported URL pattern :(
		showAlert("<strong>Something's not right here. Make sure you put the entire web address.</strong><br/>Sometimes you need to click on the user's \"Videos\" tab to give a full address like<br/>https://www.youtube.com/user/charlieissocoollike/videos");
		return;
	}

	var feedlyUrl = feedly(rssUrl);
	if (newTab) {
		window.open(feedlyUrl);
	} else {
		window.location.replace(feedlyUrl);
	}
}

function feedly(rss) {
	return "http://feedly.com/#subscription%2Ffeed%2F" + encodeURIComponent(rss);
}


// APPLICATION-SPECIFIC CONVERSION FUNCTIONS //
// These functions all take a page URL and return the RSS URL.

function youtube(input) {
	var rssUrl = '';
	var urlarr = input.split('?')[0].split('/');
	// Search for playlist ID
	var playlistPos = input.indexOf('list=');
	var userPos = urlarr.indexOf('user');
	if (userPos == -1) userPos = urlarr.indexOf('channel');

	if (playlistPos != -1) { // Found a playlist
		var processedUrl = input.replace('?', '&');
		urlarr = processedUrl.split('&');
		var listId = urlarr.filter(startsWithList)[0].substring(5); // text after 'list='
		rssUrl = "http://gdata.youtube.com/feeds/api/playlists/" + listId;
	} else if (userPos != -1) { // Look for a user ID
		var userIndex = urlarr.indexOf('user');
		var channel = urlarr[userIndex + 1];
		rssUrl = "http://gdata.youtube.com/feeds/base/users/" + channel + "/uploads?alt=rss&v=2&orderby=published&client=ytapi-youtube-profile";
	}

	return rssUrl;
}

function startsWithList(element) {
	return element.toLowerCase().indexOf('list=') == 0;
}

function wordpress(input) {
	var rssUrl = '';
	// Search for /category/ first, then otherwise take the domain and add /feed/ instead
	var username = input.split('//')[1].split('.')[0];
	if (input.indexOf('/category/') != -1) { // Category present
		var category = input.split('/category/')[1].split('/')[0];
		rssUrl = 'http://' + username + '.wordpress.com/category/' + category + '/feed/';
	} else if (input.indexOf('/tag/') != -1) {
		var tag = input.split('/tag/')[1].split('/')[0];
		rssUrl = 'http://' + username + '.wordpress.com/tag/' + tag + '/feed/';
	} else {
		rssUrl = 'http://' + username + '.wordpress.com/feed/';
	}
	return rssUrl;
}

function blogspot(input) {
	var rssUrl = '';
	var username = input.split('//')[1].split('.')[0];
	if (input.indexOf('/label/') != -1) { // Open the label feed
		var label = input.split('/label/')[1].split('/')[0];
		rssUrl = 'http://' + username + '.blogspot.com/feeds/posts/default/-/' + label + '/';
	} else {
		rssUrl = 'http://' + username + '.blogspot.com/feeds/posts/default';
	}
	return rssUrl;
}

function tumblr(input) {
	var rssUrl = '';
	var username = input.split('//')[1].split('.')[0];
	if (username == 'www') { // Look at the rest of the URL instead
		username = input.split('/blog/')[1].split('/')[0];
	}
	if (input.indexOf('/tagged/') != -1) { // URL has a tag
		var tag = input.split('/tagged/')[1].split('/')[0];
		rssUrl = 'http://' + username + '.tumblr.com/tagged/' + tag + '/rss';
	} else {
		rssUrl = 'http://' + username + '.tumblr.com/rss';
	}
	return rssUrl;
}


// RUN THIS NOW! //

(function() {
	var version = getVar('v');
	var yfvar = getVar('yfinput');
	if (version == null || yfvar == null || version < currentVersion) {
		return;
	}
	else {
		openInFeedly(yfvar, false);
	}
}());