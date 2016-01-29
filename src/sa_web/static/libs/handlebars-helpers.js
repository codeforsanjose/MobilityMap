/*globals Handlebars, moment, jQuery */

(function($) {
  // Allow a valid URL to be linked
  Handlebars.registerHelper('linkToUrl', function(text) {    
    replacedText = text;

    //URLs starting with http://, https://, or ftp://
    replacePattern1 = /(\b(https?|ftp):\/\/[-A-Z0-9+&@#\/%?=~_|!:,.;]*[-A-Z0-9+&@#\/%=~_|])/gim;
    replacedText = replacedText.replace(replacePattern1, '<a href="$1" target="_blank">$1</a>');

    //URLs starting with "www." (without // before it, or it'd re-link the ones done above).
    replacePattern2 = /(^|[^\/])(www\.[\S]+(\b|$))/gim;
    replacedText = replacedText.replace(replacePattern2, '$1<a href="http://$2" target="_blank">$2</a>');

    //Change email addresses to mailto:: links.
    //replacePattern3 = /(([a-zA-Z0-9\-\_\.])+@[a-zA-Z\_]+?(\.[a-zA-Z]{2,6})+)/gim;
    //replacedText = replacedText.replace(replacePattern3, '<a href="mailto:$1">$1</a>');

    return new Handlebars.SafeString(replacedText);
  });

  // Get the current url
  Handlebars.registerHelper('windowLocation', function(place_id) {
    return window.location;
  });

  // Change new lines to <br> tags. This one is better than Swag.
  Handlebars.registerHelper('nlToBr', function(str) {
    if (str) {
      str = Handlebars.Utils.escapeExpression(str);
      return new Handlebars.SafeString(str.replace(/\r?\n|\r/g, '<br>'));
    } else {
      return str;
    }
  });

  // Date and time ------------------------------------------------------------
  Handlebars.registerHelper('formatDateTime', function(datetime, format) {
    if (datetime) {
      return moment(datetime).format(format);
    }
    return '';
  });

  Handlebars.registerHelper('fromNow', function(datetime) {
    if (datetime) {
      return moment(datetime).fromNow();
    }
    return '';
  });

  // Iteration ----------------------------------------------------------------
  Handlebars.registerHelper('times', function(n, options) {
    var accum = '', i;
    for(i = 0; i < n; ++i){
      accum += options.fn(i);
    }
    return accum;
  });

  Handlebars.registerHelper('range', function(from, to, options) {
    var accum = '', i;
    for(i = from; i < to; i++){
      accum += options.fn(i);
    }
    return accum;
  });

  // HTML ---------------------------------------------------------------------
  Handlebars.registerHelper('select', function(value, options) {
    var $el = $('<div/>').html(options.fn(this)),
      selectValue = function(v) {
        $el.find('[value="'+v+'"]').attr({
          checked: 'checked',
          selected: 'selected'
        });
      };

    if ($.isArray(value)) {
      jQuery.each(function(i, v) {
        selectValue(v);
      });
    } else {
      selectValue(value);
    }

    return $el.html();
  });

}(jQuery));
