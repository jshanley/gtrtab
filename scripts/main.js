(function() {

  require.config({
    'baseUrl': 'scripts',
    'paths': {
      'drive-api': 'https://apis.google.com/js/client.js?onload=handleClientLoad',
      'jquery': '../vendor/jquery/dist/jquery.min',
      'codemirror': '../vendor/codemirror/lib/codemirror'
    }
  });

  // load CodeMirror and the 'gtrtab' mode
  // load jQuery and the 'chosen' plugin
  // load local modules
  require([
    'jquery',
    'codemirror',
    'mode/gtrtab',
    'gdrive'
  ],
  function($, CodeMirror){

    // create cm instance
    var tab = CodeMirror(document.getElementById('tab'), {
      lineNumbers: false,
      mode: 'gtrtab',
      theme: 'gtrtab',
      value: '\n'
    });

    // register keymap
    require(['keymap'], function(keymap) {
      keymap(tab);
    });

    // log instance for debug
    console.log('CMInstance:', tab);
    window.TAB = tab;
    window.CM = CodeMirror;

    // dom ready
    $(document).ready(function() {
      // handle sizing of the tab editor
      tab.maintainSize = function() {
        var remainingHeight;
        if ($('.toolbar').is(':visible')) {
          remainingHeight = $(window).height() - $('.navbar').outerHeight() - $('.toolbar').outerHeight();
        } else {
          remainingHeight = $(window).height() - $('.navbar').outerHeight();
        }
        tab.setSize('100%', remainingHeight);
      };
      tab.maintainSize();
      $(window).resize(tab.maintainSize);

      // setup toolbar
      require(['toolbar'], function(toolbar) {
        toolbar(tab);
      });

    });





  });



})();
