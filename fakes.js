// fakes.js

// returns an array of random filenames with .ext
var createFakeFiles = function (n, includeLong) {
  n = n || 5;
  includeLong = includeLong || false;
  
  var fileArray = [];

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