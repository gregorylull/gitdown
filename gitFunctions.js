// gitFunctions.js


/***
 *       ____ _ _     ____  _        _             
 *      / ___(_) |_  / ___|| |_ __ _| |_ _   _ ___ 
 *     | |  _| | __| \___ \| __/ _` | __| | | / __|
 *     | |_| | | |_   ___) | || (_| | |_| |_| \__ \
 *      \____|_|\__| |____/ \__\__,_|\__|\__,_|___/
 *                                                 
 */

// change
// # On branch master
// # Changes to be committed:
// #   (use "git reset HEAD <file>..." to unstage)
// #
// # deleted:    test.js
// #
// # Changes not staged for commit:
// #   (use "git add <file>..." to update what will be committed)
// #   (use "git checkout -- <file>..." to discard changes in working directory)
// #
// # modified:   gitFunctions.js
// #
// # Untracked files:
// #   (use "git add <file>..." to include in what will be committed)
// #
// # test.js

var gitStatus = {
  toBeCommited: {},
  notStaged: {},
  unTracked: {},
};

/***
 *       ____ _ _                         
 *      / ___(_) |_   _ __ ___  ___  __ _ 
 *     | |  _| | __| | '_ ` _ \/ __|/ _` |
 *     | |_| | | |_  | | | | | \__ \ (_| |
 *      \____|_|\__| |_| |_| |_|___/\__, |
 *                                  |___/ 
 */

/*
  HARD CODE
  
  FOR THE PURPOSE OF HACKATHON, will focus ONLY on
    these 4 commands
*/

var gitHARD = {
  'git status' : function () {},
  'git commit' : function () {},
  'git push'   : function () {},
};

// for commands related to git
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
  'checkout' : true,
  defaults : true
};

// for commands related to ls
var listCommandsOptions = {
  l : function () {},
  defaults: function () {}
};

// lists all fake files in the editor and returns the list
var listFiles = function () {
  for (var i = 0; i < app.fakeFiles.length; i++) {
    editor.insert('\n');
    editor.selection.moveCursorLineStart();
    var file = app.fakeFiles[i];
    editor.insert(file);
  }
  // the below is not working
  // editor.insert('\n');
  // editor.selection.moveCursorLineStart();
  return app.fakeFiles;
};
// for the First command;
var bashCommands = {
  git  : gitCommandsOptions,
  ls   : listFiles
};


var gitIOtext = {
  help: "you need help!",
  clean: "nothing to commit, working directory clean",
  branchMaster: "# On branch master",
  notStaged: "# Changes not staged for commit:"
};

var checkValidCommand = function (textString) {
  var arr = parseStr(textString);
  console.log("valid arr? : ", arr);
  // make sure default command starts with 'git'
  if (!bashCommands.hasOwnProperty(arr[0])) {
    console.log('has own');
    return false;
    // return '-bash: ' + arr[0] + ': command not found';
  }

  // check if there are other commands (only two total so far)
  if (arr.length > 1) {
    console.log('2nd: ', bashCommands[arr[0]][arr[1]]);
    if (bashCommands[arr[0]][arr[1]]) {
      console.log('check other');
      return true;
    // if other commands after the first does not exist / typo 
    } else {
      return false;
    }
  // if there's only one item  
  } else {
    return true;
  }
};