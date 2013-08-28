var BASE_RULES = {
  '1': 'I',
  '5': 'V',
  '10': 'X',
  '50': 'L'
};

function normal2roman(normal) {
  if (!normal) {
    return '';
  }
  var output = '';
  createRules(BASE_RULES).forEach(function(rule) {
    while (normal >= rule.value) {
      output += rule.symbol;
      normal -= rule.value;
    }
  });
  return output;
}

/*function log10(val) {
  return Math.log(val) / Math.LN10;
}

function is10exponent(number) {
  number
}*/

function createRules(baseRules) {
  var base_values = Object.keys(BASE_RULES).map(function(string) {
    return parseInt(string, 10);
  });
  var rules = [];
  for (var i = 0, l = base_values.length; i < l; ++i) {
    var value = base_values[i];
    var nextValue = base_values[i + 1];
    var prevValue = base_values[i - 1];
    rules.push({value: value, symbol: BASE_RULES[value]});
    if (i < l - 1) {
      if (base_values[i] == 10 || base_values[i] == 1) {
        rules.push({
          value: nextValue - value,
          symbol: BASE_RULES[value] + BASE_RULES[nextValue]
        });
      } else {
        rules.push({
          value: nextValue - prevValue,
          symbol: BASE_RULES[prevValue] + BASE_RULES[nextValue]
        });
      }
    }
  }
  return rules.sort(function(a, b) {
    return b.value - a.value;
  });
}

