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
  var output = 0;
  return combos.reduce(function(price, combo) {
    return price + getComboPrice(combo);
  }, 0);
}

function getCombos(books) {
  var combos = [];
  books.forEach(function(book) {
    var index = getComboIndexWhereBookCanAppend(book, combos);
    if (index === -1) {
      combos.push([book]);
    } else {
      combos[index].push(book);
    }
  });
  return combos;
}

function getComboIndexWhereBookCanAppend(book, combos) {
  var index = -1;
  combos.forEach(function(combo, i) {
    if (combo.indexOf(book) === -1) {
      index = i;
    }
  });
  return index;
}

function getComboPrice(combo) {
  var discount = DISCOUNTS[combo.length];
  return combo.length * BASE_PRICE * discount;
}
