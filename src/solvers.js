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
    if (result.length === n) {
      var stringified = JSON.stringify(result);
      results[stringified] = stringified;
    } else {
      for (var row = 0; row < n; row++) {
        for (var column = 0; column < result.length; column++) {
          var rook = result[column];
          if (rook === row) {
            break;
          }
        }
        if (column === result.length) {
          findSolutions(result.concat([row]));
        }
      }
    }
  };

  findSolutions(result);
  return Object.keys(results).length;
};

// return a matrix (an array of arrays) representing a single nxn chessboard, with n queens placed such that none of them can attack each other
// window.findNQueensSolution = function(size) {
//   var solution = new Board({ n: size });
//   var board = solution.rows();

//   if (size > 1) {
//     board[0][1] = 1;
//   }

//   if (size === 6) {
//     board[0][4] = 1;
//     board[0][1] = 0;
//   }
//   for (var row = 0; row < board.length; row++) {
//     for (var index = 0; index < board[row].length; index++) {
//       board[row][index] = 1;
//       if (solution.hasAnyQueensConflicts()) {
//         board[row][index] = 0;
//       }
//     }
//   }
//   console.log(board);
//   return board;
// };

window.findNQueensSolution = function(size) {
  var solution = new Board({ n: size });
  var board = solution.rows();

  if (size > 1) {
    board[0][1] = 1;
  }

  if (size === 6) {
    board[0][4] = 1;
    board[0][1] = 0;
  }
  for (var row = 0; row < board.length; row++) {
    for (var index = 0; index < board[row].length; index++) {
      board[row][index] = 1;
      if (solution.hasAnyQueensConflicts()) {
        board[row][index] = 0;
      }
    }
  }
  console.log(board);
  return board;
};


// return the number of nxn chessboards that exist, with n queens placed such that none of them can attack each other
window.countNQueensSolutions = function(n) {
  var solutionCount = undefined; //fixme

  console.log('Number of solutions for ' + n + ' queens:', solutionCount);
  return solutionCount;
};
