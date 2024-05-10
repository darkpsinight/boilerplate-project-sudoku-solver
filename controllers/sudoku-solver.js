class SudokuSolver {
  // convert row letters to numbers (to be used in "api.js" to get index of coordinate using extracted row and column values)
  numberFromLetter(row) {
    switch (row.toUpperCase()) {
      case "A":
        return 1;
      case "B":
        return 2;
      case "C":
        return 3;
      case "D":
        return 4;
      case "E":
        return 5;
      case "F":
        return 6;
      case "G":
        return 7;
      case "H":
        return 8;
      case "I":
        return 9;
      default:
        return "none";
    }
  }

  // check puzzleString validity
  validate(puzzleString) {
    // is missing puzzle, the returned value will be { error: 'Required field missing' }
    if (!puzzleString) {
      return "Required field missing";
    }

    //is greater or less than 81 characters, the returned value will be { error: 'Expected puzzle to be 81 characters long' }
    if (puzzleString.length !== 81) {
      return "Expected puzzle to be 81 characters long";
    }

    if (!/^[1-9]+$/.test(puzzleString)) {
      return "Invalid characters";
    }
    return "Valid puzzle string";
  }

  checkRowPlacement(puzzleString, row, column, value) {}

  checkColPlacement(puzzleString, row, column, value) {}

  checkRegionPlacement(puzzleString, row, column, value) {}

  solve(puzzleString) {}
}

module.exports = SudokuSolver;
