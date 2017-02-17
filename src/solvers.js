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

// alternate w/ given methods

//   var resultCount = 0;
//   var board = new Board({'n': n});

//   var findSolutions = function(rowIndex, board, rooks) {
//     rooks = rooks || 0;
//     if (rooks === n) {
//       resultCount++;
//       return;
//     } else {
//       for (var columnIndex = 0; columnIndex < n; columnIndex++) {
//         board.togglePiece(rowIndex, columnIndex);
//         rooks++;
//         if (!board.hasAnyRooksConflicts()) {
//           findSolutions(rowIndex + 1, board, rooks);
//         }
//         board.togglePiece(rowIndex, columnIndex);
//         rooks--;
//       }
//     }
//   };
//   findSolutions(0, board);
//   return resultCount;
// };



window.findNQueensSolution = function(n) {
  var resultCount = 0;
  var board = new Board({'n': n});
  var solution;

  var findSolutions = function(rowIndex, board, queens) {
    queens = queens || 0;
    if (solution) { return; }

    if (queens === n) {
      console.log('we made it');
      solution = board;
      return;
    } else {
      for (var columnIndex = 0; columnIndex < n; columnIndex++) {
        board.togglePiece(rowIndex, columnIndex);
        queens++;
        if (!board.hasAnyQueensConflicts()) {
          findSolutions(rowIndex + 1, board, queens);
        }
        board.togglePiece(rowIndex, columnIndex);
        queens--;
      }
    }
  };
  findSolutions(0, board);
  return solution;
};


// return the number of nxn chessboards that exist, with n queens placed such that none of them can attack each other
window.countNQueensSolutions = function(n) {
  var resultCount = 0;
  var board = new Board({'n': n});

  var findSolutions = function(rowIndex, board, queens) {
    queens = queens || 0;
    if (queens === n) {
      resultCount++;
      return;
    } else {
      for (var columnIndex = 0; columnIndex < n; columnIndex++) {
        board.togglePiece(rowIndex, columnIndex);
        queens++;
        if (!board.hasAnyQueensConflicts()) {
          findSolutions(rowIndex + 1, board, queens);
        }
        board.togglePiece(rowIndex, columnIndex);
        queens--;
      }
    }
  };
  findSolutions(0, board);
  return resultCount;
};
