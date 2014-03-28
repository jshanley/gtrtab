(function() {

  require.config({
    'baseUrl': 'scripts',
    'paths': {
      'jquery': '../vendor/jquery/dist/jquery.min',
      'codemirror': '../vendor/codemirror/lib/codemirror',
      'jquery.chosen': '../vendor/chosen/chosen.jquery.min'
    },
    'shim': {
      'jquery.chosen': ['jquery']
    }
  });

  // load CodeMirror and the 'gtrtab' mode
  // load jQuery and the 'chosen' plugin
  // load local modules
  require(['jquery', 'codemirror', 'keymap', 'mode/gtrtab'],
  function($, CodeMirror, keymap){
    var tab = CodeMirror(document.getElementById('tab'), {
      lineNumbers: false,
      mode: 'gtrtab',
      theme: 'gtrtab',
      value: '\n'
    });


    tab.stringsPerStave = $('#input-strings').val();

    // register keymap
    keymap(tab);

    // log instance for debug
    console.log('CMInstance:', tab);
    window.TAB = tab;
    window.CM = CodeMirror;

    function maintainSize() {
      tab.setSize('100%', $(window).height() - $('.navbar').height());
    }
    $(window).resize(maintainSize);
    $(document).ready(maintainSize);
    $('#input-strings').change(function() {
      tab.stringsPerStave = $(this).val();
    });
    $('#btn-overwrite').click(function() {
      tab.handleOverwriteToggle();
      tab.focus();
    });
  });



})();
