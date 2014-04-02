// gitFunctions.js


/***
 *       ____ _ _     ____  _        _             
 *      / ___(_) |_  / ___|| |_ __ _| |_ _   _ ___ 
 *     | |  _| | __| \___ \| __/ _` | __| | | / __|
 *     | |_| | | |_   ___) | || (_| | |_| |_| \__ \
 *      \____|_|\__| |____/ \__\__,_|\__|\__,_|___/
 *                                                 
 */

// # On branch master
// # Your branch is ahead of 'origin/master' by 1 commit.
// #   (use "git push" to publish your local commits)
// #
// # Changes not staged for commit:
// #   (use "git add <file>..." to update what will be committed)
// #   (use "git checkout -- <file>..." to discard changes in working directory)
// #
// # modified:   editorConfig.js
// # modified:   gitFunctions.js
// # modified:   helperFunctions.js
// #
// # Untracked files:
// #   (use "git add <file>..." to include in what will be committed)
// #
// # test.js

var gitStatus = {
  toBeCommited: {_name: 'toBeCommited'},
  notStaged: {_name: 'notStaged'},
  unTracked: {_name: 'unTracked'},
};

// files have properties attached to them
var convertToGit = function (arrayOfStrings) {
  var obj = {_name: 'initial'};

  for (var i = 0; i < arrayOfStrings.length; i++) {
    var file = arrayOfStrings[i];
    var fileObj = {};
    fileObj.file = file;
    fileObj.tracked = false;
    fileObj.from = null;
    fileObj.status = null;
    obj[file] = fileObj;
  }
  console.log('convert to git: ', obj);
  return obj;
};

var sortGitFiles = function (gitFiles) {
  console.log('sort gif files', gitFiles);
  for (var key in gitFiles) {
    var file = gitFiles[key];
    if (file.tracked === false) {
      moveSingleObj (key, gitFiles, gitStatus.unTracked, true)
    }
  }
};

var getGitStatus = function () {
  var staged = extractFilenameFromObj(gitStatus.toBeCommited);
  staged = (staged !== '') ? gitIOtext.staged + '\n' + staged : staged;

  var notStaged = extractFilenameFromObj(gitStatus.notStaged);
  notStaged = (notStaged !== '') ? gitIOtext.notStaged + '\n' + notStaged : notStaged;

  var unTracked = extractFilenameFromObj(gitStatus.unTracked);
  unTracked = (unTracked !== '') ? gitIOtext.unTracked + '\n' + unTracked : unTracked;

  var msg = connectMessages(true, gitIOtext.branchMaster, staged, notStaged, unTracked);
  console.log('gitStatus msg: ', msg);

  // insert into editor
  editor.insert(msg);

  return msg;
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

var gitIOtext = {
  help: "you need help!",
  clean: "nothing to commit, working directory clean",
  branchMaster: "# On branch master",
  notStaged: "# Changes not staged for commit:",
  staged: "# Changes to be committed:",
  unTracked: "# Untracked files:"
};

var gitHARD = {
  'git status' : function () {},
  'git commit' : function () {},
  'git push'   : function () {},
};

var gitAdd = function (filename) {
  console.log('git add execute: ', filename);
  if (filename === '.') {
    moveAllObj(gitStatus.notStaged, gitStatus.toBeCommited);
    moveAllObj(gitStatus.unTracked, gitStatus.toBeCommited);
  } else {
    if (gitStatus.notStaged[filename]) {
      moveSingleObj(filename, gitStatus.notStaged, gitStatus.toBeCommited);
      return;
    }
    if (gitStatus.unTracked[filename]) {
      moveSingleObj(filename, gitStatus.unTracked, gitStatus.toBeCommited);
    }
  }
};


// for commands related to git
var gitCommandsOptions = {
  'commit' : true,
  'status' : getGitStatus,
  'push'   : true,
  'help'   : true,
  'diff'   : true,
  'add'    : gitAdd,
  'remote' : true,
  'rm'     : true,
  'mv'     : true,
  'checkout' : true,
  defaults : true
};

/***
 *      _                                  _ 
 *     | |  ___      ___   _ __ ___     __| |
 *     | | / __|    / __| | '_ ` _ \   / _` |
 *     | | \__ \   | (__  | | | | | | | (_| |
 *     |_| |___/    \___| |_| |_| |_|  \__,_|
 *                                           
 */

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

// for commands related to ls
var listCommandsOptions = {
  l : function () {},
  defaults: function () {}
};

// for the First command;
var bashCommands = {
  git  : gitCommandsOptions,
  ls   : listFiles
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