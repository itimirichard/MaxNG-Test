/**
 * This is the entry point to the program.
 *
 * @param {number} noOfWashes The number of times the laundry machine can clean a dirty sock
 * @param {number[]} cleanPile The array of clean socks
 * @param {number[]} dirtyPile The array of dirty socks to wash
 */
function getMaxPairs(noOfWashes, cleanPile, dirtyPile) {
  // Your solution should go here.
  var uniquePairs = 0;
  const getOccurences = function(acc, val) {
    if (!acc[val]) {
      acc[val] = 1;
      return acc;
    }
    acc[val] += 1;
    return acc;
  };

  const cleanPairCount = cleanPile.reduce(getOccurences, {});

  Object.keys(cleanPairCount).forEach(item => {
    uniquePairs += Math.floor(cleanPairCount[item] / 2);
    cleanPairCount[item] = cleanPairCount[item] % 2;
  })

  if (noOfWashes == 0) { return uniquePairs; };

  for (var key in cleanPairCount) {
    if (cleanPairCount[key] === 1) {
      const index = dirtyPile.indexOf(Number(key));
      if (index !== -1) {
        uniquePairs += 1;
        cleanPairCount[key] = 0;
        dirtyPile.splice(index, 1);
        noOfWashes -= 1;
      }
    }
  }

  const dirtyPairCount = dirtyPile.reduce(getOccurences, {});

  var done = false;
  while (noOfWashes >= 2 && !done) {
    const checker = Object.values(dirtyPairCount).every(function(e) {
      return e === 0 || e === 1;
    })
    if (checker) {
      done = true;
      break;
    }

    Object.keys(dirtyPairCount).forEach(function(e) {
      while (dirtyPairCount[e] >= 2 && noOfWashes >= 2) {
        dirtyPairCount[e] -= 2;
        uniquePairs += 1;
        noOfWashes -= 2;
      }
    })
  }

  return (uniquePairs);
}

module.exports = getMaxPairs;
