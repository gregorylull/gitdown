// helperFunctions.js

// another person's shuffle function, found on stackoverflow
//+ Jonas Raoni Soares Silva
//@ http://jsfromhell.com/array/shuffle [v1.0]
var shuffle = function(o) { //v1.0
  for(var j, x, i = o.length; i; j = Math.floor(Math.random() * i), x = o[--i], o[i] = o[j], o[j] = x);
  return o;
};

// removes spaces and semicolons, only returns arr of words and flags
var parseStr = function (string) {
  var arr = string.split(/[ ;]/g);
  return arr;
};

var createFakeFiles = function (n, includeLong) {
  n = n || 5;
  includeLong = includeLong || false;
  
  var fileArray = [];

  // capitalize the first letters
  var capFirst = function (string) {
    return string[0].toUpperCase() + string.substring(1);
  };

  // refactor into arnold words?
  var verbs = ['get', 'is', 'create', 'move', 'change', 'take'];
  var names = ['david', 'greg', 'charles', 'fred', 'paul', 'will', 'pavan'];
  var nouns = ['file', 'cat', 'dog', 'house', 'employee', 'disaster', 'log'];
  var option = ['description', 'number', 'address', 'documentation', 'information', 'referenece'];
  var ext   = ['.txt', '.js', '.doc', '.html', '.bogus'];


  // short words = TWO category + extension
  // *TODO refactor to just take a random number
  for (var i = 0; i < n; i++) {
    shuffle(verbs);
    shuffle(names);
    shuffle(nouns);
    shuffle(option);
    shuffle(ext);

    // long words  = ALL category + extension
    var msg = '';
    if (includeLong) {
      msg += capFirst(nouns[0]) + capFirst(option[0]);
    }

    fileArray.push(verbs[0] + capFirst(names[0]) + msg + capFirst(ext[0]));
  }

  return fileArray;
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