define(['commands'], function(commands) {

  return function(tab) {

    // register commands
    commands(tab);

    tab.addKeyMap({
      'Tab': function(tab) {
        var here = tab.getCursor();
        if (tab.isStave(here.line)) {
          tab.appendAcrossStave('----');
        } else {
          tab.addStaveHere();
        }
      },
      'Shift-\\': function(tab) {
        tab.handleBarCharacterPress();
      },
      '-': function(tab) {
        tab.handleDashCharacterPress();
      },
      'Enter': function(tab) {
        tab.handleEnterPress();
      },
      'Shift-Enter': function(tab) {
        tab.setCursorAcrossStave();
      },
      'Alt-O': function(tab) {
        tab.handleOverwriteToggle();
      }
    });

  };
});
