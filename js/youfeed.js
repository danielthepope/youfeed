$(document).ready(function() {
	$('#javascriptAlert').remove();
	$('#helpLink').tooltip();
	$('#bookmarklet').tooltip();
	$('#yfinput').tooltip();
	$('.contactLink').attr('href', 'https://docs.google.com/forms/d/1abSkucu9d7AMH0YJ9LBk2kDPdMZFExXd_xLytOXbvC4/viewform');
	$('#yfinput').focus();

	var yfvar = getVar('yfinput');
	if (yfvar != null) {
		$('#bookmarkletCallout').remove();
		$('#yfinput').val(yfvar);
		convertLink();
	}
});

var convertLink = function() {
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
		$('#alert').addClass('alert alert-danger');
		$('#alert').append("<strong>Something's not right here. Make sure you put the entire web address.</strong><br/>Sometimes you need to click on the user's \"Videos\" tab to give a full address like https://www.youtube.com/user/charlieissocoollike/videos");
	}
}

$('#yfbutton').on('click', convertLink);

function getUrlVars() {
    var vars = [], hash;
    var hashes = window.location.href.slice(window.location.href.indexOf('?') + 1).split('&');
    for(var i = 0; i < hashes.length; i++)
    {
        hash = hashes[i].split('=');
        vars.push(hash[0]);
        vars[hash[0]] = hash[1];
    }
    return vars;
}

function getVar(property) {
	return getUrlVars()[property];
}

function startsWithList(element) {
	return element.toLowerCase().indexOf('list=') == 0;
}
