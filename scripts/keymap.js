define(function() {
	return function(tab) {
		tab.addKeyMap({
			'Tab': function(cm) {
				var start = cm.doc.getCursor();
				if (cm.doc.lineCount() < start.line + 6) {
					cm.execCommand('goDocEnd');
					for (var l = cm.doc.lineCount(); l < (start.line + 6); l++) {
						cm.doc.replaceSelection('\n');
					}
					cm.doc.setCursor(start);
				}
				for (var c = start.line; c < (start.line + 6); c++) {
				  cm.doc.setCursor(c, start.ch);
				  cm.doc.replaceSelection('--');
				}
				cm.doc.setCursor(start.line, start.ch + 2);
			},
			'Ctrl-B': function(cm) {
				cm.doc.replaceSelection('|');
			}
	    });
	};
});