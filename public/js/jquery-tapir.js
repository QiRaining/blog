(function($){
  var el;
  var settings = {};

  var methods = {
    init: function(options) {
      el = this;

      settings = {
                   token: false,
                   query_param: 'query'
                 };

      if (options) {
        $.extend(settings, options);
      }

      if (!settings.token || settings.query_param == '') {
        return this;
      }

      $.getJSON(
        'http://tapirgo.com/api/1/search.json?token=' + settings.token + '&query=' + paramValue(settings.query_param) + '&callback=?', function(data){
          if(settings['complete']) { settings.complete() }
          $.each(data, function(key, val) {
          document.getElementById('search_results').style.display="block";
          document.getElementById('search_results').style.height="100%";
          document.getElementById('search_results').style.overflow="hidden";
              var str1 = val.content;
              var str2 = str1.substr(1, 250);
              str2 = str2.substr(0, Math.min(str2.length, str2.lastIndexOf(" ")));
            el.append('<div id="content" class="inner"><article class="post hero-unit"><h3 class="title"><a href="' + val.link + '">' + val.title + '</a></h3><div class="entry-content"><span class="date badge badge-warning">发表于: ' + (val.published_on).substr(0,10) + '</span></div><br><p>' + str2 + '...</p><a href="' + val.link +'">全文 &rarr;</a></article></div>');
            if(key >= (data.length-1)){
                el.append('<div id="content" class="inner"><center><h4 style="border-bottom: 1px solid #ddd;">Result ends</h4></center><br><br></div>');
            }
          });
        }
      );

      return this;
    }
  };

  // Extract the param value from the URL.
  function paramValue(query_param) {
    var results = new RegExp('[\\?&]' + query_param + '=([^&#]*)').exec(window.location.href);
    return results ? results[1] : false;
  }

  $.fn.tapir = function(method) {
    if (methods[method]) {
      return methods[ method ].apply(this, Array.prototype.slice.call(arguments, 1));
    } else if (typeof method === 'object' || ! method) {
      return methods.init.apply(this, arguments);
    } else {
      $.error('Method ' +  method + ' does not exist on jQuery.tapir');
    }
  };

})( jQuery );
