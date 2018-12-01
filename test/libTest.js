const assert = require("assert");
const {getCartisianProduct, validateNeighbours} = require("../src/lib.js");

describe("getCartisianProduct",function() {

  it("should zip array elements with given element",function() {
    zip = getCartisianProduct([1,2,3,4]);
    assert.deepEqual(zip([],3),[[3,1],[3,2],[3,3],[3,4]]);
  });

  it("should return empty array for empty array ",function() { 
    zip = getCartisianProduct([]);
    assert.deepEqual(zip([],3),[]);
  });

  it("should return zip array of one element",function() { 
    zip = getCartisianProduct([3]);
    assert.deepEqual(zip([],3), [ [3,3] ]);
  });

});

describe("validateNeighbours",function() {

  it("should return true for size 0",function() {
    isValidNeighbour = validateNeighbours(5);
    assert.equal(isValidNeighbour([0,0]),true)
  });

  it("should return true for size => 0",function() {
    isValidNeighbour = validateNeighbours(3);
    assert.equal(isValidNeighbour([2,1]),true)
  });

  it("should return false for size > size-1",function() {
    isValidNeighbour = validateNeighbours(3);
    assert.equal(isValidNeighbour([3,2]),true)
  });

  it("should return false for size < 0",function() {
    isValidNeighbour = validateNeighbours(3);
    assert.equal(isValidNeighbour([1,2]),true)
  });

});
