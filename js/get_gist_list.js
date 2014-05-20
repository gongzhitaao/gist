// get_gist_list.js -- Get @username all gists, load with /index.html

(function ($, undefined) {

  // var viewurl = 'https://js.gongzhitaao.org/gist/?';
  var viewurl = Home + '/gist/?';
  var PerPage = 30;
  var username = null;
  var next = 1;

  function more_gist(page, per_page) {
    // Retrieve all gists, but only show part of them at first.
    $.ajax({
      type: 'GET',
      url: GistAPI + '/users/' + username +
          '/gists?page='+ page + '&per_page=' + PerPage.toString(),
      dataType: 'json',
      success: function(data, status, xhr) {
        var link = PageLink(xhr.getResponseHeader('link'));
        next = (link && ('next' in link)) ? link.next.page : 0;

        var $gist = $('.gists');
        for (var i = 0; i < data.length; ++i) {
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
                 username + '/' + data[i].id +
                 '/raw/thumbnail.png'+ ') no-repeat center left')
            .appendTo($gist);
          }
        }

        $('.refresher').removeClass('fa-spin');

        if (next <= 0) {
          $('.refresher')
            .removeClass('fa-refresh')
            .addClass('fa-smile-o')
            .unbind('click')
            .text(' That\'s all')
            .css('cursor', 'default');
        }
      }
    });
  }

  $(document).ready(function() {

    var param = UrlParam(window.location.search);
    username = (param && param.user) ? param.user : "gongzhitaao";

    $('.user')
      .attr('href', 'https://github.com/' + username)
      .append(username);

    more_gist(next, PerPage);

    $('.refresher').click(function() {
      $(this).addClass('fa-spin');
      more_gist(next, PerPage);
    });
  });

})(jQuery);
