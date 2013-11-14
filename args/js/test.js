describe('test', function() {
  function returnConstant(constant) {
    return function() {return constant;};
  }

  function noop() {};

  describe('Args', function() {
    var args;

    beforeEach(function() {
      args = new Args();
    });

    it('should create object', function() {
      expect(args).toEqual(jasmine.any(Object));
    });

    it('should exists', function() {
      expect(args.parse).toEqual(jasmine.any(Function));
    });

    it('should return empty object if no args', function() {
      expect(args.parse([])).toEqual({});
    });

    it('should return empty object if no args', function() {
      expect(function() {args.parse()}).toThrow('No arguments provided');
    });

    it('should return "a" flag true', function() {
      expect(args.parse(['-a'])).toEqual({'a': true});
    });

    it('should return "b" flag true', function() {
      expect(args.parse(['-b'])).toEqual({'b': true});
    });

    it('should return "a" and "b" flag true', function() {
      expect(args.parse(['-a', '-b'])).toEqual({'b': true, 'a': true});
    });

    it('should return "a" with value: 0', function() {
      expect(args.parse(['-a', '0'])).toEqual({'a': 0});
    });

     it('should return "a" with value: -12', function() {
      expect(args.parse(['-a', '-12'])).toEqual({'a': -12});
    });

    it('should return "a" with value: "string"', function() {
      expect(args.parse(['-a', 'string'])).toEqual({'a': 'string'});
    });

    it('should return "a" with value: ["elem1", "elem2", "elem3"]', function() {
      expect(args.parse(['-a', 'elem1,elem2,elem3'])).toEqual({
        'a': ['elem1', 'elem2', 'elem3']
      });
    });

    it('should return "command" with value: null', function() {
      expect(args.parse(['command'])).toEqual({
        'command': null
      });
    });
  });

  describe('group trailing', function() {
    var array = [1, 2, 3, 4, 5];
    var obj = {fn: noop};
    spyOn(obj, 'fn');
    var iterator = obj.fn;

    it('should exists', function() {
      expect(groupTrailing).toEqual(jasmine.any(Function));
    });

    it('should give back wrapped elements array', function() {
      expect(groupTrailing(array, returnConstant(false))).
        toEqual([[1], [2], [3], [4], [5]]);
    });

    it('should group to one element', function() {
      expect(groupTrailing(array, returnConstant(true))).
        toEqual([array]);
    });

    it('should group the evens to the odds', function() {
      expect(groupTrailing(array, function(elem) {
        return !(elem % 2);
      })).toEqual([[1, 2], [3, 4], [5]]);
    });

    it('should call the iterator with same arguments as forEach', function() {
      groupTrailing(array, iterator);
      var spy = expect(iterator);
      array.forEach(spy.toHaveBeenCalledWith, spy);
    });
  });
});
