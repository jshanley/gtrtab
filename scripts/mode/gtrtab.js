(function(mod) {
  if (typeof exports === 'object' && typeof module === 'object') {
    // commonjs-node
    mod(require('codemirror'));
  } else if (typeof define === 'function' && define.amd) {
    // amd-requirejs
    define(['codemirror'], mod);
  } else {
    // standalone-browser
    mod(CodeMirror);
  }
})(function(CodeMirror) {
  'use strict';

  CodeMirror.defineMode('gtrtab', function(config, parserConfig) {
    var TOKEN_NAMES = {
      '/': 'slide up',
      '\\': 'slide down',
      'b': 'bend',
      's': 'slide',
      'h': 'hammer',
      'p': 'pull',
      '|': 'barline',
      '^': 'bend',
      'v': 'bend',
      '~': 'vibrato'
    };
    return {
      token: function(stream) {
        if (stream.eatSpace()) {
          return null;
        }
        if (stream.match(/^\-+/)) {
          return 'line-stave dash';
        }

        if (stream.match(/^\([0-9]+\)/)) {
          return 'implied';
        }

        if (stream.match(/^[0-9]+(?!\))/)) {
          return 'fret';
        }

        var t = stream.eat(function(c){
          return (c in TOKEN_NAMES);
        });
        if (t){
          return (TOKEN_NAMES[t]);
        }
        stream.next();
      }
    };
  });
});
