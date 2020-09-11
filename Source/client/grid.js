const rows = 4;
const cols = 5;
// //Flips after each turn
// let p1Turn = true;
const WIDTH = (100 / cols);
const WINNUMBER = 4;

//Scores: player1, player2
let playerScores = [0,0];
const NOWIN = "noWin";
const P1 = "p1"
const P2 = "p2"


//Initalise an empty 2d array
let board = Array(cols).fill().map(() => Array(rows));
boardInit();
newBoard();
function boardInit() {
    //init array to null
    for (let i = 0; i < cols; i++) {
        for (let j = 0; j < rows; j++) {
            board[i][j] = "empty";
        }
    }
}

document.getElementById("resGame").addEventListener("click", restartGame);

function restartGame() {
    console.log("hi res button");
    wipeBoard();
}

function newBoard() { 
//Create board
for (let i = 0; i < cols; i++) {
    const col = document.createElement("div");
    col.className = "cols";
    col.style = `width: ${WIDTH}%;`;
    // eslint-disable-next-line no-undef -- it does not link JQUERY
    $("#board-border").append(col);
    for (let j = 0; j < rows; j++) {
        const square = document.createElement("div");
        square.className = "squares";
        square.id = "square" + i + j;
        square.addEventListener("click", posClick.bind(null, i, j)) //
        col.appendChild(square);
    }
}
}

function posClick(column, row, event) {
    console.log(`column - ${column} row - ${row}  was clicked`);
  
    //takeMove(column);
   
    

    const body = {
        col: column
    }
     $.ajax({
        type: "POST",
        url: "/game/findPlace/",
        data: JSON.stringify(body),
        contentType: "application/json",
        success: result => {
            drawToken(column, result.pieceRow, result.pTurn);
            updateScoreBoard(result.winner, result.playerScores);
        },
        dataType: "json"
     })

}

function wipeBoard() {
    for (let i = 0; i < cols; i++) {
        for (let j = 0; j < rows; j++) {
            const square = document.getElementById("square"+i+j);
       
            if (square) {
                console.log("try and remove: " + square.id);
            square.removeChild;
            }
        }
    }
}

//Inpure - update the GUI 
function drawToken(column, row, p1Turn) {
    const token = document.createElement("div");
    token.id = "token" + column + row;
    //Assign each token to the appropriate player 
    if (p1Turn) {
        token.className += "p1Token";
        //p1Turn = false;
    } else {
        token.className += "p2Token";
       // p1Turn = true;
    }
    document.getElementById("square" + column + row).appendChild(token);
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



function takeMove(column) {
    let row = rows - 1;
    for (let i = row; i >= 0; i--) {
        if (board[column][i] === "empty") {
            drawToken(column, i);
            let winner = checkWin(column, i, updateBoard(column, i, board));


            //put result in the brackets to have a call back for when it has executed the get request
            // $.get("http://localhost:8080/hello", () => {
                
            // })
          

            updateScoreBoard(winner, incScore(winner, playerScores));
            break;
        }
    }
    p1Turn = !p1Turn;
}

//Pure
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

//Either pass in NOWIN or the player scores array
function updateScoreBoard(winner, update) {
    if (winner !== NOWIN) {
    $("#p1Score").text(update[0])
    $("#p2Score").text(update[1])
    } 
}

//Pure JS board update
function updateBoard(column, row, localBoard) {
    if (p1Turn) {
        localBoard[column][row] = P1
    } else {
        localBoard[column][row] = P2
    }
    return localBoard;
}





if (typeof module !== 'undefined') {
    module.exports = {
        boardInit,
    }
}