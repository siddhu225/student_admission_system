$(function() {
  var presentColor;
  presentColor = Cookies.get('colour');
  if (presentColor !== void 0) {
    $('body').removeClass().addClass(presentColor);
    $("[data-color='" + presentColor + "']").addClass('active');
  } else {
    $('body').addClass('mirage');
  }
  return $('.js-color-switcher  a').each(function() {
    return $(this).on('click', function(e) {
      var clickColor;
      clickColor = $(this).data('color');
      Cookies.remove('colour', {
        path: ''
      });
      Cookies.set('colour', clickColor, {
        expires: 7,
        path: '/'
      });
      $('.js-color-switcher  a').removeClass('active');
      $("[data-color='" + clickColor + "']").addClass('active');
      if (clickColor !== void 0) {
        return $('body').removeClass().addClass(clickColor);
      } else {
        return $('body').addClass('mirage');
      }
    });
  });
});
