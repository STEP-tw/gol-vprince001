const assert = require("assert");
const {
  getCartisianProduct, validateNeighbours,
  remove, getValidNeighbours } = require("../src/lib.js");

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

describe("remove",function() {

  it("should return false for same cell and element",function() {
    cellToRemove = remove([0,1]);
    assert.equal(cellToRemove([0,1]),false);
  });

  it("should return true for different cell and element",function() {
    cellToRemove = remove([1,1]);
    assert.equal(cellToRemove([0,1]),true);
  });

});

describe("getValidNeighbours",function() {

  it("should return empty array for no neighbours",function() {
    assert.deepEqual(getValidNeighbours([0,1],[],{topX : 0, topY : 0, bottomX : 3, bottomY :3}),[]);
  });

  it("should return array of non zero array element ",function() {
    assert.deepEqual(getValidNeighbours([0,1],[[1,1],[1,2],[-1,1],[2,2]],{topX : 0, topY : 0, bottomX : 3, bottomY :3}),[[1,1],[1,2],[2,2]]);
  });

  it("should return array of elements < gridSize ",function() {
    assert.deepEqual(getValidNeighbours([0,1],[[1,1],[1,3],[-1,1],[2,4]],{topX : 0, topY : 0, bottomX : 3, bottomY :3}),[[1,1],[1,3]]);
  });

});
