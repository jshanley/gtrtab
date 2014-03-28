define(['jquery', 'codemirror'], function($,CM) {
  return function(tab) {

    tab.addNewLines = function(number) {
      //console.log('addNewLines called:', number);
      var start = tab.getCursor();
      tab.execCommand('goDocEnd');
      for (var line = 0; line < number; line++) {
        tab.replaceSelection('\n');
      }
      tab.setCursor(start);
    };

    tab.getStaveTop = function() {
      //console.log('getStaveTop called.', tab.getCursor());
      var here = tab.getCursor();
      if (!tab.isStave(here.line)) {
        return null;
      } else {
        var line = here.line;
        while(tab.isStave(line)) {
          if (line === 0) {
            return line;
          }
          line -= 1;
        }
        return line + 1;
      }
    };

    tab.isStave = function(line) {
      var handle = tab.getLineHandle(line) || {};
      if (handle.styles) {
        for (var s = 0; s < handle.styles.length; s++) {
          if (handle.styles[s] === 'line-string dash') {
            return true;
          }
        }
      }
      return false;
    };

    tab.appendAcrossStave = function(text) {
      console.log('appendAcrossStave called:', text);
      var here = tab.getCursor();
      if (!tab.isStave(here.line)) {
        here = tab.addStave(here);
      }
      var top = tab.getStaveTop();
      console.log('top:', top);
      for (var line = top; tab.isStave(line); line++) {
        tab.setCursor(line, here.ch);
        tab.replaceSelection(text);
      }
      tab.setCursor(here.line, here.ch + text.length);
    };

    tab.addStaveHere = function() {
      var here = tab.getCursor();
      // avoid adding stave to existing stave
      if (tab.isStave(here.line)) {
        tab.goStaveEnd();
        tab.replaceSelection('\n\n');
        here = tab.getCursor();
      }
      // disallow adding stave directly under existing stave
      //   and require creation at line start
      if (tab.isStave(here.line - 1) || here.ch > 0) {
        tab.replaceSelection('\n');
        here = tab.getCursor();
      }

      for (var line = 0; line < tab.stringsPerStave; line++) {
        tab.addLineClass(here.line + line, 'wrap', 'stave');
        tab.replaceSelection('|----\n');
      }
      tab.setCursor(CM.Pos(here.line, here.ch + 5));
      return tab.getCursor();
    };

    tab.handleBarCharacterPress = function() {
      var here = tab.getCursor();
      if (tab.isStave(here.line)) {
        tab.appendAcrossStave('|');
      } else {
        tab.replaceSelection('|');
      }
    };

    tab.handleDashCharacterPress = function() {
      tab.replaceSelection('-');
    };

    tab.handleEnterPress = function() {
      var here = tab.getCursor();
      // if we're at the beginning of the top line of a stave, just linebreak
      if ((here.line === tab.getStaveTop()) && here.ch === 0) {
        tab.replaceSelection('\n');
        return;
      }
      tab.goStaveEnd();
      tab.replaceSelection('\n');
    };

    tab.goStaveEnd = function() {
      var here = tab.getCursor();
      if (!tab.isStave(here.line)) {
        return;
      } else {
        var line = here.line;
        while(tab.isStave(line + 1)) {
          line += 1;
        }
        tab.setCursor(line);
        tab.execCommand('goLineEnd');
      }
    };

    tab.setCursorAcrossStave = function() {
      // if there are already multiple selections revert to single selection
      if (tab.getSelections().length > 1) {
        tab.setSelection(tab.getCursor());
        return;
      }
      var here = tab.getCursor();
      if (!tab.isStave(here.line)) {
        return;
      } else {
        var top = tab.getStaveTop();
        var line = top;
        while (tab.isStave(line)) {
          tab.addSelection(CM.Pos(line, here.ch), CM.Pos(line, here.ch));
          line++;
        }
        // finally add the original position to make it primary
        tab.addSelection(here);
      }
    };

    tab.handleOverwriteToggle = function() {
      $('#btn-overwrite').toggleClass('active');
      tab.toggleOverwrite();
    };

  };
});
