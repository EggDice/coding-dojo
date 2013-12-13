'use strict';

/* global validate: false */

describe('test', function() {
  it('should succed', function() {
    expect(1).toBe(1);
  });
});

describe('validate', function() {
  it('should exist', function() {
    expect(validate).toEqual(jasmine.any(Function));
  });
    
  it('should throw error if the table is empty', function() {
    expect(_.partial(validate,[])).toThrow('empty table');
  });
  
  it('should return true if the table is [0]', function() {
    expect(validate([0])).toBe(true);
  })
  
  it('should throw error if any row is bigger than column num', function() {
    expect(validate([0]))
  });
});
