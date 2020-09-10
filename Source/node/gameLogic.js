// eslint-disable-next-line no-undef
const express = require("express");
const P1 = "p1"
const P2 = "p2"

const rows = 4;
const cols = 5;

let p1Turn = true;

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
    //res.send("Hi");
  });


//res.json sends the response back

function findPlace(column) {
console.log("Find place: " + column);

    let row = rows - 1;
    for (let i = row; i >= 0; i--) {
        if (board[column][i] === "empty") {
            console.log("badaaa: " [column, i]);
            return [column, i];
    }
}
}


// function takeMove(column) {
//     let row = rows - 1;
//     for (let i = row; i >= 0; i--) {
//         if (board[column][i] === "empty") {
//             drawToken(column, i);
//             let winner = checkWin(column, i, updateBoard(column, i, board));


//             //put result in the brackets to have a call back for when it has executed the get request
//             // $.get("http://localhost:8080/hello", () => {
                
//             // })
          

//             updateScoreBoard(winner, incScore(winner, playerScores));
//             break;
//         }
//     }
//     p1Turn = !p1Turn;
// }



// app.get("/game/state/col:curcol"), (req,res) => {
//     console.log
// });

app.listen(8080);