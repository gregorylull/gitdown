// editorConfig.js

var editorConfig = function (editor) {

/***
 *     __     ___               
 *     \ \   / (_) _____      __
 *      \ \ / /| |/ _ \ \ /\ / /
 *       \ V / | |  __/\ V  V / 
 *        \_/  |_|\___| \_/\_/  
 *                              
 */
  var configs = {
    renderer : {
      setShowGutter: false,
      setShowPrintMargin: false
    }
  };

  // document.getElementById('editor').style.fontSize='12px';

  
  var executeConfigs = function (configs) {
    for (module in configs) {
      for (item in configs[module]) {
        var val = configs[module][item];
        console.log('setting: ', item, 'val: ', val);
        editor[module][item](val);
      }
    }
  };

  executeConfigs(configs);

/***
 *      _____          _                       
 *     |  ___|__  __ _| |_ _   _ _ __ ___  ___ 
 *     | |_ / _ \/ _` | __| | | | '__/ _ \/ __|
 *     |  _|  __/ (_| | |_| |_| | | |  __/\__ \
 *     |_|  \___|\__,_|\__|\__,_|_|  \___||___/
 *                                             
 */

  // returns an array of common characters of multiple string in order
  var commonChars = function () {
    // compare one string against all the rest
    var master = arguments[0].split('');

    // compares two arrays, set the master's elements to null if not the same
    var checkArrays = function (master, arr) {
      for (var i = 0; i < master.length; i++ ) {
        if (master[i] !== arr[i]) {
          master[i] = null;
        }
      }
      console.log('checkarrays master: ', master);
    };

    // compare all arrays against master array
    for (var i = 1; i < arguments.length; i++) {
      var splitArray = arguments[i].split('');
      checkArrays(master, splitArray);
    }

    // extract the similar ones, returns once a different char is reached
    var extract = [];
    for (var i = 0; i < master.length; i++) {
      if (master[i] === null) {
        return extract;
      } else {
        extract.push(master[i]);
      }
    }

    return extract;
  };

  // auto complete function, looks at fake list of files
  var autoTabComplete = function (sEditor) {
    editor = sEditor || editor;
    // selects the word just typed
    editor.selection.selectAWord();
    var text = editor.session.getTextRange();
    // this regexp matches whatever the author has entered
    var regexp = new RegExp('^' + text + '[a-zA-Z0-9.]*', 'g', 'i');
    console.log('text: ', text);
    console.log('regexp: ', regexp);

    // finds all matching words
    var matchingWords = [];
    console.log('fake: ', app.fakeFiles);
    for (var i = 0; i < app.fakeFiles.length; i++) {
      var fileName = app.fakeFiles[i];
      if(fileName.match(regexp) !== null) {
        matchingWords.push(fileName);
      }
    }

    console.log('matchingWords arr: ', matchingWords);
    // if more than one item, get the superset and replace matching words
    if (matchingWords.length > 1) {
      var matchingWords = commonChars.apply(this, matchingWords);
      console.log('common: ', matchingWords.join(''));
    }
    var space = matchingWords.length > 1 ? '' : ' ';

    matchingWords = matchingWords.join('');
    console.log('new matching after join: ', matchingWords);
    // replace previously selected word
    editor.insert(matchingWords + space);

    // // after the matching process clears selection
    // editor.clearSelection();

    return matchingWords;
  };
/***
 *         _       _     _    ____ __  __ ____  
 *        / \   __| | __| |  / ___|  \/  |  _ \ 
 *       / _ \ / _` |/ _` | | |   | |\/| | | | |
 *      / ___ \ (_| | (_| | | |___| |  | | |_| |
 *     /_/   \_\__,_|\__,_|  \____|_|  |_|____/ 
 *                                              
 *  NOTE: addCommand completely intercepts prevents the default
 */

  var executeCmd = function (cmd) {
    console.log('executing cmd: ', cmd, ' [1] ', cmd[1]);

    var arr = parseStr(cmd);
    if (arr.length === 1) {
      bashCommands[arr[0]]();
    } else {
      // for add command
      if (arr[1] === 'add') {
        console.log('add executing: ', arr[1]);
        gitCommandsOptions.add(arr[2]);

      // if command is to get git status
      } else if (arr[1] === 'status'){
        console.log('status execute');
        gitCommandsOptions.status();
      }
    }
  };

  // 'enter' behavior is similar to bash environment, pressing anywhere executes command, and does not add add newline
  editor.commands.addCommand({
      name: 'bashEnter',
      bindKey: {mac: 'Enter'},
      exec: function (editor) {
        var cmd = getPreviousLine(editor);
        if (checkValidCommand(cmd)) {
          // execute command
          executeCmd(cmd);
          console.log ('valid command: ', cmd);

        // if it's not a valid command
        } else {
          console.log ('unrecognized command: ', cmd);
        }
        editor.insert('\n');
      },
      readOnly: true
  });

  // tab for auto completion of file names
  editor.commands.addCommand({
    name: 'tabAuto',
    bindKey: {mac: 'Tab'},
    exec: function (editor) {
      autoTabComplete(editor);
    },
    readOnly: true
  });

// end of editor config
};