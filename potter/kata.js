function price(books) {
  if (!books.length) {
    return 0;
  } else {
    var discount = 1;
    if (books.length > 4 && isEveryUniq(books)) {
      discount = 0.75;
    } else if (books.length > 3 && isEveryUniq(books)) {
      discount = 0.80;
    } else if (books.length > 2 && isEveryUniq(books)) {
      discount = 0.90;
    } else if (books.length > 1 && isEveryUniq(books)) {
      discount = 0.95;
    }
    return books.length * 8 * discount;
  }
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
