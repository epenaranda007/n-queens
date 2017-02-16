/*           _
   ___  ___ | |_   _____ _ __ ___
  / __|/ _ \| \ \ / / _ \ '__/ __|
  \__ \ (_) | |\ V /  __/ |  \__ \
  |___/\___/|_| \_/ \___|_|  |___/

*/

// hint: you'll need to do a full-search of all possible arrangements of pieces!
// (There are also optimizations that will allow you to skip a lot of the dead search space)
// take a look at solversSpec.js to see what the tests are expecting


// return a matrix (an array of arrays) representing a single nxn chessboard, with n rooks placed such that none of them can attack each other



window.findNRooksSolution = function(size, startRow, startColumn) {

  var solution = new Board({ n: size });
  var board = solution.rows();

  //iterate over the board
  for (var row = 0; row < board.length; row++) {
    for (var index = 0; index < board[row].length; index++) {
      board[row][index] = 1;
      if (solution.hasAnyRowConflicts()) {
        board[row][index] = 0;
        break;
      }
      if (solution.hasAnyColConflicts()) {
        board[row][index] = 0;
      }
    }
  }
  return board;
};

// return the number of nxn chessboards that exist, with n rooks placed such that none of them can attack each other
window.countNRooksSolutions = function(n) {
  var results = {};
  var result = [];

  var findSolutions = function findSolutions(result) {
    // if our passed in result is the same length as n, its valid so we can add it to our results object
    if (result.length === n) {
      var stringified = JSON.stringify(result);
      results[stringified] = stringified;
    } else {
      for (var row = 0; row < n; row++) {
        // start by checking only a small subset of possible placements, branching out as our possible results gets larger (see below)
        for (var column = 0; column < result.length; column++) {
          var val = result[column];

          // ex. [0, 1] is same as
          // [1, 0]
          // [0, 1]
          // number = row placement, column = index of result
          // ex. [0, 1, 2] is  the same as
          // [1, 0, 0]
          // [0, 1, 0]
          // [0, 0, 1]

          // if the number(row placement) is same as the row iterator, break out of search for open spaces as there are none
          if (val === row) {
            break;
          }
        }

        // if we have made it to the length X width of our current result array, it means that spot is available,
        // so add the row number to our column index in results and continue recursive depth search
        if (column === result.length) {
          findSolutions(result.concat([row]))
        }
      }
    }
  }

  findSolutions(result);
  return Object.keys(results).length;
};

// return a matrix (an array of arrays) representing a single nxn chessboard, with n queens placed such that none of them can attack each other
window.findNQueensSolution = function(n) {
  var solution = undefined; //fixme

  console.log('Single solution for ' + n + ' queens:', JSON.stringify(solution));
  return solution;
};

// return the number of nxn chessboards that exist, with n queens placed such that none of them can attack each other
window.countNQueensSolutions = function(n) {
  var solutionCount = undefined; //fixme

  console.log('Number of solutions for ' + n + ' queens:', solutionCount);
  return solutionCount;
};
