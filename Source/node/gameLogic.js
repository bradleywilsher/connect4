// eslint-disable-next-line no-undef
const express = require("express");
const P1 = "p1"
const P2 = "p2"

const rows = 4;
const cols = 5;
const WINNUMBER = 4;
const NOWIN = "noWin";

let p1Turn = true;
let state = {
    pTurn: p1Turn,
    pieceRow: 0,
    winner: "noWin",
    //Scores: player1, player2
    playerScores: [0,0]
}



let board = Array(cols).fill().map(() => Array(rows));
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
}


function updateBoard(column, row, localBoard) {
    if (p1Turn) {
        localBoard[column][row] = P1
    } else {
        localBoard[column][row] = P2
    }
    return localBoard;
}

function takeTurn() {
    p1Turn = !p1Turn;
}

//funciton that returns an app
const app = express();
// eslint-disable-next-line no-undef
const cors = require("cors")

//gives all my client stuff to server
app.use(express.static("../client"))
console.log(__dirname)

app.use(cors());
app.use(express.json());

app.get("/hello", (req, res) => {
    console.log("hi from hello");
    res.send("world");
});


// app.put('/game/board/col/:j', (req, res) => {
//     res.send(`Adding counter to column ${req.params.j} is:`);
//   });
app.post('/game/board/col', (req, res) => {
    res.json(updateBoard(req.body.column, req.body.row, board));
  });

  app.post('/game/findPlace', (req, res) => {
    console.log(req.body.col);
    res.json(findPlace(req.body.col));
    takeTurn();
    //res.send("Hi");
  });


//res.json sends the response back

function findPlace(column) {
console.log("Find place: " + column);
console.log(board);
    let row = rows - 1;
    for (let i = row; i >= 0; i--) {
        if (board[column][i] === "empty") {
            console.log("hi from loop");
            state.winner = checkWin(column, i, updateBoard(column, i, board));
            incScore(state.winner, state.playerScores)
            state.pieceRow = i;
            state.pTurn = p1Turn;
            return state;
    }
}
}

function updateBoard(column, row, localBoard) {
    if (p1Turn) {
        localBoard[column][row] = P1
    } else {
        localBoard[column][row] = P2
    }
    return localBoard;
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
                p2Score =0;
            }
        }
    }
    //if no winner
    return  NOWIN;
}

function incScore(winner, localPlayerScores ) {
    if (winner === P1) {
        localPlayerScores[0]++;
        return localPlayerScores
    } 
    if (winner === P2) {
        localPlayerScores[1]++;
        return localPlayerScores
    }
} 

app.listen(8080);