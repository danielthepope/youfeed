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
	if (version == null) version = currentVersion;
	if (version < currentVersion) {
		showAlert("<p><strong>Update your bookmarklet!</strong></p><p>You are using an out of date bookmarklet. Please remove it and drag over the new one.</p>");
	} else {
		convertLink();
	}
});

var convertLink = function() {
	if ($('#yfinput').val() == '') {
		$('#yfinput').focus();
		return;
	}

	var input = $('#yfinput').val();
	var feedlyurl = '';
	var urlarr = input.split('?')[0].split('/');
	// Search for playlist ID
	var playlistPos = input.indexOf('list=');
	var userPos = urlarr.indexOf('user');
	if (userPos == -1) userPos = urlarr.indexOf('channel');

	if (playlistPos != -1) { // Founc a playlist
		var processedUrl = input.replace('?', '&');
		urlarr = processedUrl.split('&');
		var listId = urlarr.filter(startsWithList)[0].substring(5);
		feedlyurl = "https://feedly.com/home#subscription%2Ffeed%2Fhttp%3A%2F%2Fgdata.youtube.com%2Ffeeds%2Fapi%2Fplaylists%2F" + listId;
	} else if (userPos != -1) { // Look for a user ID
		var userIndex = urlarr.indexOf('user');
		var channel = urlarr[userIndex + 1];
		feedlyurl = "https://feedly.com/#subscription%2ffeed%2Fhttp%3A%2F%2Fgdata.youtube.com%2Ffeeds%2Fbase%2Fusers%2F" + channel + "%2Fuploads%3Falt%3Drss%26v%3D2%26orderby%3Dpublished%26client%3Dytapi-youtube-profile";
	}

	// Open page
	if (feedlyurl != '') {
		window.location.replace(feedlyurl);
	} else { // Display error message
		showAlert("<strong>Something's not right here. Make sure you put the entire web address.</strong><br/>Sometimes you need to click on the user's \"Videos\" tab to give a full address like https://www.youtube.com/user/charlieissocoollike/videos");
	}
};

$('#yfbutton').on('click', convertLink);

$('#yfinput').on('keyup', function(e) {
	if (e.keyCode == 13) {
		$('#yfbutton').trigger('click');
	}
});

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
