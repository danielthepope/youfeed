#youfeed

Convert YouTube channel/playlist URLs into feedly addresses

This is the repository for www.youfeed.uk.

In short, YouFeed takes a URL of a blog or a YouTube page, and opens the relevant feed in feedly. 

##How it works

YouFeed is very simple. All it does is a little bit of rule-based string manipulation. It searches the input URL for an occurrence of a supported site, keeps anything relevant like playlist ID or category name, then adds feedly.com to the start. Nothing needs to be run on a server and no APIs are used. It just takes a URL and returns a slightly different one. 

##Supported sites and features

* YouTube. Supports user pages, channels and playlists. YouFeed looks for '/user/', '/channel/' and '?list=' and returns relevant feeds.

>Please note: sometimes a user page can be shortened by YouTube into the form youtube.com/NAME. Since YouFeed looks for an occurrence of 'user', 'channel' or 'playlist', if these keywords aren't in the URL, YouFeed cannot open the feed in feedly. Clicking on the 'videos' tab of this URL will go to an address in the form youtube.com/user/NAME/videos. 

* Wordpress. Supports all posts, or posts with a certain category or tag. Looks for *.wordpress.com, then 'category' or 'tag'. 

* Blogspot. Similar to Wordpress in the way you can follow a whole blog or just posts with a particular category.

* Tumblr. Searches for USER.tumblr.com or www.tumblr.com/USER, and also posts by a user matching a specific tag.
