const chai = require("chai");
const chaiHttp = require("chai-http");
const assert = chai.assert;
const server = require("../server");

chai.use(chaiHttp);

suite("Functional Tests", () => {
  suite("#/api/solve", () => {
    test("Solve a puzzle with valid puzzle string: POST request to /api/solve", (done) => {
      chai
        .request(server)
        .post("/api/solve")
        .send({
          puzzle:
            "1.5..2.84..63.12.7.2..5.....9..1....8.2.3674.3.7.2..9.47...8..1..16....926914.37.",
        })
        .end((_, res) => {
          assert.equal(res.status, 200);
          assert.equal(
            res.body.solution,
            "135762984946381257728459613694517832812936745357824196473298561581673429269145378"
          );
          assert.equal(res.body.error, undefined);
        });

      done();
    });

    test("Solve a puzzle with missing puzzle string: POST request to /api/solve", (done) => {
      chai
        .request(server)
        .post("/api/solve")
        .send({})
        .end((_, res) => {
          assert.equal(res.status, 200);
          assert.equal(res.body.solution, undefined);
          assert.equal(res.body.error, "Required field missing");
        });
      done();
    });

    test("Solve a puzzle with invalid characters: POST request to /api/solve", (done) => {
      chai
        .request(server)
        .post("/api/solve")
        .send({
          puzzle:
            "1.5..2.84..63.12.7.2..5.....9..1....8.2.3674.3.7.2..9.47...8..1..16....926914.37!",
        })
        .end((_, res) => {
          assert.equal(res.status, 200);
          assert.equal(res.body.solution, undefined);
          assert.equal(res.body.error, "Invalid characters in puzzle");
        });
      done();
    });

    test("Solve a puzzle with incorrect length: POST request to /api/solve", (done) => {
      chai
        .request(server)
        .post("/api/solve")
        .send({
          puzzle:
            "1.5..2.84..63.12.7.2..5.....9..1....8.2.3674.3.7.2..9.47...8..1..16....926914.37",
        })
        .end((_, res) => {
          assert.equal(res.status, 200);
          assert.equal(res.body.solution, undefined);
          assert.equal(
            res.body.error,
            "Expected puzzle to be 81 characters long"
          );
        });
      done();
    });

    test("Solve a puzzle that cannot be solved: POST request to /api/solve", (done) => {
      chai
        .request(server)
        .post("/api/solve")
        .send({
          puzzle:
            "..9..5.1.85.4....2432......1...69.83.9.....6.62.71...9......1945....4.37.4.3..6.7",
        })
        .end((_, res) => {
          assert.equal(res.status, 200);
          assert.equal(res.body.error, "Puzzle cannot be solved");
          done();
        });
    });
  });

  suite("#/api/check", () => {
    test("Check a puzzle placement with all fields: POST request to /api/check", (done) => {
      chai
        .request(server)
        .post("/api/check")
        .send({
          // send puzzle and coordinate and value
          puzzle:
            "..9..5.1.85.4....2432......1...69.83.9.....6.62.71...9......1945....4.37.4.3..6..",
          coordinate: "A1",
          value: "1",
        })
        .end((_, res) => {
          assert.equal(res.status, 200);
          assert.equal(res.body.valid, false);
        });
      done();
    });

    test("Check a puzzle placement with single placement conflict: POST request to /api/check", (done) => {
      chai
        .request(server)
        .post("/api/check")
        .send({
          puzzle:
            "..9..5.1.85.4....2432......1...69.83.9.....6.62.71...9......1945....4.37.4.3..6..",
          coordinate: "A1",
          value: "2", // "conflict": [ "region" ]
        })
        .end((_, res) => {
          assert.equal(res.status, 200);
          assert.equal(res.body.valid, false);
        });
      done();
    });

    test("Check a puzzle placement with multiple placement conflicts: POST request to /api/check", (done) => {
      chai
        .request(server)
        .post("/api/check")
        .send({
          puzzle:
            "..9..5.1.85.4....2432......1...69.83.9.....6.62.71...9......1945....4.37.4.3..6..",
          coordinate: "A1",
          value: "4",
        })
        .end((_, res) => {
          assert.equal(res.status, 200);
          assert.equal(res.body.valid, false); // "conflict": [ "column", "region" ]
        });
      done();
    });

    test("Check a puzzle placement with all placement conflicts: POST request to /api/check", (done) => {
      chai
        .request(server)
        .post("/api/check")
        .send({
          puzzle:
            "..9..5.1.85.4....2432......1...69.83.9.....6.62.71...9......1945....4.37.4.3..6..",
          coordinate: "A1",
          value: "5", // "conflict": [ "row", "column", "region" ]
        })
        .end((_, res) => {
          assert.equal(res.status, 200);
          assert.equal(res.body.valid, false);
        });
      done();
    });

    test("Check a puzzle placement with missing required fields: POST request to /api/check", (done) => {
      chai
        .request(server)
        .post("/api/check")
        .send({
          puzzle:
            "1.5..2.84..63.12.7.2..5.....9..1....8.2.3674.3.7.2..9.47...8..1..16....926914.37.",
          value: "2",
        })
        .end((_, res) => {
          assert.equal(res.status, 200);
          assert.equal(res.body.valid, undefined);
          assert.equal(res.body.error, "Required field(s) missing");
        });
      done();
    });

    // test("Check a puzzle placement with invalid characters: POST request to /api/check", (done) => {
    //   done();
    // });

    // test("Check a puzzle placement with incorrect length: POST request to /api/check", (done) => {
    //   done();
    // });

    // test("Check a puzzle placement with invalid placement coordinate: POST request to /api/check", (done) => {
    //   done();
    // });

    // test("Check a puzzle placement with invalid placement value: POST request to /api/check", (done) => {
    //   done();
    // });
  });
});
