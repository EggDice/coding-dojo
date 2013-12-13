(function(window) {
  'use strict';

  var BASE_RULES = {
    '1': 'I',
    '5': 'V',
    '10': 'X',
    '50': 'L',
    '100': 'C',
    '500': 'D',
    '1000': 'M'
  };

  var Rules = {
    simpleRules_: [],
    ascendingSimpleRules: [],
    descendingRegExpRules: [],

    generateRules: function() {
      if (!this.simpleRules_.length) {
        var baseValues = Object.keys(BASE_RULES).map(toInt);
        this.createRulesByBaseValues_(baseValues);
        this.generateAscendingSimpleRules_();
        this.generateDescendingRegExpRules_();
      }
    },

    createRulesByBaseValues_: function(baseValues) {
      for (var i = 0, l = baseValues.length; i < l; ++i) {
        var value = baseValues[i];
        var nextValue = baseValues[i + 1];
        var prevValue = baseValues[i - 1];
        this.addSimpleRule_(value);
        if (i + 1 !== l) {
          this.addComplexRule_(value, nextValue, prevValue);
        }
      }
    },

    addSimpleRule_: function(value) {
      this.simpleRules_.push(this.createSimpleRule_(value));
    },

    createSimpleRule_: function(number) {
      return {
        'value': number,
        'symbol': BASE_RULES[number]
      };
    },

    addComplexRule_: function(value, nextValue, prevValue) {
      if (is10exponent(value)) {
        this.simpleRules_.push(this.createComplexRule_(nextValue, value));
      } else {
        this.simpleRules_.push(this.createComplexRule_(nextValue, prevValue));
      }
    },

    createComplexRule_: function(biggerNumber, substractedNumber) {
      return {
        'value': biggerNumber - substractedNumber,
        'symbol': BASE_RULES[substractedNumber] + BASE_RULES[biggerNumber]
      };
    },

    generateAscendingSimpleRules_: function() {
      this.ascendingSimpleRules = cloneArray(this.simpleRules_)
          .sort(this.sortByValueAscending_);
    },

    generateDescendingRegExpRules_: function() {
      this.descendingRegExpRules = cloneArray(this.simpleRules_)
          .map(function(rule) {
        return {
          'value': rule.value,
          'regexp': new RegExp(rule.symbol + '$')
        };
      }).sort(this.sortByValueDescending_);
    },

    sortByValueAscending_: function(a, b) {
      return b.value - a.value;
    },

    sortByValueDescending_: function(a, b) {
      return a.value - b.value;
    }
  };

  Rules.generateRules();

  window.normal2roman = function(normal) {
    return convert();

    function convert() {
      checkArgument();
      return Rules.ascendingSimpleRules.reduce(reduceRule, '');
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
  };

  window.roman2normal = function(roman) {
    return convert();

    function convert() {
      return Rules.descendingRegExpRules.reduce(reduceRule, 0);
    }

    function reduceRule(normal, rule) {
      var match;
      while (match = roman.match(rule.regexp)) {
        roman = roman.substr(0, match.index);
        normal += rule.value;
      }
      return normal;
    }
  };

  function toInt(string) {
    return parseInt(string, 10);
  }

  function cloneArray(array) {
    return array.slice();
  }

  function is10exponent(number) {
    var log = log10(number);
    return Math.floor(log) === log;
  }

  function log10(val) {
    return Math.log(val) / Math.LN10;
  }

  function get(object, property) {
    return object[property];
  }

  function subtract(a, b) {
	return a - b;
  }
})(this);
