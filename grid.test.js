const palindrome = require("./grid");
const each = require("jest-each").default;
const { takeMove, getBoard } = require('./grid');

test("We can take a move", () => {
    //Arrange
    let endBoard = Array(cols).fill().map(() => Array(rows));
    for (let i = 0; i < cols; i++) {
        for (let j = 0; j < rows; j++) {
            endBoard[i][j] = "hi";
        }
    }
    endBoard[1][1] = "notEmpty"
    //Act
    takeMove(1,1);
    let actual_outcome = getBoard();
    


    //Assert
    expect(endBoard[1][1]).toStrictEqual(actual_outcome[1][1]);
});