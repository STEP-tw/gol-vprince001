const getCartisianProduct = function(columnNeighbours) {
  return function(cartisianProduct, element) {
    for(let index = 0; index < columnNeighbours.length; index++) {
      cartisianProduct.push([element, columnNeighbours[index]]);
    }
    return cartisianProduct; 
  }
};

module.exports = { getCartisianProduct };
