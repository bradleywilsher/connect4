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
initState();

document.getElementById("resGame").addEventListener("click", restartGame);

function restartGame() {
    console.log("hi res button");
    wipeBoard();
    //newBoard();
}

function initState() {
   console.log("call state");
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



function newBoard(state) {
    //console.log("board in client: " + board)
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


            //Move out into function 
            let playerClass;
            if (state[i][j] === P1) {
                square.classList.add(P1TOKEN)
            } else {
            if (state[i][j] === P2) {
                square.classList.add(P2TOKEN)
            }
            }

            //check board for player here and append 
            col.appendChild(square);
            // drawPiece(i,j, state.board[i][j], NOWIN)
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
            drawPiece(column, result.pieceRow, !(result.p1Turn), result.winner);
            updateScoreBoard(result.playerScores);
            // takeTurn(result.p1Turn)

        },
        dataType: "json"
    })
}


// function takeTurn(p1Turn) {
//     const body = {
//         p1Turn: p1Turn
//     }
//     $.ajax({
//         type: "POST",
//         url: "/game/updateTurn/",
//         data: JSON.stringify(body),
//         contentType: "application/json",
//         success: result => {
        
//         },
//         dataType: "json"
//     })
// }

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
//Hacked the variable p1Turn so I can also call it with the value of the board when restarting
function drawPiece(column, row, p1Turn, winner) {
   
    console.log("winner is :" + winner)
    console.log(p1Turn)
    if (winner !== NOWIN) {
        wipeBoard();
    } else {
    let playerClass;
    if (p1Turn === true) {
        console.log("hi I think it is red")
        playerClass = P1TOKEN;
        //p1Turn = false;
    } 

    if (p1Turn === false) {
        console.log("hi I think it is blue")
        playerClass = P2TOKEN;
    }

    document.getElementById("square" + column + row).classList.add(playerClass);
    }
}


//Either pass in NOWIN or the player scores array
function updateScoreBoard(update) {
    
        $("#p1Score").text(update[0])
        $("#p2Score").text(update[1])
    
}

if (typeof module !== 'undefined') {
    module.exports = {
        boardInit,
    }
}