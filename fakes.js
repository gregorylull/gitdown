// fakes.js

// returns an array of random filenames with .ext
var createFakeFiles = function (n, includeLong) {
  n = n || 5;
  includeLong = includeLong || false;
  
  var fileArray = [];

  // refactor into arnold words?
  var verbs = ['get', 'is', 'create', 'move', 'change', 'take', 'delete', 'make', 'inc'];
  var names = ['david', 'greg', 'charles', 'fred', 'paul', 'will', 'pavan'];
  var nouns = ['file', 'cat', 'dog', 'house', 'employee', 'disaster', 'log', 'purchase'];
  var options = ['description', 'number', 'address', 'documentation', 'information', 'referenece'];
  var ext   = ['.txt', '.js', '.doc', '.html', '.png', '.css'];


  // short words = TWO category + extension
  // *TODO refactor to just take a random number
  for (var i = 0; i < n; i++) {
    var rVerbs = rand(verbs.length);
    var rNames = rand(names.length);
    var rNouns = rand(nouns.length);
    var rOptions = rand(options.length);
    var rExt = rand(ext.length);

    // long words  = ALL category + extension
    var msg = '';
    if (includeLong && i > Math.floor(n/2)) {
      msg += capFirst(nouns[rNouns]) + capFirst(options[rOptions]);
    }

    fileArray.push(
      '' 
      + verbs[rVerbs] 
      + capFirst(names[rNames]) 
      + msg 
      + ext[rExt]
      );
  }

  return fileArray;
};