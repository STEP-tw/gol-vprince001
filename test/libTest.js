const assert = require("assert");
const {getCartisianProduct} = require("../src/lib.js");

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
