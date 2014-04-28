GIST Viewer on Github Page
==========================

This an implementation similar to
[http://bl.ocks.org/](http://bl.ocks.org/).  I always want to know how
the gist viwer is implemented.

Basically, here are two choices:

1. **Static** Keep a copy of every gist on this github page repo.
   This is not fancy at all.  What's more, everytime you create a
   gist, you have to update the site.

2. **Dynamic** How about let the server dynamically fetch gist using
   the [gist api](https://developer.github.com/v3/gists/)?  But there
   is a big problem: *cross-domain*.  We need to fetch the content
   from [gist.githubusercontent.com](gist.githubusercontent.com).
   This issue could be solved using `jQuery` and `YQL`.  Example of
   this could be found in function `requestCrossDomain(url, callback)`
   in `gist/index.html`.
