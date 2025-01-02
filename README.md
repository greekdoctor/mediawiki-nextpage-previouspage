# mediawiki-nextpage-previouspage
I have a webpage that used to be hosted on Wordpress. On Wordpress, there's an extension that allows you to create two buttons at the bottom of each page, one for the "next page" and one for the "previous page". Eventually I moved my webpage to mediawiki (because it better aligned with the aims of the webpage), but I really wanted the similar "next page" and "previous page" functionality from Wordpress. I tried searching for ways to accomplish this, but found nothing.

So I created by own solution. It's a simple javascript which is inserted at the end of Mediawiki:Common.js which creates two buttons at the bottom of each webpage, "next page: [page title]" and "previous page: [page title]". It determines what the next page is based on which page is the next page in the first category they both belong to. It does not gracefully account for a page being a member of multiple categories, which probably hampers the general usability of this, but it works well for my needs.

I'm not that good at scripting, so experienced programmers will probably find optimisations or better approaches in my code. I'd be happy to accept input.

An example of this script working can be seen here: https://new.greek.doctor/wiki/24._Bronchopneumonia
