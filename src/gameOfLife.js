const nextGeneration = function(currGeneration,bounds) {
  let limits = findLimits(bounds);
  let allCoordinates = getAllCoordinates(limits);
  let isContain = contains.bind(null, currGeneration);
  let result = [];

  for (coordinate of allCoordinates) {
    let neighbours = getNeighbours(coordinate, limits);
    let count = neighbours.filter(isContain).length;
    if((count == 2 && contains(currGeneration, coordinate)) || checkRules(count)==1)
      result.push(coordinate);
  }
  return result;
};

const contains = (list,element) => list.some(e=>e[0]===element[0] && e[1]===element[1]);

const findLimits = function(bounds) { 
  return { 
    "topX" : bounds.topLeft[0],
    "topY" : bounds.topLeft[1],
    "bottomX" : bounds.bottomRight[0], 
    "bottomY" : bounds.bottomRight[1]
  };
};

const getAllCoordinates = function(limits) { 
  let coordinates = [];
  for(let row = limits.topX; row <= limits.bottomX; row++) {
    for(let column=limits.topY; column <= limits.bottomY ; column++) {
      coordinates.push([row,column]);
    }
  }
  return coordinates;
};

const getNeighbours = function(cellCoordinates,limits) {
  let rowCoordinates = [ cellCoordinates[0]-1, cellCoordinates[0], cellCoordinates[0]+1 ];
  let columnCoordinates = [ cellCoordinates[1]-1, cellCoordinates[1], cellCoordinates[1]+1 ];
  let zip = zipArray(columnCoordinates);
  let neighbourCandidates = rowCoordinates.reduce(zip,[]);
  let neighbours = getValidNeighbours(cellCoordinates, neighbourCandidates,limits);
  return neighbours;
};

const zipArray = function(columnCoordinates) {
  return function(zippedArray, element) {
    for(let index = 0; index < columnCoordinates.length; index++) {
      zippedArray.push([element, columnCoordinates[index]]);
    }
    return zippedArray; 
  }
};

const getValidNeighbours = function(cell, neighbourCandidates,limits) { 
  let removeGivenCell = remove(cell);
  let allNeighbours = neighbourCandidates.filter(removeGivenCell);
  let isValidNeighbour = validateNeighbours(limits);
  return allNeighbours.filter(isValidNeighbour);
};

const remove = function(cell) { 
  return function (element) { 
    return !( element[0] == cell[0] && element[1] == cell[1] )
  };
};

const validateNeighbours = function(limits) { 
  return function (element) { 
    return ! ( element.some( (element => element < limits.topX || element > limits.bottomX) ) )
  };
};

const checkRules = function(count) {
  if(count < 2 || count > 3) {
    return 0;
  }
  if(count == 3) {
    return 1;
  }
};

module.exports = { nextGeneration };
