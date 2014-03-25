define(['commands'], function(registerTabCommands) {

  return function(tab) {

    registerTabCommands(tab);

    tab.addKeyMap({
      'Tab': function(tab) {
        tab.appendAcrossStave('----');
      },
      '-': function(tab) {
        tab.appendAcrossStave('-');
      },
      'Shift-\\': function(tab) {
        tab.appendAcrossStave('|');
      },
      'Enter': function(tab) {
        tab.handleEnterPress();
      },
      'K': function(tab) {
        tab.execCommand('goLineDown');
      }
    });

  };
});
