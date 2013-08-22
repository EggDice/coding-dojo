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
    return price + getComboPrice(combo);
  }, 0);
}

function getCombos(books) {
  var combos = [];
  books.forEach(function(book) {
    var index = getLongestComboIndexWhereBookCanAppend(book, combos);
    if (index === -1) {
      combos.push([book]);
    } else {
      combos[index].push(book);
    }
  });
  return combos;
}

function getLongestComboIndexWhereBookCanAppend(book, combos) {
  var indexes = getComboIndexesWhereBookCanAppend(book, combos);
  return indexes.reduce(function(bestIndex, currentIndex) {
    return currentIndex.size > bestIndex.size ? currentIndex : bestIndex;
  }, {index: -1, size: 0}).index;
}

function getComboIndexesWhereBookCanAppend(book, combos) {
  var indexes = [];
  combos.forEach(function(combo, i) {
    if (combo.indexOf(book) === -1) {
      index = i;
      indexes.push({index: index, size: combo.length});
    }
  });
  return indexes;
}

function getComboPrice(combo) {
  var discount = DISCOUNTS[combo.length];
  return combo.length * BASE_PRICE * discount;
}
