/** @constructor */
function Args() {

}

Args.prototype.parse = function(args) {
  checkArgs(args);

  return _(args).
  groupTrailing(checkIfNotArgName).
  map(mapToParsedNameAndValuePairs).
  object().
  value();
};

function checkArgs(args) {
  if (!args) {
    throw Error('No arguments provided');
  }
}

function checkIfNotArgName(arg) {
  return !isArgName(arg);
}

function mapToParsedNameAndValuePairs(arg) {
  var argName = arg2argName(arg[0]);
  var value = getArgValue(arg[1]);
  return [argName, value];
}

function getArgValue(rawValue) {
  if (isList(rawValue)) {
    return toList(rawValue);
  } else if (isInt(rawValue)) {
    return toInt(rawValue);
  } else if (_.isString(rawValue)) {
    return rawValue;
  } else {
    return true;
  }
}

function arg2argName(arg) {
  if (arg.charAt(0) === '-' && arg.charAt(1) === '-') {
    return arg.substr(2);
  }
  if (arg.charAt(0) === '-') {
    return arg.charAt(1);
  }
  return arg;
}

function isArgName(string) {
  return ((typeof string) === 'string') &&
      string.charAt(0) === '-' &&
      !isInt(string);
}

function isList(string) {
  return !!string && string.indexOf(',') > -1;
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

function groupTrailing(array, iterator) {
  return array.reduce(function(acc, element, index, arr) {
    if (iterator(element, index, arr) && index) {
      _.last(acc).push(element);
    } else {
      acc.push([element]);
    }
    return acc;
  }, []);
}

_.mixin({'groupTrailing': groupTrailing});
