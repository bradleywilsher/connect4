// eslint-disable-next-line no-undef
const express = require("express");

const fs = require('fs').promises
const fsCheck = require('fs');

const P1 = "p1"
const P2 = "p2"
const rows = 4;
const cols = 5;
const WINNUMBER = 4;
const NOWIN = "noWin";

let localBoard = Array(cols).fill().map(() => Array(rows));
let state = {
    p1Turn: true,
    pieceRow: 0,
    winner: NOWIN,
    //Scores: player1, player2
    playerScores: [0, 0],
    board: localBoard
}

initGame();
function boardInit() {
    //init array to null
    for (let i = 0; i < cols; i++) {
        for (let j = 0; j < rows; j++) {
            localBoard[i][j] = "empty";
        }
    }
}

function initGame() {
    boardInit();
    getScore();
}

const app = express();
const cors = require("cors");
app.use(express.static("../client"))
console.log(__dirname)

app.use(cors());
app.use(express.json());

app.get("/hello", (req, res) => {
    res.json("world");
});

app.get("/game/board/restart", (req, res) => {
    initGame();
    res.send("Board reset");
});

app.post('/game/board/col', (req, res) => {
    res.json(updateBoard(req.body.column, req.body.row, localBoard));
});

app.post('/game/findPlace', (req, res) => {
    res.json(findPlace(req.body.col));
});

app.get('/game/getState/', (req, res) => {
    res.json(state);
});

//Drops the token in the column that the user clicked into correct board position
function findPlace(column) {
    let row = rows - 1;
    for (let i = row; i >= 0; i--) {
        if (localBoard[column][i] === "empty") {
            state.winner = checkWin(column, i, updateBoard(column, i, localBoard));

            //read score
            state.playerScores = incScore(state.winner, state.playerScores)
            updateScore(state.playerScores);
            state.pieceRow = i;
            state.p1Turn = !(state.p1Turn);
            return state;
        }
    }
}

//Reads current score the data file
async function getScore() {
    try {
        if (fsCheck.existsSync('../../Data/scores.json')) {
            const rawScores = await fs.readFile("../../Data/scores.json", "utf-8");
            const parsedScores = JSON.parse(rawScores);
            state.playerScores = parsedScores;
        }
    } catch (err) {
        console.log(err);
    }
}

//Update board state
function updateBoard(column, row, localBoard) {
    if (state.p1Turn) {
        localBoard[column][row] = P1
    } else {
        localBoard[column][row] = P2
    }
    return localBoard;
}

function takeTurn(curTurn) {
    return !curTurn;
}

async function updateScore(scores) {
    await fs.writeFile("../../Data/scores.json",
     JSON.stringify(scores), 'utf-8');
}

//Check for: horizontal, vertical and diagonal wins
//Should seperate out the 3 win types
function checkWin(col, row, localBoard) {
    let p1Score = 0;
    let p2Score = 0;
    
    //Horizontal Win
    for (let i = 0; i < cols; i++) {
        if (localBoard[i][row] === P1) {
            p1Score++;
            if (p1Score >= WINNUMBER) {
                return P1
            }
        } else {
            p1Score = 0;
            if (localBoard[i][row] === P2) {
                p2Score++;
                if (p2Score >= WINNUMBER) {
                    return P2
                }
            } else {
                p2Score = 0;
            }
        }
    }

    p1Score =0;
    p2Score =0;

    //vertical
    for (let i = 0; i < rows; i++) {
        if (localBoard[col][i] === P1) {
            p1Score++;
            if (p1Score >= WINNUMBER) {
                return P1
            }
        } else {
            p1Score = 0;
            if (localBoard[col][i] === P2) {
                p2Score++;
                if (p2Score >= WINNUMBER) {
                    return P2
                }
            } else {
                p2Score = 0;
            }
        }
    }

  
  //Diagnol win - first transpose matrix
  let count = 0;
  const diagBoard = [];
  localBoard.flat().forEach((circle) => {
    const column = count % localBoard[0].length;
    if (count <localBoard[0].length) {
      diagBoard.push([]);
    }
    diagBoard[column].unshift(`${circle}`);
    count += 1;
  });

  //Diaganol win
  for (let row = 0; row < diagBoard.length - WINNUMBER + 1; row += 1) {
    let leftCounter = 0;
    let rightCounter = diagBoard[0].length - 1;
    // loop over columns
    for (let column = 0; column < diagBoard[0].length - WINNUMBER + 1; column += 1) {
      // if a colour is encountered
      if (diagBoard[row][leftCounter] !== "empty") {
        winner = diagBoard[row][leftCounter];
        for (let i = 0; i < WINNUMBER; i += 1) {
          if (i === WINNUMBER - 1) {
            return winner;
          }
          // if there is WINNUMBER in a diagonal down to the right return the winner
          if (diagBoard[row + i][leftCounter + i] !== diagBoard[row + i + 1][leftCounter + i + 1]) {
            break;
          }
        }
      }
      // if a colour is encountered
      if (diagBoard[row][rightCounter] !== "empty") {
        winner = diagBoard[row][rightCounter];
        for (let i = 0; i < WINNUMBER; i += 1) {
          if (i === WINNUMBER - 1) {
            return winner;
          }
          // if there is WINNUMBER in a diagonal down to the left return the winner
          if (diagBoard[row + i][rightCounter - i] !== diagBoard[row + i + 1][rightCounter - i - 1]) {
            break;
          }
        }
      }
      // increment counters to test for diagonals to the left and right
      leftCounter += 1;
      rightCounter -= 1;
    }
  }

    //if no winner
    return NOWIN;
}

function incScore(winner, localPlayerScores) {
    if (winner === P1) {
        localPlayerScores[0]++;
        return localPlayerScores
    }
    if (winner === P2) {
        localPlayerScores[1]++;
        return localPlayerScores
    } else {
        //no change
        return localPlayerScores;
    }
    //throw error if not noWin
}


if (process.env.NODE_ENV !== 'test') {
    app.listen(8080, () => {
      // eslint-disable-next-line no-console
      console.log(`listening on port 8080...`);
    });
  }

if (typeof module !== 'undefined') {
    module.exports = {
        app,
        takeTurn,
        incScore,
        updateBoard, 
        boardInit,
        checkWin
    }
}