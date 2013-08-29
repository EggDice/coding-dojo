var BASE_RULES = {
  '1': 'I',
  '5': 'V',
  '10': 'X',
  '50': 'L'
};

function normal2roman(normal) {
  if (!normal) { return ''; }
  var output = '';
  createRules(BASE_RULES).forEach(function(rule) {
    while (normal >= rule.value) {
      output += rule.symbol;
      normal -= rule.value;
    }
  });
  return output;
}

function createRules(baseRules) {
  var base_values = Object.keys(BASE_RULES).map(toInt);
  var rules = [];
  for (var i = 0, l = base_values.length; i < l; ++i) {
    var value = base_values[i];
    var nextValue = base_values[i + 1];
    var prevValue = base_values[i - 1];
    rules.push(createSimpleRule(value));
    if (i == l) { break; }
    if (is10exponent(value)) {
      rules.push(createComplexRule(nextValue, value));
    } else {
      rules.push(createComplexRule(nextValue, prevValue));
    }
  }
  return rules.sort(sortByValue);
}

function createComplexRule(biggerNumber, substractedNumber) {
  return {
    'value': biggerNumber - substractedNumber,
    'symbol': BASE_RULES[substractedNumber] + BASE_RULES[biggerNumber]
  };
}

function createSimpleRule(number) {
  return {
    'value': number,
    'symbol': BASE_RULES[number]
  };
}

function is10exponent(number) {
  var log = log10(number);
  return Math.floor(log) === log;
}

function log10(val) {
  return Math.log(val) / Math.LN10;
}

function sortByValue(a, b) {
  return b.value - a.value;
}

function toInt(string) {
  return parseInt(string, 10);
}
