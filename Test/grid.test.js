
const each = require("jest-each").default;
const { takeTurn, incScore } = require("./../Source/node/gameLogic.js"); 


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





// test("We can take a move", () => {
//     p1Turn = true;
//     P1 = "p1";
//     P2 = "p2";


//     let board = [["empty", "empty", "empty"]
//     ["empty", "empty", "empty"]
//     ["empty", "empty", "empty"]]

    
//     const newBoard = updateBoard(1,1, board);


//     expect(newBoard[1][1]).toBe("P1");

// });