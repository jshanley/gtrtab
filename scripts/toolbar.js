define(['jquery'], function($) {

  return function(tab) {
    // hide/show toolbar on navbar click
    $('.navbar').click(function() {
      $('.toolbar').toggle();
      tab.maintainSize();
    });

    // handle input for number of strings per stave
    tab.stringsPerStave = $('#input-strings').val();
    $('#input-strings').change(function() {
      tab.stringsPerStave = $(this).val();
    });

    // toggling of overwrite feature
    $('#toggle-overtype').click(function() {
      tab.handleOverwriteToggle();
      tab.focus();
    });


  };

});
