// common.js -- Common functions and global variables.

// Example 8
// https://developer.mozilla.org/en-US/docs/Web/API/Window.location

function UrlParam(url) {

  "use strict";

  var rNull = /^\s*$/,
      rBool = /^(true|false)$/i;
  function conv(val) {
    if (rNull.test(val)) return null;
    if (rBool.test(val)) return val.toLowerCase() === "true";
    if (isFinite(val)) return parseFloat(val);
    if (isFinite(Date.parse(val))) return new Date(val);
    return val;
  }

  if (!url) return null;

  return url.split("?")[1].split("&")
      .reduce(function(acc, cur) {
        var pair = cur.split("=");
        acc[unescape(pair[0])] = pair.length > 1
                                    ? conv(unescape(pair[1]))
                                    : null;
        return acc;
      }, {});
}

// Credits:
// https://github.com/eclipse/egit-github/blob/master/org.eclipse.egit.github.core/src/org/eclipse/egit/github/core/client/PageLinks.java#L43-75
// https://github.com/thlorenz/parse-link-header
function PageLink(linkHeader) {

  if (!linkHeader)
    return null;

  return linkHeader
    .split(',')
    .reduce(function(acc, cur) {
      var segments = cur.split(';');
      if (segments.length < 2)
        return acc;

      var link = segments[0].trim();
      if (link[0] !== '<' || link[link.length-1] !== '>')
        return acc;
      link = link.substring(1, link.length - 1);

      var param = UrlParam(link);

      for (var i = 1; i < segments.length; ++i) {

        var rel = segments[i].trim().split('=');
        if (rel.length < 2 || rel[0] !== 'rel')
          continue;

        var val = rel[1];
        if (val[0] === '"' && val[val.length-1] === '"')
          val = val.substring(1, val.length - 1);

        acc[val] = {
          'page': param.page ? param.page : 0,
          'per_page': param.per_page ? param.per_page : 0,
          'rel': val,
          'url': link
        };
      }

      return acc;
    }, {});
}

var Home = 'http://gist.gongzhitaao.org';
// var Home = 'http://0.0.0.0:4000';
var GistAPI = 'https://api.github.com';
var GistRaw = 'https://gist.githubusercontent.com/';
