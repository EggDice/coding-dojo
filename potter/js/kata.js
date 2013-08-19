function price(books) {
  var combos = getCombos(books);
  var output = 0;
  return combos.reduce(function(price, combo) {
    return price + comboPrice(combo);
  }, 0);
}

function isEveryUniq(array) {
  var copy = array.slice(0);
  while (copy.length !== 1) {
    var elem = copy.pop();
    if (copy.indexOf(elem) !== -1) {
      return false;
    }
  }
  return true;
}

function getCombos(books) {
  var combo = [];
  var left = [];
  books.forEach(function(book) {
    if (combo.indexOf(book) !== -1) {
      left.push(book);
    } else {
      combo.push(book);
    }
  });
  return [combo, left];
}

function comboPrice(combo) {
  var discount = 1;
  if (combo.length > 4 && isEveryUniq(combo)) {
    discount = 0.75;
  } else if (combo.length > 3 && isEveryUniq(combo)) {
    discount = 0.80;
  } else if (combo.length > 2 && isEveryUniq(combo)) {
    discount = 0.90;
  } else if (combo.length > 1 && isEveryUniq(combo)) {
    discount = 0.95;
  }
  return combo.length * 8 * discount;
}
