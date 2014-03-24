(function() {

  require.config({
    baseUrl: 'scripts',
    paths: {
      jquery: '../vendor/jquery/dist/jquery.min',
      codemirror: '../vendor/codemirror/lib/codemirror'
    }
  });

  // load CodeMirror and the 'gtrtab' mode
  require(['jquery', 'codemirror', 'keymap', 'mode/gtrtab'],
  function($, CodeMirror, keymap){
    var tab = CodeMirror(document.getElementById('tab'), {
      lineNumbers: false,
      mode: 'gtrtab',
      theme: 'gtrtab'
    });

    keymap(tab);

    function maintainSize() {
      tab.setSize('100%', $(window).height() - $('.navbar').outerHeight());
    }
    $(window).resize(maintainSize);
    maintainSize();
  });

  

})();
