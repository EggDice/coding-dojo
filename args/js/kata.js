function parseArgs(args) {
  if (!args) {
    throw Error('No arguments provided');
  }
  var output = {};
  forEachSkipping(args, function(arg, nextArg) {
    var flagLetter = arg.charAt(1);
    if (nextArg && !isArgName(nextArg)) {
      if (isList(nextArg)) {
        output[flagLetter] = toList(nextArg);
      } else if (isInt(nextArg)) {
        output[flagLetter] = toInt(nextArg);
      } else {
        output[flagLetter] = nextArg;
      }
      return true;
    } else {
      output[flagLetter] = true;
      return false;
    }
  });
  return output;
}

function isList(string) {
  return string.indexOf(',') > -1;
}

function toList(string) {
  return string.split(',');
}

function toInt(string) {
  return parseInt(string, 10);
}

function isInt(string) {
  return !Number.isNaN(toInt(string));
}

function isArgName(string) {
  return ((typeof string) === 'string') && string.charAt(0) === '-';
}

function forEachSkipping(array, iterator) {
  for (var i = 0, l = array.length; i < l; ++i) {
    if (iterator(array[i], array[i + 1], array)) {
      ++i;
    }
  }
}
