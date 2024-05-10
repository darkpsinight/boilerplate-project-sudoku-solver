"use strict";

const SudokuSolver = require("../controllers/sudoku-solver.js");

module.exports = function (app) {
  let solver = new SudokuSolver();

  app.route("/api/check").post((req, res) => {
    const { puzzleString, coordinate, value } = req.body;

    if (!puzzleString || !coordinate || !value) {
      return res.json({ error: "Required field(s) missing" });
    }

    if (solver.validate(puzzleString) !== "Valid puzzle string") {
      return res.json({ error: solver.validate(puzzleString) });
    }

    // extract row and column values from coordinate string
    const row = coordinate.split("")[0];
    const column = coordinate.split("")[1];

    // check coordinate validity
    //If the coordinate submitted to api/check does not point to an existing grid cell, the returned value will be { error: 'Invalid coordinate'}
    if (
      !/[a-i]/i.test(row) ||
      !/[1-9]/i.test(column) ||
      coordinate.length !== 2
    ) {
      return res.json({ error: "Invalid coordinate" });
    }

    // check value validity
    // If the value submitted to /api/check is not a number between 1 and 9, the returned value will be { error: 'Invalid value' }
    if (!/^[1-9]$/.test(value)) {
      return res.json({ error: "Invalid value" });
    }

    //get index of coordinate using extracted row and column values
    const rowNumber = solver.numberFromLetter(row);
    const columnIndex = parseInt(column, 10);
    const index = (rowNumber - 1) * 9 + columnIndex - 1;

    // checks if a value at a specific position (index) matches the expected value.
    if (puzzleString[index] == value) {
      return res.json({ valid: true });
    }

    //...
  });

  app.route("/api/solve").post((req, res) => {
    const { puzzleString, coordinate, value } = req.body;

    if (!puzzleString || !coordinate || !value) {
      return res.json({ error: "Required field missing" });
    }

    if (solver.validate(puzzleString) !== "Valid puzzle string") {
      return res.json({ error: solver.validate(puzzleString) });
    }
  });
};
