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
  $('#editor').height(70);

  /*
    GIT MESSAGES
  */
  var gitCommandsOptions = {
    'commit' : true,
    'status' : true,
    'push'   : true,
    'help'   : true,
    'diff'   : true,
    'add'    : true,
    'remote' : true,
    'rm'     : true,
    'mv'     : true,
    'checkout' : true
  };
  
  // another person's shuffle function, found on stackoverflow
  //+ Jonas Raoni Soares Silva
  //@ http://jsfromhell.com/array/shuffle [v1.0]
  function shuffle(o){ //v1.0
      for(var j, x, i = o.length; i; j = Math.floor(Math.random() * i), x = o[--i], o[i] = o[j], o[j] = x);
      return o;
  };

  var createFakeFiles = function (n, includeLong) {
    n = n || 5;
    includeLong = includeLong || false;
    
    var fileArray = [];

    // capitalize the first letters
    var capFirst = function (string) {
      return string[0].toUpperCase() + string.substring(1);
    };

    // refactor into arnold words?
    var verbs = ['get', 'is', 'create', 'move', 'change', 'take'];
    var names = ['david', 'greg', 'charles', 'fred', 'paul', 'will', 'pavan'];
    var nouns = ['file', 'cat', 'dog', 'house', 'employee', 'disaster', 'log'];
    var option = ['description', 'number', 'address', 'documentation', 'information', 'referenece'];
    var ext   = ['.txt', '.js', '.doc', '.html', '.bogus'];


    // short words = TWO category + extension
    // *TODO refactor to just take a random number
    for (var i = 0; i < n; i++) {
      shuffle(verbs);
      shuffle(names);
      shuffle(nouns);
      shuffle(option);
      shuffle(ext);

      // long words  = ALL category + extension
      var msg = '';
      if (includeLong) {
        msg += capFirst(nouns[i]) + capFirst(option[i]);
      }

      fileArray.push(verbs[i] + capFirst(names[i]) + msg + capFirst(ext[i]));
    }

    return fileArray;
  };

  console.log(createFakeFiles(3));

  var gitIOtext = {
    help: "you need help!",
    clean: "nothing to commit, working directory clean",
    branchMaster: "# On branch master",
    notStaged: "# Changes not staged for commit:"
  };

  // inserts a newline at the end of the message
  var connectMessages = function (insertNewline) {
    insertNewline = insertNewline || false;
    var newMsg = '';
    for (var i = 1; i < arguments.length; i++) {
        var msg = arguments[i];
        var newline = insertNewline ? '\n' : '';
        empty += newline + msg;
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

  var checkValidCommand = function (textString) {
    var arr = textString.split(/[ ;]/);
    console.log("valid arr? : ", arr);
    // make sure default command starts with 'git'
    if (arr[0] !== 'git') {
      return false;
      // return '-bash: ' + arr[0] + ': command not found';
    }

    // check other commands
    if (gitCommandsOptions[arr[1]]) {
      return true;
    }

    // if the command is not valid;
    return false;
  };

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

  // execute command 
  var gitCommit = function () {
  };

  // addCommand completely prevents the default
  editor.commands.addCommand({
      name: 'bashEnter',
      bindKey: {mac: 'Enter'},
      exec: function (editor) {
        var cmd = getPreviousLine(editor);
        if (checkValidCommand(cmd)) {
          console.log ('valid command: ', cmd);
        } else {
          console.log ('unrecognized command: ', cmd);
        }
        editor.insert('\n');
      },
      readOnly: true
  });

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