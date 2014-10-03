$(document).ready(function() {
	var currentVersion = '2';

	$('#helpLink').tooltip();
	$('#bookmarklet').tooltip();
	$('#yfinput').tooltip();
	$('.contactLink').attr('href', 'https://docs.google.com/forms/d/1abSkucu9d7AMH0YJ9LBk2kDPdMZFExXd_xLytOXbvC4/viewform');
	$('#yfinput').focus();

	var version = getVar('v');
	var yfvar = getVar('yfinput');
	if (yfvar != null) {
		$('#bookmarkletCallout').remove();
		$('#yfinput').val(yfvar);
	} else { // For people on bookmarklet v1
		var ytvar = getVar('ytinput');
		if (ytvar != null) {
			version = '1';
			$('#yfinput').val(ytvar);
		}
	}
	if (version != null) { // null means we haven't used the bookmarklet
		if (version < currentVersion) {
			showAlert("<p><strong>Update your bookmarklet!</strong></p><p>You are using an out of date bookmarklet. Please remove it and drag over the new one.</p>");
		} else {
			convertLink(false);
		}
	}
});

function convertLink(newTab) {
	if ($('#yfinput').val() == '') {
		$('#yfinput').focus();
		return;
	}

	var input = $('#yfinput').val();
	openInFeedly(input, newTab);
}

function openInFeedly(input, newTab) {
	var rssUrl = '';
	if (input.indexOf('//www.youtube.com/') != -1) {
		rssUrl = youtube(input);
	} else if (input.indexOf('.wordpress.com') != -1) {
		rssUrl = wordpress(input);
	} else if (input.indexOf('.blogspot.') != -1) {
		rssUrl = blogspot(input);

	// } else if () { // New patterns here

	} else {
		// Unrecognised or unsupported URL pattern :(
		showAlert("<strong>Something's not right here. Make sure you put the entire web address.</strong><br/>Sometimes you need to click on the user's \"Videos\" tab to give a full address like https://www.youtube.com/user/charlieissocoollike/videos");
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
		var listId = urlarr.filter(startsWithList)[0].substring(5);
		rssUrl = "http://gdata.youtube.com/feeds/api/playlists/" + listId;
	} else if (userPos != -1) { // Look for a user ID
		var userIndex = urlarr.indexOf('user');
		var channel = urlarr[userIndex + 1];
		rssUrl = "http://gdata.youtube.com/feeds/base/users/" + channel + "/uploads?alt=rss&v=2&orderby=published&client=ytapi-youtube-profile";
	}

	return rssUrl;
};

function wordpress(input) {
	var rssUrl = '';
	// TODO this function
	return rssUrl;
}

function blogspot(input) {
	var rssUrl = '';
	// TODO this function
	return rssUrl;
}


// EVENTS //

$('#yfbutton').on('click', function() {
	convertLink(true);
});

$('#yfinput').on('keyup', function(e) {
	if (e.keyCode == 13) {
		$('#yfbutton').trigger('click');
	}
});


// OTHER USEFUL FUNCTIONS //

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
};

function getVar(property) {
	return getUrlVars()[property];
};

function startsWithList(element) {
	return element.toLowerCase().indexOf('list=') == 0;
};

function showAlert(message) {
	$('#alert').addClass('alert alert-danger');
	$('#alert').html(message);
}
