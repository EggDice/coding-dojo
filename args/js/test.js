describe('Args', function() {
  it('should exists', function() {
    expect(parseArgs).toEqual(jasmine.any(Function));
  });

  it('should return empty object if no args', function() {
    expect(parseArgs([])).toEqual({});
  });

  it('should return empty object if no args', function() {
    expect(function() {parseArgs()}).toThrow();
  });

  it('should return "a" flag true', function() {
    expect(parseArgs(['-a'])).toEqual({'a': true});
  });

  it('should return "b" flag true', function() {
    expect(parseArgs(['-b'])).toEqual({'b': true});
  });

  it('should return "a" and "b" flag true', function() {
    expect(parseArgs(['-a', '-b'])).toEqual({'b': true, 'a': true});
  });

  it('should return "a" with value: 0', function() {
    expect(parseArgs(['-a', '0'])).toEqual({'a': 0});
  });

  it('should return "a" with value: "string"', function() {
    expect(parseArgs(['-a', 'string'])).toEqual({'a': 'string'});
  });

  it('should return "a" with value: ["elem1", "elem2", "elem3"]', function() {
    expect(parseArgs(['-a', 'elem1,elem2,elem3'])).toEqual({
      'a': ['elem1', 'elem2', 'elem3']
    });
  });
});
