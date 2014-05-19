// common.js -- Common functions and global variables.

// Example 8
// https://developer.mozilla.org/en-US/docs/Web/API/Window.location

function UrlParam(sSearch) {
  var rNull = /^\s*$/, rBool = /^(true|false)$/i;
  function buildValue(sValue) {
    if (rNull.test(sValue)) return null;
    if (rBool.test(sValue)) return sValue.toLowerCase() === "true";
    if (isFinite(sValue)) return parseFloat(sValue);
    if (isFinite(Date.parse(sValue))) return new Date(sValue);
    return sValue;
  }
  if (sSearch.length > 1) {
    for (var aItKey, nKeyId = 0,
             aCouples = sSearch.substr(1).split("&");
         nKeyId < aCouples.length; nKeyId++) {
      aItKey = aCouples[nKeyId].split("=");
      this[unescape(aItKey[0])] = aItKey.length > 1
                                ? buildValue(unescape(aItKey[1]))
                                : null;
    }
  }
};

var Home = 'https://gist.gongzhitaao.org';
// var Home = 'http://0.0.0.0:4000';
var GistAPI = 'https://api.github.com';
var GistRaw = 'https://gist.githubusercontent.com/';
