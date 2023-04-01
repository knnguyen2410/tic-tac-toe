// declare globale variables needed to manipulate DOM
// cut out unnecessary variables later
const buttonNewGame = document.querySelector("#button-new")
const buttonResetScores = document.querySelector("#button-reset")

const gameElement = document.querySelector(".game")
const gameBoard = document.querySelector(".game-board")
const allTiles = document.querySelectorAll(".tile")
const allScores = document.querySelectorAll(".score")

const playerOneElement = document.querySelector(".player-one")
const playerOneStatus = document.querySelector(".player-one .status")
const playerOneName = document.querySelector(".player-one .name")
const playerOneScore = document.querySelector(".player-one .score")

const playerTwoElement = document.querySelector(".player-two")
const playerTwoStatus = document.querySelector(".player-two .status")
const playerTwoName = document.querySelector(".player-two .name")
const playerTwoScore = document.querySelector(".player-two .score")

const tieElement = document.querySelector(".tie")
const tieStatus = document.querySelector(".tie .status")
const tieName = document.querySelector(".tie .name")
const tieScore = document.querySelector(".tie .score")

// can use these variables to change symbols later, update the player names
let playerOneSymbol = "X"
let playerTwoSymbol = "O"

let playerOneTurn = true // starts off with player one 
playerOneStatus.innerText = "Your Turn" // starts with player one's turn

let winYet = false // no winner at start of the game
playerOneScore.innerText = 0 // start scores at zero
playerTwoScore.innerText = 0
tieScore.innerText = 0

// when New Game button clicked, clear the board's contents
buttonNewGame.addEventListener("click", function() {
    allTiles.forEach(function(tile) {
        tile.innerText = ""
    })
    winYet = false // no winner at start of new game
    playerOneTurn = true // starts new game with player one
    playerOneStatus.innerText = "Your Turn" 
    playerTwoStatus.innerText = ""
    tieStatus.innerText = ""
})

// when Reset Scores button clicked, resets all scores to 0
buttonResetScores.addEventListener("click", function() {
    allScores.forEach(function(score) {
        score.innerText = 0
    })
})

gameOn()

// when an empty tile is clicked, switch between the following:
// 1. turning innerText to X and O
// 2. saying whose turn it is
// 3. check for win and stop clickability if winner
function gameOn() {
    allTiles.forEach(function(tile) {
        tile.addEventListener("click", function(){ // makes tiles clickable
            if (winYet === false && tile.innerText === "") { // if no winner yet and the tile isn't blank 
                if (playerOneTurn) {
                    tile.innerText = playerOneSymbol // player one symbol for tile's innerText
                    playerOneStatus.innerText = "" // indicates player one's turn
                    playerTwoStatus.innerText = "Your Turn"
                } else {
                    tile.innerText = playerTwoSymbol // player two symbole for tile's innerText
                    playerOneStatus.innerText = "Your Turn"
                    playerTwoStatus.innerText = "" // indicates player two's turn
                }
                checkWin() // check for winner after each click
                checkTie() // check for tie after each click
                playerOneTurn = !playerOneTurn // switches between player one's and player two's turns
            }
        })
    })
}

gameOn()

function checkWin() {
    const winningDivs = [ // these will become the index values of each winning combination in the allTiles array
        [0, 1, 2], // row top
        [3, 4, 5], // row center
        [6, 7, 8], // row bottom
        [0, 3, 6], // column left
        [1, 4, 7], // column center
        [2, 5, 8], // column right
        [0, 4, 8], // diagonal top-left to bottom-right
        [2, 4, 6]  // diagonal top-right to bottom-left
    ]

    for (let i = 0; i < winningDivs.length; i++) { // for every possible winning combination
        let [a, b, c] = winningDivs[i] // take all the numbers in each winningDivs child array
        if ( // and use those numbers as the index values for the allTiles array
            allTiles[a].innerText !== "" && // excludes blank tiles
            allTiles[a].innerText === allTiles[b].innerText && // if the values in 3 spots are the same
            allTiles[b].innerText === allTiles[c].innerText
        ) {
            winYet = true // declares winner

            if (playerOneStatus.innerText === "") { // updates winner status
                playerOneStatus.innerText = "Winner!"
                playerTwoStatus.innerText = "Loser"
                playerOneScore.innerText = Number(playerOneScore.innerText) + 1 // increase score by 1
            } else {
                playerOneStatus.innerText = "Loser"
                playerTwoStatus.innerText = "Winner!"
                playerTwoScore.innerText = Number(playerTwoScore.innerText) + 1 // increase score by 1
            }
        } 
    }
}

function checkTie() {
    if (winYet === false) { // if no winner yet (this covers the situation if there is a winning move in the 9th move of the game)
        let moveTracker = []
        for (let i = 0; i < allTiles.length; i++) {
            moveTracker.push(allTiles[i].innerText) // tracks player symbols at each index
        }
        if (moveTracker.includes("")) { // all 9 tiles not filled yet
            console.log("No Tie") 
        } else {
            tieStatus.innerText = "It's a Tie" // no winner and all 9 tiles are filled
            tieScore.innerText = Number(tieScore.innerText) + 1 // increase score by 1
            playerOneStatus.innerText = ""
            playerTwoStatus.innerText = ""
        }
        console.log(moveTracker)
    }
}
