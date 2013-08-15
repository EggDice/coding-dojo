function price(books) {
  if (!books.length) {
    return 0;
  } else {
    var discount = 1;
    if (books.length > 1 && books[0] !== books[1]) {
      discount = 0.95;
    }
    return books.length * 8 * discount;
  }
}
