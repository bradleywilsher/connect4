const rows = 4;
const cols = 5;
// //Flips after each turn
// let p1Turn = true;
const WIDTH = (100 / cols);
const WINNUMBER = 4;

//Scores: player1, player2
let playerScores = [0, 0];
const NOWIN = "noWin";
const P1 = "p1"
const P2 = "p2"
const P1TOKEN = "p1Token"
const P2TOKEN = "p2Token"
newBoard();

document.getElementById("resGame").addEventListener("click", restartGame);

function restartGame() {
    console.log("hi res button");
    wipeBoard();
    //newBoard();
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

            //check board for player here and append 
            col.appendChild(square);
        }
    }
}

function posClick(column, row, event) {
    console.log(`column - ${column} row - ${row}  was clicked`);
    const body = {
        col: column
    }
    $.ajax({
        type: "POST",
        url: "/game/findPlace/",
        data: JSON.stringify(body),
        contentType: "application/json",
        success: result => {
            drawPiece(column, result.pieceRow, result.pTurn, result.winner);
            updateScoreBoard(result.winner, result.playerScores);
        },
        dataType: "json"
    })
}

function wipeBoard() {

    $.get("http://localhost:8080/game/board/restart");
    for (let i = 0; i < cols; i++) {
        for (let j = 0; j < rows; j++) {
            const square = document.getElementById("square" + i + j);
            if (square) {
                console.log("try and remove: " + square.id);
                square.classList.remove(P1TOKEN);
                square.classList.remove(P2TOKEN);
            }
        }
    }
}

//Inpure - update the GUI 
function drawPiece(column, row, p1Turn, winner) {
   
    console.log("winner is :" + winner)
    if (winner !== NOWIN) {
        wipeBoard();
    } else {
    let playerClass;
    if (p1Turn) {
        playerClass = P1TOKEN;
        //p1Turn = false;
    } else {
        playerClass = P2TOKEN;
        // p1Turn = true;
    }
    document.getElementById("square" + column + row).classList.add(playerClass);
    }
}


//Either pass in NOWIN or the player scores array
function updateScoreBoard(winner, update) {
    if (winner !== NOWIN) {
        $("#p1Score").text(update[0])
        $("#p2Score").text(update[1])
    }
}

if (typeof module !== 'undefined') {
    module.exports = {
        boardInit,
    }
}