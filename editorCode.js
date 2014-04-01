

$(function () {
  window.editor = ace.edit("editor");
  editor.setTheme("ace/theme/monokai");
  editor.getSession().setMode("ace/mode/javascript");

  // setting values: setValue completely replaces
  // editor.setValue("am i replacing?");

  // getting values and is just adding to the next. PERFECT!
  // console.log(editor.getValue());
  // var text = editor.getValue();
  // text += "\n var test = 'the next line?';";

  // small window
  $('#editor').width(450);
  $('#editor').height(250);

  /*
    GIT MESSAGES
  */

  var gitIOtext = {
    "git status": function (gitStatus) {
        if (true) {

        }
    },
    clean: "nothing to commit, working directory clean",
    branchMaster: "# On branch master",
    notStaged: "# Changes not staged for commit:"
  };

  var connectMessages = function () {
    var newMsg = '';
    for (var i = 0; i < arguments.length; i++) {
        var msg = arguments[i];
        empty += '\n' + msg;
    }
    return newMsg;
  };

  // get text from previous line, and then returns cursor to original position
  // *TODO right now pressing enter in the middle of a line will split the line, should not do that
  var getPreviousLine = function () {
    editor.selection.moveCursorLineStart();
    editor.selection.selectLineEnd();
    var text = editor.session.getTextRange();
    editor.clearSelection();
    return text;
  };

  // for enter key
  editor.getSession().on('change', (function (e) {
    // if the enter key is pressed
    if (e.data.text === '\n') {
      // check previous line
      // debugging
      var command = getPreviousLine();
      console.log('enter key happend, text: ', command);
    }
  }));

  // addCommand completely prevents the default
  // editor.commands.addCommand({
  //     name: 'bashEnter',
  //     bindKey: {mac: 'Enter'},
  //     exec: function (editor) {
  //       getPreviousLine(editor);
  //     },
  //     readOnly: true
  // });

  // $(document).keypress(function(event){
  //     var keycode = (event.keyCode ? event.keyCode : event.which);
  //     if (keycode == '13') {
  //         console.log('enter key was pressed');
  //         editor.insert('something after enter?');
  //     }
  // });

  // editor event binding
  // on change will trigger for both user AND editor, so maybe use keyup/keydown/press, etc.
  // on testing, change will not trigger if i inserted
  // editor.getSession().on('change', function(event) {
  //     console.log('event: ', event);
  //     if (event.data.text === '\n') {
  //         console.log('enter key was pressed');
  //         console.log('enter key: ', event.data.text.charCodeAt(0));
  //     }
  // });

  // // test shows editor cannot handle multiple inputs
  // editor.moveCursorTo(2, 2);

  // editor.insert('a');
  // editor.insert('\n');

// end of document.ready
});