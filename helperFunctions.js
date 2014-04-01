// helperFunctions.js

/***
 *      _____    _ _ _               _____          
 *     | ____|__| (_) |_ ___  _ __  |  ___| __  ___ 
 *     |  _| / _` | | __/ _ \| '__| | |_ | '_ \/ __|
 *     | |__| (_| | | || (_) | |    |  _|| | | \__ \
 *     |_____\__,_|_|\__\___/|_|    |_|  |_| |_|___/
 *                                                  
 */

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


/***
 *      ____  _          _____          
 *     / ___|| |_ _ __  |  ___| __  ___ 
 *     \___ \| __| '__| | |_ | '_ \/ __|
 *      ___) | |_| |    |  _|| | | \__ \
 *     |____/ \__|_|    |_|  |_| |_|___/
 *                                      
 */

// another person's shuffle function, found on stackoverflow
//+ Jonas Raoni Soares Silva
//@ http://jsfromhell.com/array/shuffle [v1.0]
var shuffle = function(o) { //v1.0
  for(var j, x, i = o.length; i; j = Math.floor(Math.random() * i), x = o[--i], o[i] = o[j], o[j] = x);
  return o;
};

// returns a random number from 0 to max
var rand = function (max) {
  return Math.floor(Math.random()*max);
};

// removes spaces and semicolons, only returns arr of words and flags
var parseStr = function (string) {
  var arr = string.split(/[ ;]/g);
  return arr;
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

// return a new string with the first letter capitalized
var capFirst = function (string) {
  return string[0].toUpperCase() + string.substring(1);
};

