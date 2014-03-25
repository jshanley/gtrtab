define(function() {
  return function(tab) {

    tab.addNewLines = function(number) {
      console.log('addNewLines called:', number)
      var start = tab.getCursor();
      tab.execCommand('goDocEnd');
      for (var line = 0; line < number; line++) {
        tab.replaceSelection('\n');
      }
      tab.setCursor(start);
    };

    tab.getStaveTop = function() {
      console.log('getStaveTop called.', tab.getCursor());
      var start = tab.getCursor();
      var marks = tab.findMarksAt(start);
      if (marks.length === 0) {
        return null;
      } else {
        return marks[0].find();
      }
    };

    tab.isStave = function(line) {
      console.log('isStave called:', line);
      var marks = tab.findMarksAt({ line: line, ch: 0 });
      if (marks.length > 0) {
        if (marks[0].title === 'tab-stave') {
          return true;
        } else {
          return false;
        }
      } else {
        return false;
      }
    };

    tab.appendAcrossStave = function(text) {
      console.log('appendAcrossStave called:', text);
      var start = tab.getCursor();
      var pos = start;
      if (!tab.isStave(start.line)) {
        pos = tab.addStave(pos);
      }
      var top = tab.getStaveTop();
      console.log('top:', top);
      var mark = tab.findMarks(top.from, top.to)[0];
      for (var line = 0; line < mark.numStrings; line++) {
        tab.setCursor(top.from.line + line, pos.ch);
        tab.replaceSelection(text);
      }
      tab.setCursor(start.line, pos.ch + text.length);
    };

    tab.addStave = function(pos) {
      console.log('addStave called:', pos);
      tab.setCursor(pos);
      for (var line = 0; line < tab.stringsPerStave; line++) {
        tab.addLineClass(tab.getLineHandle(tab.getCursor().line), 'text', 'tab-stave');
        tab.replaceSelection('|\n');
      }
      tab.markText(
        { line: pos.line, ch: 0 },
        { line: pos.line + (tab.stringsPerStave - 1), ch: 1 },
        {
          inclusiveLeft: false,
          inclusiveRight: false,
          clearWhenEmpty: false,
          title: 'tab-stave',
          numStrings: tab.stringsPerStave
        }
      );
      tab.setCursor(pos.line, pos.ch + 1);
      console.log(tab.getLineHandle(tab.getCursor().line));
      return tab.getCursor();
    };

    tab.handleEnterPress = function() {
      var lineCount = tab.lineCount();
      var here = tab.getCursor();
      while (tab.isStave(here.line)) {
        if (here.line === tab.getStaveTop().from.line && here.ch === 0) {
          break;
        }
        if (lineCount >= here.line + 1) {
          tab.setCursor(here.line + 1, here.ch);
          here = tab.getCursor();
        } else {
          tab.execCommand('goLineEnd');
          break;
        }
      }
      tab.replaceSelection('\n');
    };

  };
});
