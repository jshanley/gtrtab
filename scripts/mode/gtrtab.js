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
      's': 'slide'
    };
    return {
      token: function(stream) {
        console.log(stream);
        if (stream.eatSpace()) {
          return null;
        }
        if (stream.eat(/\-+/)) {
          return 'string';
        }
        if (stream.eat(/[0-9]+/)) {
          return 'fret';
        }
        if (stream.eat('||')) {
          return 'double bar';
        }
        if (stream.eat('|')) {
          return 'bar';
        }
        var t = stream.eat(function(char){
          return (char in TOKEN_NAMES);
        });
        if (t){
          return (TOKEN_NAMES[t]);
        }
        stream.next();
      }
    };
  });
});
