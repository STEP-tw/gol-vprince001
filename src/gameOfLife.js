const { getCartisianProduct, validateNeighbours, remove } = require("./lib.js");

const nextGeneration = function(currGeneration,bounds) {
  let limits = extractLimits(bounds);
  let allCoordinates = getAllCoordinates(limits);
  let includes = contains.bind(null, currGeneration);
  let aliveCells = [];

  for (let coordinate of allCoordinates) {
    let neighbours = getNeighbours(coordinate, limits);
    let numOfNeighbours = neighbours.filter(includes).length;
    if((numOfNeighbours == 2 && contains(currGeneration, coordinate)) || verifyRules(numOfNeighbours)==1)
      aliveCells.push(coordinate);
  }
  return aliveCells;
};

const contains = (list,element) => list.some(e=>e[0]===element[0] && e[1]===element[1]);

const extractLimits = function(bounds) { 
  return { 
    "topX" : bounds.topLeft[0],
    "topY" : bounds.topLeft[1],
    "bottomX" : bounds.bottomRight[0], 
    "bottomY" : bounds.bottomRight[1]
  };
};

const getAllCoordinates = function(limits) { 
  let allCoordinates = [];
  for(let row = limits.topX; row <= limits.bottomX; row++) {
    for(let column=limits.topY; column <= limits.bottomY ; column++) {
      allCoordinates.push([row,column]);
    }
  }
  return allCoordinates;
};

const getNeighbours = function(cellCoordinates,limits) {
  let rowNeighbours = [ cellCoordinates[0]-1, cellCoordinates[0], cellCoordinates[0]+1 ];
  let columnNeighbours = [ cellCoordinates[1]-1, cellCoordinates[1], cellCoordinates[1]+1 ];
  let cartisianProduct= getCartisianProduct(columnNeighbours);
  let neighbourCandidates = rowNeighbours.reduce(cartisianProduct,[]);
  let neighbours = getValidNeighbours(cellCoordinates, neighbourCandidates,limits);
  return neighbours;
};

const getValidNeighbours = function(cell, neighbourCandidates,limits) { 
  let removeGivenCell = remove(cell);
  let allNeighbours = neighbourCandidates.filter(removeGivenCell);
  let isValidNeighbour = validateNeighbours(limits);
  return allNeighbours.filter(isValidNeighbour);
};

const verifyRules = function(numOfNeighbours) {
  if(numOfNeighbours < 2 || numOfNeighbours > 3) {
    return 0;
  }
  if(numOfNeighbours == 3) {
    return 1;
  }
};

module.exports = { nextGeneration };
