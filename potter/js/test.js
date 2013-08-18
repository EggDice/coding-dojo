describe('test', function() {
  it('should succed', function() {
    expect(1).toBe(1);
  });
});

describe('price calculator', function() {
  it('should exist', function() {
    expect(price).toEqual(jasmine.any(Function));
  });

  it('should return 0', function() {
    expect(price([])).toBe(0);
  });

  it('should return 8', function() {
    for (var i = 1; i <= 5; ++i) {
      expect(price([i])).toBe(8);
    }
  });

  it('should return n*8', function() {
    expect(price([1, 1])).toBe(2 * 8);
  });

  describe('discounts', function() {
    it('should give 5% discoutn for 2 different books', function() {
      expect(price([1, 2])).toBe(2 * 8 * 0.95);
    });

    it('should give 10% discoutn for 3 different books', function() {
      expect(price([1, 2, 3])).toBe(3 * 8 * 0.90);
    });

    it('should give 20% discoutn for 4 different books', function() {
      expect(price([1, 2, 3, 4])).toBe(4 * 8 * 0.80);
    });

    it('should give 20% discoutn for 4 different books', function() {
      expect(price([1, 2, 3, 4, 5])).toBe(5 * 8 * 0.75);
    });
  });
});
