// gitFunctions.js

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

    var gitIOtext = {
    help: "you need help!",
    clean: "nothing to commit, working directory clean",
    branchMaster: "# On branch master",
    notStaged: "# Changes not staged for commit:"
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