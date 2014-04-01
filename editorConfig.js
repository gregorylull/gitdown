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