var BASE_RULES = {
  '1': 'I',
  '5': 'V',
  '10': 'X',
  '50': 'L',
  '100': 'C',
  '500': 'D',
  '1000': 'M'
};

var allRules = [];

function normal2roman(normal) {
  return convert();

  function convert() {
    checkArgument();
    return generateRules().reduce(reduceRule, '');
  }

  function checkArgument() {
    if (normal > 3000) {
      throw new Error('Argument bigger than 3000');
    }
    if (normal < 1) {
      throw new Error('Argument smaller than 1');
    }
  }

  function reduceRule(roman, rule) {
    while (normal >= rule.value) {
      roman += rule.symbol;
      normal -= rule.value;
    }
    return roman;
  }
}

function roman2normal(roman) {
  return convert();

  function convert() {
    var rules = generateRules();
    return rules.sort(function(a, b) {
      return a.value - b.value;
    }).map(function(rule) {
      return {
        'value': rule.value,
        'regexp': new RegExp(rule.symbol + '$')
      };
    }).reduce(function(normal, rule) {
      var match;
      while (match = roman.match(rule.regexp)) {
        roman = roman.substr(0, match.index);
        normal += rule.value;
      }
      return normal;
    }, 0);
  }
}

function generateRules() {
  if (!allRules.length) {
    var baseValues = Object.keys(BASE_RULES).map(toInt);
    createRulesByBaseValues(baseValues);
    allRules.sort(sortByValue);
  }
  return allRules;
}

function toInt(string) {
  return parseInt(string, 10);
}

function createRulesByBaseValues(baseValues) {
  for (var i = 0, l = baseValues.length; i < l; ++i) {
    var value = baseValues[i];
    var nextValue = baseValues[i + 1];
    var prevValue = baseValues[i - 1];
    addSimpleRule(value);
    if (i + 1 !== l) {
      addComplexRule(value, nextValue, prevValue);
    }
  }
}

function addSimpleRule(value) {
  allRules.push(createSimpleRule(value));
}

function addComplexRule(value, nextValue, prevValue) {
  if (is10exponent(value)) {
    allRules.push(createComplexRule(nextValue, value));
  } else {
    allRules.push(createComplexRule(nextValue, prevValue));
  }
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
