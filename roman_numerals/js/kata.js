function normal2roman(normal) {
  if (!normal) {
    return '';
  }
  var output = '';
  if (normal >= 5) {
    output += 'V';
    normal -= 5;
  }
  for (var i = 0; i < normal; ++i) {
    output += 'I';
  }
  return output;
}
