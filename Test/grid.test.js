
const each = require("jest-each").default;
const { takeTurn, incScore, updateBoard } = require("./../Source/node/gameLogic.js"); 

const request = require('supertest')
const appTest = require("./../Source/node/gameLogic.js");

test("takeTurn", () => {
    //Arrange
    isP1Turn = true;
    expectedOutput = false;

    //Act
    nextTurn = takeTurn(isP1Turn);

    //Assert
    expect(nextTurn).toEqual(expectedOutput);
});

test("P1 wins a game", () => {
    //Arrange
    let winner = "p1"
    scores = [0,0];
    expectedOutput = [1, 0];

    //Act
    let actualOutput = incScore(winner, scores);

    //Assert
    expect(actualOutput).toStrictEqual(expectedOutput);
});

test("P2 Wins a game", () => {
    //Arrange
    let winner = "p2"
    scores = [0,0];
    expectedOutput = [0, 1];

    //Act
    let actualOutput = incScore(winner, scores);

    
    //Assert
    expect(actualOutput).toStrictEqual(expectedOutput);
});

test("No win", () => {
    //Arrange
    let winner = "noWin"
    scores = [0,0];
    expectedOutput = [0, 0];
    
    //Act
    let actualOutput = incScore(winner, scores);

    //Assert
    expect(actualOutput).toStrictEqual(expectedOutput);
});

test("Hi", () => {
    request(appTest.app)
      .get('/hello')
      .expect('Content-Type', /json/)
    //   .expect('Content-Length', '15')
      .expect(200)
      .end(function(err, res) {
        if (err) throw err;
      });
    });
