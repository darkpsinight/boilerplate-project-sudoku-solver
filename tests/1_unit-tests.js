const chai = require("chai");
const assert = chai.assert;

const Solver = require("../controllers/sudoku-solver.js");
let solver;

suite("Unit Tests", () => {
  test("Logic handles a valid puzzle string of 81 characters", () => {
    solver = new Solver();
    const puzzleString =
      "1.5..2.84..63.12.7.2..5.....9..1....8.2.3674.3.7.2..9.47...8..1..16....926914.37.";
    const result = solver.solve(puzzleString);
    assert.equal(result.error, undefined);
    assert.equal(result.solution.length, 81);
  });

  test("Logic handles a puzzle string with invalid characters", () => {
    solver = new Solver();
    const puzzleString =
      "1.5..2.84..63.12.7.2..5.....9..1....8.2.3674.3.7.2..9.47...8..1..16....926914.37!";
    const result = solver.solve(puzzleString);
    assert.equal(result.error, "Invalid characters in puzzle");
  });

  test("Logic handles a puzzle string that is not 81 characters in length", () => {
    solver = new Solver();
    const puzzleString =
      "1.5..2.84..63.12.7.2..5.....9..1....8.2.3674.3.7.2..9.47...8..1..16....926914.3";
    const result = solver.solve(puzzleString);
    assert.equal(result.error, "Expected puzzle to be 81 characters long");
  });

  test("Logic handles a valid row placement", () => {
    solver = new Solver();
    const puzzleString =
      "1.5..2.84..63.12.7.2..5.....9..1....8.2.3674.3.7.2..9.47...8..1..16....926914.37.";
    const result = solver.checkRowPlacement(puzzleString, 0, 7);
    assert.equal(result, true);
  });

  test("Logic handles an invalid row placement", () => {
    solver = new Solver();
    const puzzleString =
      "1.5..2.84..63.12.7.2..5.....9..1....8.2.3674.3.7.2..9.47...8..1..16....926914.37.";
    const result = solver.checkRowPlacement(puzzleString, 0, 4);
    assert.equal(result, false);
  });

  test("Logic handles a valid column placement", () => {
    solver = new Solver();
    const puzzleString =
      "1.5..2.84..63.12.7.2..5.....9..1....8.2.3674.3.7.2..9.47...8..1..16....926914.37.";
    const result = solver.checkColPlacement(puzzleString, 2, 5);
    assert.equal(result, false);
  });

  test("Logic handles an invalid column placement", () => {
    solver = new Solver();
    const puzzleString =
      "1.5..2.84..63.12.7.2..5.....9..1....8.2.3674.3.7.2..9.47...8..1..16....926914.37.";
    const result = solver.checkColPlacement(puzzleString, 2, 4);
    assert.equal(result, true);
  });

  test("Logic handles a valid region (3x3 grid) placement", () => {
    solver = new Solver();
    const puzzleString =
      "1.5..2.84..63.12.7.2..5.....9..1....8.2.3674.3.7.2..9.47...8..1..16....926914.37.";
    const result = solver.checkRegionPlacement(puzzleString, 0, 2, 4);
    assert.equal(result, true);
  });

  test("Logic handles an invalid region (3x3 grid) placement", () => {
    solver = new Solver();
    const puzzleString =
      "1.5..2.84..63.12.7.2..5.....9..1....8.2.3674.3.7.2..9.47...8..1..16....926914.37.";
    const result = solver.checkRegionPlacement(puzzleString, 0, 2, 7);
    assert.equal(result, true);
  });

  test("Valid puzzle strings pass the solver", () => {
    solver = new Solver();
    const puzzleString =
      "1.5..2.84..63.12.7.2..5.....9..1....8.2.3674.3.7.2..9.47...8..1..16....926914.37.";
    const result = solver.solve(puzzleString);
    assert.equal(result.error, undefined);
  });

  test("Invalid puzzle strings fail the solver", () => {
    solver = new Solver();
    const puzzleString =
      "aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa";
    const result = solver.solve(puzzleString);
    assert.equal(result.error, "Invalid characters in puzzle");
  });

  test("Solver returns the expected solution for an incomplete puzzle", () => {
    solver = new Solver();
    const puzzleString =
      "1.5..2.84..63.12.7.2..5.....9..1....8.2.3674.3.7.2..9.47...8..1..16....926914.37.";
    const result = solver.solve(puzzleString);
    assert.equal(
      result.solution,
      "135762984946381257728459613694517832812936745357824196473298561581673429269145378"
    );
  });
});
