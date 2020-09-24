
const each = require("jest-each").default;
const request = require('supertest');
const { takeTurn, incScore, updateBoard, checkWin } = require("./../Source/node/gameLogic.js");
//const express = require("express");

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
    scores = [0, 0];
    expectedOutput = [1, 0];

    //Act
    let actualOutput = incScore(winner, scores);

    //Assert
    expect(actualOutput).toStrictEqual(expectedOutput);
});

test("P2 Wins a game", () => {
    //Arrange
    let winner = "p2"
    scores = [0, 0];
    expectedOutput = [0, 1];

    //Act
    let actualOutput = incScore(winner, scores);

    //Assert
    expect(actualOutput).toStrictEqual(expectedOutput);
});

//Can parametise 
test("No win", () => {
    //Arrange
    let winner = "noWin"
    scores = [0, 0];
    expectedOutput = [0, 0];

    //Act
    let actualOutput = incScore(winner, scores);

    //Assert
    expect(actualOutput).toStrictEqual(expectedOutput);
});


test("update board state", () => {

    //Arrange
    let startBoard = [
        ["empty", "empty", "empty"],
        ["empty", "empty", "empty"],
        ["empty", "empty", "empty"]
    ];

    let expectedOutput = [
        ["empty", "empty", "empty"],
        ["empty", "p1", "empty"],
        ["empty", "empty", "empty"]
    ];

    // //Act
    const actualOutput = updateBoard(1, 1, startBoard);

    // //Assert
    expect(actualOutput).toStrictEqual(expectedOutput);

});

test.skip("Check for horizontal win ", () => {

    //Arrange
    let startBoard = [
        ["empty", "empty", "empty", "empty"],
        ["p1", "p1", "p1", "p1"],
        ["empty", "empty", "empty", "empty"]
    ];
    //Act
    const actualOutput = checkWin(1, 1, startBoard);

    //Assert
    expect(actualOutput).toEqual("p1");

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
