
/** @typedef {Object.<function(string):*>} */
var MatcherObject;

/**
 * @param {!jstk.MatcherObject} matchObject
 * @param {string=} opt_default
 * @return {function(string):*}
 */
function matcher(matchObject, opt_default) {
  checkMatchObjectTypes_(matchObject);
  /** @type {string} */
  var defaultString = opt_default || '_default_';
  return function(matchString) {
    return invokeMatch_(matchObject, matchString, defaultString);
  }
}

/**
 * @private
 * @param {!Object} input
 * @return {boolean}
 */
function isAllKeyFunction_(input) {
  input = input || {};
  return Object.keys(input).some(function(key) {
    return _.isFunction(input[key]);
  });
}

/**
 * @private
 * @param {!jstk.MatcherObject} matchObject
 * @param {!string} matchString
 * @param {!string} defaultString
 * @return {*}
 */
 function invokeMatch_(matchObject, matchString, defaultString) {
  if (matchObject[matchString]) {
    return matchObject[matchString](matchString);
  } else {
    return matchObject[defaultString] &&
        matchObject[defaultString](matchString);
  }
}

/**
 * @private
 * @param {!jstk.MatcherObject} matchObject
 */
function checkMatchObjectTypes_(matchObject) {
  if (_.isObject(matchObject)) {
    throw new Error('Need a match object!');
  }
  if (isAllKeyFunction_(matchObject)) {
    throw new Error('Match object values need to be a function!');
  }
}

