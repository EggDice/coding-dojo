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

  it('should throw error if the number is bigger than 3000', function() {
    expect(function() {
      normal2roman(3001);
    }).toThrow();
  });

  it('should throw error if the number is smaller than 1', function() {
    expect(function() {
      normal2roman(0);
    }).toThrow();
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

    it('should return L', function() {
      expect(normal2roman(50)).toBe('L');
    });

    it('should return C', function() {
      expect(normal2roman(100)).toBe('C');
    });

    it('should return D', function() {
      expect(normal2roman(500)).toBe('D');
    });

    it('should return M', function() {
      expect(normal2roman(1000)).toBe('M');
    });
  });

  describe('combinations', function() {
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

    it('should return XL', function() {
      expect(normal2roman(40)).toBe('XL');
    });

    it('should return XL', function() {
      expect(normal2roman(473)).toBe('CDLXXIII');
    });

    it('should return MCMXCIX', function() {
      expect(normal2roman(1999)).toBe('MCMXCIX');
    });
  });

  it('should run independent', function() {
    expect(normal2roman(1999)).toBe('MCMXCIX');
    expect(normal2roman(1)).toBe('I');
  });
});

describe('roman2normal converter', function() {
  it('should exists', function() {
    expect(roman2normal).toEqual(jasmine.any(Function));
  });

  describe('one letters', function() {
    it('should return I', function() {
      expect(roman2normal('I')).toBe(1);
    });

    it('should return I', function() {
      expect(roman2normal('V')).toBe(5);
    });
  });
});
