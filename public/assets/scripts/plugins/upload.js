var $upload;

$upload = $("[data-plugin='upload']");

$upload.each(function() {
  return $(this).on('change', function(e) {
    if ($(this)[0].files.length > 1) {
      return $(this).next().text($upload.data('multiple-caption').replace('{count}', $(this)[0].files.length));
    } else {
      return $(this).next().text($(this).val().split('\\').pop());
    }
  });
});
