//Board size - should be migrated to server 
const rows = 4;
const cols = 5;

 
const WIDTH = (100 / cols);
const NOWIN = "noWin";
const P1 = "p1"
const P2 = "p2"
const P1TOKEN = "p1Token"
const P2TOKEN = "p2Token"

initState();

document.getElementById("resGame").addEventListener("click", restartGame);

//Loads current game state from the server
function initState() {
    $.ajax({
        type: "GET",
        url: "/game/getState/",
        contentType: "application/json",
        success: result => {
            newBoard(result.board);
            updateScoreBoard(result.playerScores)
        },
        dataType: "json"
    })
}

//Draws the board in it's current state
function newBoard(state) {
    for (let i = 0; i < cols; i++) {
        const col = document.createElement("div");
        col.className = "cols";
        col.style = `width: ${WIDTH}%;`;
        $("#board-border").append(col);
        for (let j = 0; j < rows; j++) {

            const square = document.createElement("div");
            square.className = "squares";
            square.id = "square" + i + j;
            square.addEventListener("click", posClick.bind(null, i, j));

            //Check board position and place token if it is already taken
            //Move to seperate function 
            let playerClass;
            if (state[i][j] === P1) {
                square.classList.add(P1TOKEN)
            } else {
                if (state[i][j] === P2) {
                    square.classList.add(P2TOKEN)
                }
            }
            col.appendChild(square);
        }
    }
}

//Detect a click on the board, and call server to find the correct place for the token
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
            drawPiece(column, result.pieceRow, !(result.p1Turn), result.winner);
            updateScoreBoard(result.playerScores);
        },
        dataType: "json"
    })
}

function restartGame() {
    wipeBoard();
}

function wipeBoard() {
    $.get("/game/board/restart");
    for (let i = 0; i < cols; i++) {
        for (let j = 0; j < rows; j++) {
            const square = document.getElementById("square" + i + j);
            if (square) {
                square.classList.remove(P1TOKEN);
                square.classList.remove(P2TOKEN);
            }
        }
    }
}

function drawPiece(column, row, p1Turn, winner) {
    if (winner !== NOWIN) {
        wipeBoard();
    } else {
        let playerClass;
        if (p1Turn === true) {
            playerClass = P1TOKEN;
        }
        if (p1Turn === false) {
            playerClass = P2TOKEN;
        }
        document.getElementById("square" + column + row).classList.add(playerClass);
    }
}

function updateScoreBoard(update) {
    $("#p1Score").text(update[0])
    $("#p2Score").text(update[1])
}

if (typeof module !== 'undefined') {
    module.exports = {
        boardInit,
    }
}