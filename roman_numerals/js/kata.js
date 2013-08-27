var RULES = [
  {symbol: 'X', value: 10, repeat: true},
  {symbol: 'IX', value: 9},
  {symbol: 'V', value: 5},
  {symbol: 'IV', value: 4},
  {symbol: 'I', value: 1, repeat: true}
];

function normal2roman(normal) {
  if (!normal) {
    return '';
  }
  var output = '';
  RULES.sort(function(a, b) {
    return b.value - a.value;
  }).forEach(function(rule) {
    if (rule.repeat) {
      while (normal >= rule.value) {
        output += rule.symbol;
        normal -= rule.value;
      }
    } else {
      if (normal >= rule.value) {
        output += rule.symbol;
        normal -= rule.value;
      }
    }
  });
  return output;
}


