$(document).ready(function() {
	$('.contactLink').attr('href', 'https://docs.google.com/forms/d/1abSkucu9d7AMH0YJ9LBk2kDPdMZFExXd_xLytOXbvC4/viewform');
	var bookmarklet = bookmarkletFunction.toString();
	if (window.location.href.indexOf('youfeedbeta') != -1
		|| window.location.href.indexOf('localhost') != -1) {
			bookmarklet = bookmarklet.replace('http://www.youfeed.uk', 'http://youfeedbeta.azurewebsites.net');
			$('#bookmarklet').text('YouFeed beta');
	}
	$('#bookmarklet').attr('href', 'javascript:(' + bookmarklet + ')()');
	$('#yfinput').focus();

	var version = getVar('v');
	var yfvar = getVar('yfinput');
	if (yfvar != null) {
		$('#bookmarkletCallout').attr('style','display:none !important');
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
			$('#bookmarkletCallout').show();
			showAlert("<p><strong>Update your bookmarklet!</strong></p><p>You are using an out of date bookmarklet. Please remove it and drag over the new one.</p>");
		} else {
			convertLink(false);
		}
	}
});

function convertLink(newTab) {
	if ($('#yfinput').val().trim() == '') {
		$('#yfinput').focus();
		return;
	}

	var input = $('#yfinput').val();
	if (openInFeedly(input, newTab)) {
		showAlert(null);
	} else {
		showAlert("<strong>Something's not right here. Make sure you put the entire web address.</strong><br/>Sometimes you need to click on the user's \"Videos\" tab to give a full address like<br/>https://www.youtube.com/user/charlieissocoollike/videos");
	}
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


// LOADING IMAGES ON CLICK //

$('#helpButton').on('click', function() {
	loadImage($('#img1'), $('#img1').attr('src'));
	loadImage($('#img2'), $('#img2').attr('src'));
	loadImage($('#img3'), $('#img3').attr('src'));
	loadImage($('#img4'), $('#img4').attr('src'));
});

function loadImage(element, source) {
	if (element.children('img').size() > 0) {
		if ($(element.children('img').get(0)).attr('src') === source) {
			// Image already loaded
			return;
		} else {
			// Remove current image and add the new one
			element.children('img').remove();
		}
	}
	var img = new Image();
	$(img)
		.load(function() {
			$(this).hide();
			element.append(this);
			$(this).fadeIn();
		})
		.error(function() {
			console.log('Could not load image ' + source);
		})
		.addClass('center-block img-responsive')
		.attr('src', source)
		.attr('alt', element.attr('alt'));
}


// OTHER USEFUL FUNCTIONS //

function showAlert(message) {
	if (message == null) {
		$('#alert').removeClass('alert alert-danger');
		$('#alert').html('');
	} else {
		$('#alert').addClass('alert alert-danger');
		$('#alert').html(message);
	}
}

var bookmarkletFunction = function() {
	if (document.URL.split('//')[1].split('/')[0].indexOf('youfeed') != -1) {
		window.open('https://feedly.com/#subscription%2Ffeed%2Fhttp%3A%2F%2Fyoufeed.tumblr.com%2Frss');
	} else if (document.URL.split('//')[1].split('/')[0].indexOf('feedly.com') != -1) {
		alert('No feedly-ception allowed!');
	} else {
		window.open("http://www.youfeed.uk/?v=4&yfinput=" + encodeURIComponent(document.URL));
	}
};
