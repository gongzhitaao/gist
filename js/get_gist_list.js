// get_gist_list.js -- Get @username all gists, load with /index.html

(function ($, undefined) {

  // var viewurl = 'https://js.gongzhitaao.org/gist/?';
  var viewurl = Home + '/gist/?';
  var gists = null;
  var CountPerRefresh = 50;

  $(document).ready(function() {
    var param = new UrlParam(window.location.search);
    var username = param.user ? param.user : "gongzhitaao";

    $('.user')
      .attr('href', 'https://github.com/' + username)
      .append(username);

    // Retrieve all gists, but only show part of them at first.
    $.ajax({
      type: 'GET',
      url: GistAPI + '/users/' + username + '/gists',
      dataType: 'json',
      success: function(data, status, xhr) {
        gists = data;
        var $gist = $('.gists').html('');
        var count = data.length < CountPerRefresh
              ? data.length
              : CountPerRefresh;
        for (var i = 0; i < count; ++i) {
          // if there is a `README.md', I assume that you want to list
          // this gist.
          if ('README.md' in data[i].files) {
            $('<a/>', {
                href: viewurl +
                      $.param({id: data[i].url.substr(
                          data[i].url.lastIndexOf('/') + 1)})
            })
              .addClass('gist')
              .append($('<span>')
                      .addClass('description')
                      .text(data[i].description))
              .css('background', 'url(' + GistRaw +
                   username + '/' + data[i].id + '/raw/thumbnail.png'+ ') no-repeat center center')
              .appendTo($gist);
          }
        }
      }
    });

    // Show more as scrolling down.
    $(window).scroll(function() {

      if ($(window).scrollTop() ==
          $(document).height() - $(window).height()) {
        console.log("helo");
      }
    });
  });

})(jQuery);
