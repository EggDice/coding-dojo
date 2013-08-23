'use strict';

var DISCOUNTS = {
  '1': 1,
  '2': 0.95,
  '3': 0.90,
  '4': 0.80,
  '5': 0.75
};

var BASE_PRICE = 8;

function price(books) {
  var combos = getCombos(books);
  return combos.reduce(function(price, combo) {
    return price + getComboPriceByLength(combo.length);
  }, 0);
}

function getCombos(books) {
  var combos = [];
  books.forEach(function(book) {
    var combo = getBestAppendPriceCombo(book, combos);
    if (!combo.length) {
      combos.push(combo);
    }
    combo.push(book);
  });
  return combos;
}

function getBestAppendPriceCombo(book, combos) {
  return combos.filter(function(combo) {
    return isBookInCombo(book, combo);
  }).reduce(function(bestCombo, currentCombo) {
    return getBetterAppendPriceCombo(bestCombo, currentCombo);
  }, []);
}

function getComboPriceByLength(length) {
  return length * BASE_PRICE * DISCOUNTS[length];
}

function isBookInCombo(book, combo) {
  return combo.indexOf(book) === -1;
}

function getBetterAppendPriceCombo(combo1, combo2) {
  return getAppendPrice(combo1) > getAppendPrice(combo2) ? combo1 : combo2;
}

function getAppendPrice(combo) {
  var l = combo.length;
  return getComboPriceByLength(l) - getComboPriceByLength(l + 1);
}
