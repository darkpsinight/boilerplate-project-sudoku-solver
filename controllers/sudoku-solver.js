const validPuzzleRegex = /^[1-9.]{81}$/;

const errorMessages = {
  invalidCharacters: { error: "Invalid characters in puzzle" },
  requiredFieldMissing: { error: "Required field missing" },
  invalidLength: { error: "Expected puzzle to be 81 characters long" },
  puzzleCannotBeSolved: { error: "Puzzle cannot be solved" },
};

class SudokuSolver {
  getValues(puzzleString, startIndex, step, length) {
    const values = [];
    for (let i = 0; i < length; i++) {
      values.push(puzzleString[startIndex + step * i]);
    }
    return values;
  }

  checkRowPlacement(puzzleString, row, value) {
    const rowStart = row * 9;

    for (let i = 0; i < 9; i++) {
      const cellValue = puzzleString[rowStart + i];
      if (cellValue === value.toString()) {
        return false;
      }
    }

    return true;
  }

  checkColPlacement(puzzleString, column, value) {
    for (let row = 0; row < 9; row++) {
      const cellValue = puzzleString[row * 9 + column];
      if (cellValue === value.toString()) {
        return false;
      }
    }
    return true;
  }

  checkRegionPlacement(puzzleString, row, column, value) {
    const regionRowStart = Math.floor(row / 3) * 3;
    const regionColStart = Math.floor(column / 3) * 3;

    for (let i = 0; i < 3; i++) {
      for (let j = 0; j < 3; j++) {
        const cellValue =
          puzzleString[(regionRowStart + i) * 9 + regionColStart + j];
        if (cellValue === value.toString()) {
          return false;
        }
      }
    }

    return true;
  }

  validateValue(value) {
    if (!validPuzzleRegex.test(value)) {
      return errorMessages.invalidCharacters;
    }

    return true;
  }

  validate(puzzleString) {
    if (!puzzleString) return errorMessages.requiredFieldMissing;
    if (puzzleString.length !== 81) return errorMessages.invalidLength;
    if (!validPuzzleRegex.test(puzzleString))
      return errorMessages.invalidCharacters;

    return true;
  }

  solve(puzzleString) {
    const isValid = this.validate(puzzleString);

    if (isValid !== true) {
      return isValid;
    }

    const solved = this.solvePuzzle(puzzleString);

    console.log(solved);

    if (solved === false) {
      return errorMessages.puzzleCannotBeSolved;
    }

    return { solution: solved };
  }

  solvePuzzle(puzzleString) {
    const emptyIndex = puzzleString.indexOf(".");

    if (emptyIndex === -1) {
      return puzzleString;
    }

    const row = Math.floor(emptyIndex / 9);
    const col = emptyIndex % 9;

    for (let value = 1; value <= 9; value++) {
      if (
        this.checkRowPlacement(puzzleString, row, value) &&
        this.checkColPlacement(puzzleString, col, value) &&
        this.checkRegionPlacement(puzzleString, row, col, value)
      ) {
        const newPuzzleString =
          puzzleString.substring(0, emptyIndex) +
          value +
          puzzleString.substring(emptyIndex + 1);

        const result = this.solvePuzzle(newPuzzleString);

        if (result) {
          return result;
        }
      }
    }

    return false;
  }
}

module.exports = SudokuSolver;
