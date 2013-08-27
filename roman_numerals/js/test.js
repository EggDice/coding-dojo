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

  describe('one letters', function() {
    it('should return I', function() {
      expect(normal2roman(1)).toBe('I');
    });

    it('should return V', function() {
      expect(normal2roman(5)).toBe('V');
    });

    it('should return X', function() {
      expect(normal2roman(10)).toBe('X');
    });
  });

  it('should return III', function() {
    expect(normal2roman(3)).toBe('III');
  });

  it('should return IV', function() {
    expect(normal2roman(4)).toBe('IV');
  });

  it('should return VII', function() {
    expect(normal2roman(7)).toBe('VII');
  });

  it('should return IX', function() {
    expect(normal2roman(9)).toBe('IX');
  });

  it('should return XVI', function() {
    expect(normal2roman(16)).toBe('XVI');
  });

  it('should return XX', function() {
    expect(normal2roman(20)).toBe('XX');
  });
});
