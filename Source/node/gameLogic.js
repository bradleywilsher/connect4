// eslint-disable-next-line no-undef
const express = require("express");

const fs = require('fs').promises
const fsCheck = require('fs');
//.promises;




const P1 = "p1"
const P2 = "p2"

const rows = 4;
const cols = 5;
const WINNUMBER = 4;
const NOWIN = "noWin";

let board = Array(cols).fill().map(() => Array(rows));
let state = {
    p1Turn: true,
    pieceRow: 0,
    winner: NOWIN,
    //Scores: player1, player2
    playerScores: [0, 0],
    board
}

initGame();
function boardInit() {
    //init array to null
    for (let i = 0; i < cols; i++) {
        for (let j = 0; j < rows; j++) {
            board[i][j] = "empty";
        }
    }
}

function initGame() {
    boardInit();
    getScore();
}

async function getScore() {
    try {
        if (fsCheck.existsSync('../../Data/scores.json')) {
            console.log("file exists")
            const rawScores = await fs.readFile("../../Data/scores.json", "utf-8");
            const parsedScores = JSON.parse(rawScores);


           
            state.playerScores = parsedScores;
            console.log("--------------------")
            console.log("playerScores;");
            console.log(state.playerScores[0]);
            console.log(state.playerScores[1]);
        }
    } catch (err) {
        console.log(err);
    }
}

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

//funciton that returns an app
const app = express();
// eslint-disable-next-line no-undef
const cors = require("cors");
const { raw } = require("express");

//gives all my client stuff to server
app.use(express.static("../client"))
console.log(__dirname)

app.use(cors());
app.use(express.json());



app.get("/hello", (req, res) => {
    //console.log("hi from hello");
    res.json("world");
});



app.get("/game/board/restart", (req, res) => {
    initGame();
    console.log("board after reset:")
    console.log(state.board, state.scores)
    res.send("Board reset");
});

// app.put('/game/board/col/:j', (req, res) => {
//     res.send(`Adding counter to column ${req.params.j} is:`);
//   });
app.post('/game/board/col', (req, res) => {
    res.json(updateBoard(req.body.column, req.body.row, board));
});



app.post('/game/findPlace', (req, res) => {
    res.json(findPlace(req.body.col));
    //res.send("Hi");
});

app.get('/game/getState/', (req, res) => {
    console.log("hi get state " + state.playerScores);
    res.json(state);
});


//res.json sends the response back

function findPlace(column) {
    let row = rows - 1;
    for (let i = row; i >= 0; i--) {
        if (board[column][i] === "empty") {
            state.winner = checkWin(column, i, updateBoard(column, i, board));

            //read score
            state.playerScores = incScore(state.winner, state.playerScores)
            updateScore(state.playerScores);
            state.pieceRow = i;
            state.p1Turn = !(state.p1Turn);
            return state;
        }
    }
}

async function updateScore(scores) {
    await fs.writeFile("../../Data/scores.json",
     JSON.stringify(scores), 'utf-8');
}

async function readScore() {
}

//Pure check winner 
//TODO check more efficently + other win conditions
function checkWin(col, row, localBoard) {
    //Adjust number of rols/cols for the array length
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