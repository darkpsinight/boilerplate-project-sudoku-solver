"use strict";

const SudokuSolver = require("../controllers/sudoku-solver.js");

module.exports = function (app) {
  const solver = new SudokuSolver();

  const valuePattern = /^[1-9]$/;
  const coordinatePattern = /^[A-I][1-9]$/;
  const puzzleCharPattern = /^[1-9.]+$/;

  app.route("/api/check").post((req, res) => {
    const { puzzle: puzzleString, coordinate, value } = req.body;

    if (!puzzleString || !coordinate || value === undefined) {
      return res.json({ error: "Required field(s) missing" });
    }

    if (puzzleString.length !== 81) {
      return res.json({ error: "Expected puzzle to be 81 characters long" });
    }

    if (!puzzleCharPattern.test(puzzleString)) {
      return res.json({ error: "Invalid characters in puzzle" });
    }

    if (!valuePattern.test(value)) {
      return res.json({ error: "Invalid value" });
    }

    if (!coordinatePattern.test(coordinate)) {
      return res.json({ error: "Invalid coordinate" });
    }

    const row = coordinate[0].toUpperCase().charCodeAt(0) - 65;
    const column = parseInt(coordinate[1], 10) - 1;

    const index = row * 9 + column;
    const currentValue = puzzleString[index];

    if (currentValue === value.toString()) {
      return res.json({ valid: true });
    }

    const validRow = solver.checkRowPlacement(puzzleString, row, value);
    const validCol = solver.checkColPlacement(puzzleString, column, value);
    const validRegion = solver.checkRegionPlacement(
      puzzleString,
      row,
      column,
      value
    );

    const conflicts = [];
    if (!validRow) {
      conflicts.push("row");
    }
    if (!validCol) {
      conflicts.push("column");
    }
    if (!validRegion) {
      conflicts.push("region");
    }

    let response;
    if (conflicts.length === 0) {
      response = { valid: true };
    } else {
      response = { valid: false, conflict: conflicts };
    }

    return res.json(response);
  });

  app.route("/api/solve").post((req, res) => {
    const puzzleString = req.body.puzzle;
    const solution = solver.solve(puzzleString);
    return res.json(solution);
  });
};
