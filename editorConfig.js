// editorConfig.js

var editorConfig = function (editor) {

/***
 *         _       _     _    ____ __  __ ____  
 *        / \   __| | __| |  / ___|  \/  |  _ \ 
 *       / _ \ / _` |/ _` | | |   | |\/| | | | |
 *      / ___ \ (_| | (_| | | |___| |  | | |_| |
 *     /_/   \_\__,_|\__,_|  \____|_|  |_|____/ 
 *                                              
 */

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

// end of editor config
};