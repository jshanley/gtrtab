(function() {

  require.config({
    baseUrl: 'scripts',
    paths: {
      codemirror: '../vendor/codemirror/lib/codemirror'
    }
  });

  // load CodeMirror and the 'gtrtab' mode
  require(['codemirror', 'mode/gtrtab'],
  function(CodeMirror){
    var tab = CodeMirror(document.getElementById('tab'), {
      lineNumbers: false,
      mode: 'gtrtab',
      theme: 'gtrtab'
    });

    CodeMirror.keyMap['Ctrl-Q'] = function(cm) {
      console.log('Ctrl-Q Pressed');
    };
  });

})();
