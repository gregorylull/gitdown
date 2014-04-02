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
    if (msg !== '') {
      var newline = insertNewline ? '\n' : '';
      newMsg += newline + msg;
    }
  }
  return newMsg;
};

// return a new string with the first letter capitalized
var capFirst = function (string) {
  return string[0].toUpperCase() + string.substring(1);
};

/***
 *       ___    _         _     _____               
 *      / _ \  | |__     (_)   |  ___|  _ __    ___ 
 *     | | | | | '_ \    | |   | |_    | '_ \  / __|
 *     | |_| | | |_) |   | |   |  _|   | | | | \__ \
 *      \___/  |_.__/   _/ |   |_|     |_| |_| |___/
 *                     |__/                         
 */

// does not copy objects, completely moves ALL of them (so deletes original position)
var moveAllObj = function (fromObj, toObj) {
  // iterate through fromObj and change its properties
  for (var key in fromObj) {
    // do not change the name 
    if (key !== '_.name') {
      var file = fromObj[key];
      file.from = fromObj._name;
      file.status = toObj._name;

      // move to other object
      toObj[key] = file;

      // delete ref from FromObj
      delete fromObj[key];
    }
  }
};

// moves a single object from one location to another, changing its properties
var moveSingleObj = function (filename, fromObj, toObj, remove) {
  remove = remove || true;
  var key = filename;
  var file = fromObj[key];
  file.from = fromObj._name;
  file.status = toObj._name;

  // move to other object
  toObj[key] = file;

  // delete ref from FromObj
  if (remove) {
    delete fromObj[key];
  }
};

// extracts values from an object and returns an array or empty string if length === 0
var extractFilenameFromObj = function (targetObj, newline) {
  newline = newline || false;
  var array = [];
  // if targetObj is empty, return empty string
  if (Object.keys(targetObj).length === 0) {
    return '';
  }
  for (var key in targetObj) {
    if ( key !== '_name') {
      array.push(key);
    }
  }
  return array.join('\n');
};