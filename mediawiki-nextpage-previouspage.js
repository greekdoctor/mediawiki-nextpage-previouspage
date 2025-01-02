function evaluateNewAndPreviousPage() {

var currentPageTitle = mw.config.get("wgTitle");
var currentPageID = mw.config.get("wgArticleId");
var parentCategory = [];
var parentCategorySubpages = [];
var currentPageIndexOfParentCategory = [];
var nextPagePageID = [];
var nextPageURL = [];
var nextPageTitle = [];
var previousPagePageID = [];
var previousPageURL = [];
var previousPageTitle = []
var lastPageInCategory = 0;
var firstPageInCategory = 0;

/* How it works:
- Find the index (currentPageCategoryIndex) of parentCategorySubpages whose pageid corresponds to currentPageID
- Create a variable (nextPagePageID) containing the pageID of currentPageCategoryIndex + 1 (and -1)
- Get the URL (nextPageURL) of nextPagePageID
- Create a hyperlink to nextPageURL at the bottom of the page
*/

/* Receives a variable "parentCategory" from JSON and the current pageID */
$.ajax({
        url: mw.util.wikiScript( 'api' ),
        data:
            {
                'action': 'query',
                'format': 'json',
                'prop': 'categories',
                'titles': currentPageTitle,
                 'formatversion': '2'
            },
        async: false,
        datatype: 'json',
        success: function (json) {
            parentCategory = json.query.pages[0].categories[0].title;
        }
});

/* Gets a JSON containing the subpages of the category of the current page */
$.ajax({
        url: mw.util.wikiScript( 'api' ),
        data:
            {
                'action': 'query',
                'format': 'json',
                "list": "categorymembers",
                "cmtitle": parentCategory,
                'formatversion': '2',
                "cmlimit": "max"
            },
        async: false,
        datatype: 'json',
        success: function (json) {
            parentCategorySubpages = json.query.categorymembers;
        }
});

var currentPageIndexOfParentCategory = parentCategorySubpages.findIndex(function(page3) {
    return page3.pageid == currentPageID;
});

try {
    nextPagePageID = parentCategorySubpages[currentPageIndexOfParentCategory + 1].pageid;
}

catch(err) {
    var lastPageInCategory = 1;
}

try {
    previousPagePageID = parentCategorySubpages[currentPageIndexOfParentCategory - 1].pageid;
}

catch(err) {
    var firstPageInCategory = 1;
}

/* Gets the url and page title of the next page in the category, but only if it's not the last page in the category */

if (lastPageInCategory != 1) {
   $.ajax({
        url: mw.util.wikiScript( 'api' ),
        data:
            {
                'action': 'query',
                'format': 'json',
                "prop": "info",
                "iwurl": 1,
                "pageids": nextPagePageID,
                'formatversion': '2',
                "inprop": "url"
            },
        async: false,
        datatype: 'json',
        success: function (json) {
            nextPageURL = json.query.pages[0].fullurl;
            nextPageTitle = json.query.pages[0].title;
        }
   });
}

/* Gets the url and page title of the previous page in the category */

if (firstPageInCategory != 1) {
    $.ajax({
        url: mw.util.wikiScript( 'api' ),
        data:
            {
                'action': 'query',
                'format': 'json',
                "prop": "info",
                "iwurl": 1,
                "pageids": previousPagePageID,
                'formatversion': '2',
                "inprop": "url"
            },
        async: false,
        datatype: 'json',
        success: function (json) {
            previousPageURL = json.query.pages[0].fullurl;
            previousPageTitle = json.query.pages[0].title;
        }
  });
}

/* If it's not the last or first page in the category, add both links */
if ((lastPageInCategory == 0) && (firstPageInCategory == 0)) {
  /* Adds the links to the desktop site (vector theme) */
  $(".vector-body").append( ' <br />' );
  $(".vector-body").append($('<p style="text-align: left"><a href="'+previousPageURL+'">'+'Previous page: '+previousPageTitle+'</a><span style="float:right;"><a href="'+nextPageURL+'">'+'Next page: ' + nextPageTitle+'</a></span> </p>'));

  /* Adds the links to the mobile site (nuerva something theme) */
  $(".content").append( ' <br />' );
  $(".content").append($('<p style="text-align: left"><a href="'+previousPageURL+'">'+'Previous page: '+previousPageTitle+'</a><span style="float:right;"><a href="'+nextPageURL+'">'+'Next page: ' + nextPageTitle+'</a></span></p>'));

} else if ((lastPageInCategory == 1) && (firstPageInCategory == 0)) {
  /* True if this is the last page in the category but it's not the only page. Don't evaluate the "Next Page" */  
  /* Adds the links to the desktop site (vector theme) */
  $(".vector-body").append( ' <br />' );
  $(".vector-body").append($('<p style="text-align: left"><a href="'+previousPageURL+'">'+'Previous page: '+previousPageTitle+'</a></p>'));

  /* Adds the links to the mobile site (nuerva something theme) */
  $(".content").append( ' <br />' );
  $(".content").append($('<p style="text-align: left"><a href="'+previousPageURL+'">'+'Previous page: '+previousPageTitle+'</a></p>'));

} else if ((firstPageInCategory == 1) && (lastPageInCategory == 0)) {
  /* True if this is the first page in the category but it's not the only page. Don't evaluate the "Previous Page" */  
  /* Adds the links to the desktop site (vector theme) */
  $(".vector-body").append( ' <br />' );
  $(".vector-body").append($('<p style="text-align: right"><a href="'+nextPageURL+'">'+'Next page: '+nextPageTitle+'</a></p>'));

  /* Adds the links to the mobile site (nuerva something theme) */
  $(".content").append( ' <br />' );
  $(".content").append($('<p style="text-align: right"><a href="'+nextPageURL+'">'+'Next page: '+nextPageTitle+'</a></p>'));
}

else if ((firstPageInCategory == 1) && (lastPageInCategory == 1)) {
  /* This page is the only page. Don't insert any links */
}

}
/*
document.onreadystatechange = function () {
  if (document.readyState == "complete") {
  }
}
*/
const mediaQueryList = window.matchMedia("screen");

if (mediaQueryList.matches) {
  $(document).ready(function() {
    evaluateNewAndPreviousPage();
  })
}
