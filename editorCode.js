$(function () {
  window.editor = ace.edit("editor");
  editor.setTheme("ace/theme/monokai");
  editor.getSession().setMode("ace/mode/javascript");

  // focus on the editor;
  editor.focus();
  
  // setting values: setValue completely replaces
  // editor.setValue("am i replacing?");

  // getting values and is just adding to the next. PERFECT!
  // console.log(editor.getValue());
  // var text = editor.getValue();
  // text += "\n var test = 'the next line?';";

  // small window
  $('#editor').width(450);
  $('#editor').height(window.innerHeight);

  // get text from previous line, and then returns cursor to original position
  // *TODO right now pressing enter in the middle of a line will split the line, should not do that
  var getPreviousLine = function () {
    editor.selection.moveCursorLineStart();
    editor.selection.selectLineEnd();
    // takes care of trailing spaces
    var range = editor.selection.getRange();
    if (editor.session.getTextRange().charAt(range.end.column - 1) === ' ') {
      editor.selection.selectWordLeft();
    }
    var text = editor.session.getTextRange();
    console.log(text);
    editor.clearSelection();
    return text;
  };

  // addCommand completely prevents the default
  editor.commands.addCommand({
      name: 'bashEnter',
      bindKey: {mac: 'Enter'},
      exec: function (editor) {
        var cmd = getPreviousLine(editor);
        if (checkValidCommand(cmd)) {

          console.log ('valid command: ', cmd);

        // if it's not a valid command
        } else {
          console.log ('unrecognized command: ', cmd);
        }
        editor.insert('\n');
      },
      readOnly: true
  });

// end of document.ready
});

/***
 *      ____         __                                    
 *     |  _ \  ___  / _|  ___  _ __  ___  _ __    ___  ___ 
 *     | |_) |/ _ \| |_  / _ \| '__|/ _ \| '_ \  / __|/ _ \
 *     |  _ <|  __/|  _||  __/| |  |  __/| | | || (__|  __/
 *     |_| \_\\___||_|   \___||_|   \___||_| |_| \___|\___|
 *                                                         
 */

  // for enter key
  // editor.getSession().on('change', (function (e) {
  //   // if the enter key is pressed
  //   if (e.data.text === '\n') {
  //     console.log('enter key happend');
  //     // check previous line
  //     var command = getPreviousLine();
  //     if (checkValidCommand(command)) {
  //       console.log('valid command entered: ', command);
  //     } else {
  //       console.log ('unrecognized command, try again!', command);
  //     }
  //   }
  // }));


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


// // keydown captures commands, enter, options, etc AND letters
// // kepress
// function showKeyPress(evt) {
//   console.log("onkeypress handler: \n"
//     + "keyCode property: " + evt.keyCode + "\n"
//     + "which property: " + evt.which + "\n"
//     + "charCode property: " + evt.charCode + "\n"
//     + "Character Key Pressed: "
//     + String.fromCharCode(evt.charCode) + "\n"
//    );
// }

// function keyDown(evt) {
//   console.log("onkeydown handler: \n"
//     + "keyCode property: " + evt.keyCode + "\n"
//     + "which property: " + evt.which + "\n"
//    );
// }