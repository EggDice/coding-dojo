describe('test', function() {
  it('should succed', function() {
    expect(1).toBe(1);
  });
});

describe('normal2roman converter', function() {
  it('should exists', function() {
    expect(normal2roman).toEqual(jasmine.any(Function));
  });

  it('should give back empty string if no argument', function() {
    expect(normal2roman()).toBe('');
  });

  it('should return I', function() {
    expect(normal2roman(1)).toBe('I');
  });

  it('should return V', function() {
    expect(normal2roman(5)).toBe('V');
  });

  it('should return III', function() {
    expect(normal2roman(3)).toBe('III');
  });
});
