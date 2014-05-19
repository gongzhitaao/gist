// get_gist_content.js -- Get @username #id gist content.

(function($, undefined) {

  $(document).ready(function() {
    var param = new UrlParam(window.location.search);
    var id = param.id;

    $.ajax({
      type: 'GET',
      url: GistAPI + '/gists/' + id,
      dataType: 'jsonp',
      success: function (gist) {
        // username and url
        $('.user')
          .attr('href', Home + '/?user=' + gist.data.owner.login)
          .append(gist.data.owner.login);

        // gist id and url
        $('.gistid')
          .attr('href', gist.data['html_url'])
          .text(gist.data.id);

        // gist date
        var date = moment(gist.data['updated_at']).format("YYYY MMM DD, h:mm a");
        $('.gist-date').text(date);

        // title
        $('.gist-description').prepend(gist.data.description);

        // iframe demo
        var iframe = $('.gist-demo')[0];
        var doc = iframe.contentWindow || iframe.contentDocument;
        if (doc.document)
          doc = doc.document;
        doc.open();
        doc.write(gist.data.files['index.html'].content);
        doc.close();

        // gist readme, parsed with marked.js
        $('.gist-readme')
          .append($('<h2>').text("README"))
          .append(marked(gist.data.files['README.md'].content));

        // gist sources
        var $sources = $('.gist-sources').hide();

        var helper = function (k, v) {
          $('<div>')
            .addClass('gist-source')
            .append($('<h2>').append(k))
            .append($('<pre>')
                    .html($('<code>').text(v.content))
                    .each(function(i, e) {hljs.highlightBlock(e);}))
            .appendTo($sources);
        };

        helper('index.html', gist.data.files['index.html']);
        delete gist.data.files['README.md'];
        delete gist.data.files['index.html'];
        delete gist.data.files['thumbnail.png'];
        $.each(gist.data.files, helper);
      }
    });

    $('.toggle-source').click(function () {
      $('.gist-sources').toggle();
    });

  });

})(jQuery);
