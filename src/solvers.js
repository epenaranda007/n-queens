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

  var solution = new Board({n: size});
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
  var solutionCount = 0;
  var results = {};

  var findRookSolution = function findNRooksSolution(size, startRow, startCol) {
    var solution = new Board({n: size});
    var board = solution.rows();
    var numRooksNeeded = size;
    var totalRooks = 0;

    board[startRow][startCol] = 1;
    totalRooks++;
    for (var row = 0; row < board.length; row++) {
      for (var index = 0; index < board[row].length; index++) {
        if (!board[row][index]) {
          board[row][index] = 1;
          totalRooks++;
        }
        if (solution.hasAnyRowConflicts()) {
          board[row][index] = 0;
          totalRooks--;
          break;
        }
        if (solution.hasAnyColConflicts()) {
          board[row][index] = 0;
          totalRooks--;
        }
        if (numRooksNeeded === totalRooks) {
          var stringifiedResults = JSON.stringify(board);
          results[stringifiedResults] = stringifiedResults;
        }
      }  
    }
  };

  var findRookSolutionBackwards = function findNRooksSolutionBackwards(size, startRow, startCol) {
    var solution = new Board({n: size});
    var board = solution.rows();
    var numRooksNeeded = size;
    var totalRooks = 0;

    board[startRow][startCol] = 1;
    totalRooks++;
    for (var row = 0; row < board.length; row++) {
      for (var index = board.length - 1; index >= 0; index--) {
        if (!board[row][index]) {
          board[row][index] = 1;
          totalRooks++;
        }
        if (solution.hasAnyRowConflicts()) {
          board[row][index] = 0;
          totalRooks--;
          break;
        }
        if (solution.hasAnyColConflicts()) {
          board[row][index] = 0;
          totalRooks--;
        }
        if (numRooksNeeded === totalRooks) {
          var stringifiedResults = JSON.stringify(board);
          results[stringifiedResults] = stringifiedResults;
        }
      }  
    }
  };

  for (var rowSpots = 0; rowSpots < n; rowSpots++) {
    for (var colSpots = 0; colSpots < n; colSpots++) {
      findRookSolution(n, rowSpots, colSpots);
      findRookSolutionBackwards(n, rowSpots, colSpots);
    }
  }

  console.log(results);
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
