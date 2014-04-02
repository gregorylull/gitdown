$(function () {

/***
 *       ____             __ _       
 *      / ___|___  _ __  / _(_) __ _ 
 *     | |   / _ \| '_ \| |_| |/ _` |
 *     | |__| (_) | | | |  _| | (_| |
 *      \____\___/|_| |_|_| |_|\__, |
 *                             |___/ 
 */
 
  // editor setup
  window.editor = ace.edit("editor");
  editor.setTheme("ace/theme/monokai");
  editor.getSession().setMode("ace/mode/javascript");

  // other additional setup
  editorConfig(editor);

  // small window
  $('#editor').width(450);
  $('#editor').height(window.innerHeight);

  // d3 setup
  window.svg = d3.select('svg');

  // prevent contamination of namespace
  var app = window.app;
  
/***
 *      ___       _ _   
 *     |_ _|_ __ (_) |_ 
 *      | || '_ \| | __|
 *      | || | | | | |_ 
 *     |___|_| |_|_|\__|
 *                      
 */

  // create a Grid through D3
  createGrid()

  // focus on the editor so user can immediately start typing
  editor.focus();

  // create an array of fake files on startup
  app.fakeFiles = createFakeFiles(10, true);
  app.gitFiles  = convertToGit(app.fakeFiles);
  sortGitFiles(app.gitFiles);

/***
 *       ____                      
 *      / ___| __ _ _ __ ___   ___ 
 *     | |  _ / _` | '_ ` _ \ / _ \
 *     | |_| | (_| | | | | | |  __/
 *      \____|\__,_|_| |_| |_|\___|
 *                                 
 */





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