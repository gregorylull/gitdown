// gitFunctions.js

  /*
    GIT MESSAGES
  */

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
  l : function () {

  },
  
  defaults: function () {

  }
};

// for the First command;
var bashCommands = {
  git  : gitCommandsOptions,
  ls   : listCommandsOptions
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

  // check other commands
  console.log('2nd: ', bashCommands[arr[0]][arr[1]]);
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