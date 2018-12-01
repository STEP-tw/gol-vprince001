const getCartisianProduct = function(columnNeighbours) {
  return function(cartisianProduct, element) {
    for(let index = 0; index < columnNeighbours.length; index++) {
      cartisianProduct.push([element, columnNeighbours[index]]);
    }
    return cartisianProduct; 
  }
};

const validateNeighbours = function(limits) { 
  return function (element) { 
    return ! ( element.some( (element => (element < limits.topX && element < limits.topY) || (element > limits.bottomX && element > limits.bottomY) ) ) )
  };
};

const remove = function(cell) { 
  return function (element) { 
    return !( element[0] == cell[0] && element[1] == cell[1] )
  };
};

const getValidNeighbours = function(cell, neighbourCandidates,limits) { 
  let removeGivenCell = remove(cell);
  let allNeighbours = neighbourCandidates.filter(removeGivenCell);
  let isValidNeighbour = validateNeighbours(limits);
  return allNeighbours.filter(isValidNeighbour);
};

const getNeighbours = function(cellCoordinates,limits) {
  let rowNeighbours = [ cellCoordinates[0]-1, cellCoordinates[0], cellCoordinates[0]+1 ];
  let columnNeighbours = [ cellCoordinates[1]-1, cellCoordinates[1], cellCoordinates[1]+1 ];
  let cartisianProduct= getCartisianProduct(columnNeighbours);
  let neighbourCandidates = rowNeighbours.reduce(cartisianProduct,[]);
  let neighbours = getValidNeighbours(cellCoordinates, neighbourCandidates,limits);
  return neighbours;
};

module.exports = { 
  getCartisianProduct, validateNeighbours, 
  remove, getValidNeighbours, getNeighbours
};
