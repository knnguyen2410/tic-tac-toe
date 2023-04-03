// declare globale variables needed to manipulate DOM
const buttonTheme = document.querySelector(".theme")
const buttonNewGame = document.querySelector("#button-new")
const buttonResetScores = document.querySelector("#button-reset")
const allTiles = document.querySelectorAll(".tile")
const allScores = document.querySelectorAll(".score")
const playerOneStatus = document.querySelector(".player-one .status")
const playerOneScore = document.querySelector(".player-one .score")
const playerTwoStatus = document.querySelector(".player-two .status")
const playerTwoScore = document.querySelector(".player-two .score")
const tieStatus = document.querySelector(".tie .status")
const tieScore = document.querySelector(".tie .score")

// brand new game starting conditions
let playerOneTurn = true // starts off with player one 
playerOneStatus.innerText = "Your Turn" // starts with player one's turn

let winYet = false // no winner at start of the game
playerOneScore.innerText = 0 // start scores at zero
playerTwoScore.innerText = 0
tieScore.innerText = 0

//let players choose their symbols
let playerOneSymbol = "" 
let playerTwoSymbol = ""

// switch between light and dark mode
buttonTheme.addEventListener("click", function() {
    document.body.classList.toggle("dark-mode")
    if (document.body.classList.contains("dark-mode")) {
        buttonTheme.innerText = "Light Mode"
    } else {
        buttonTheme.innerText = "Dark Mode"
    }
})

// when New Game button clicked, clear the board's contents
buttonNewGame.addEventListener("click", function() {
    allTiles.forEach(function(tile) {
        tile.innerHTML = ""
    })
    winYet = false // no winner at start of new game
    playerOneTurn = true // starts new game with player one
    playerOneStatus.innerText = "Your Turn" 
    playerTwoStatus.innerText = ""
    tieStatus.innerText = ""
    gameOn()
})

// when Reset Scores button clicked, resets all scores to 0
buttonResetScores.addEventListener("click", function() {
    allScores.forEach(function(score) {
        score.innerText = 0
    })
})

alert("Welcome to Tic-Tac-Toe")
chooseSymbol()

// allows player to customize their symbol (defaults to X & O)
function chooseSymbol() {
    playerOneSymbol = prompt("Player 1: Enter Your Symbol or Image URL")
    if (playerOneSymbol === "") { // doesn't allow blank entries
        playerOneSymbol = "X"
    }
    if (!playerOneSymbol.trim()) { // doesn't allow string of whitespace
        while (!playerOneSymbol.trim()) {
            playerOneSymbol = prompt("Player 1: Choose Something Else")
        }
    }
    if (/\.(jpg|jpeg|png|webp|avif|gif|svg)$/.test(playerOneSymbol)) {  // checks to see if URL string ends in image extension. source https://bobbyhadz.com/blog/javascript-check-if-url-is-image
        playerOneSymbol = `<img class = "token" src="${playerOneSymbol}">`
    }

    playerTwoSymbol = prompt("Player 2: Enter Your Symbol or Image URL")
    if (playerTwoSymbol === "") {
        playerTwoSymbol = "O"
    }
    if (!playerTwoSymbol.trim()) {
        while (!playerTwoSymbol.trim()) {
            playerTwoSymbol = prompt("Player 2: Choose Something Else")
        }
    }
    if (/\.(jpg|jpeg|png|webp|avif|gif|svg)$/.test(playerTwoSymbol)) {  
        playerTwoSymbol = `<img class = "token" src="${playerTwoSymbol}">`
    }
    while (playerTwoSymbol === playerOneSymbol) { // doesn't let player1 and player2 symbols be the same
        playerTwoSymbol = prompt("Player 2: Choose Something Else")
        if (/\.(jpg|jpeg|png|webp|avif|gif|svg)$/.test(playerTwoSymbol)) { 
            playerTwoSymbol = `<img class = "token" src="${playerTwoSymbol}">`
        }
    }
    gameOn()
}

// when an empty tile is clicked, switch between the following:
// 1. turning innerText to X and O
// 2. saying whose turn it is
// 3. check for win and stop clickability if winner
function gameOn() {    
    allTiles.forEach(function(tile) {
        tile.addEventListener("mouseover", hoverEffect)
        tile.addEventListener("mouseout", hoverEffectRemove)
        tile.addEventListener("click", clickTile)

        function hoverEffect() {
            if (winYet === true) {
                return
            }
            if (playerOneTurn && tile.innerHTML === "") {
                tile.innerHTML = playerOneSymbol
            } 
            if(!playerOneTurn && tile.innerHTML === "") {
                tile.innerHTML = playerTwoSymbol
            }
        }    
        
        function hoverEffectRemove() {
            if (winYet === true) {
                return
            }
            tile.innerHTML = ""
        }
        
        function clickTile() {
            if (winYet === true && tile.innerHTML === "") {
                return
            }
            tile.removeEventListener("mouseover", hoverEffect)
            tile.removeEventListener("mouseout", hoverEffectRemove)
            tile.removeEventListener("click", clickTile)
            if (playerOneTurn) {
                tile.innerHTML = playerOneSymbol // player one symbol for tile's innerText
                playerOneStatus.innerText = "" // indicates player one's turn
                playerTwoStatus.innerText = "Your Turn"
            } else {
                tile.innerHTML = playerTwoSymbol // player two symbole for tile's innerText
                playerOneStatus.innerText = "Your Turn"
                playerTwoStatus.innerText = "" // indicates player two's turn
            }
            checkWin() // check for winner after each click
            checkTie() // check for tie after each click
            playerOneTurn = !playerOneTurn // switches between player one's and player two's turns
        }
    })
}

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
            allTiles[b].innerText === allTiles[c].innerText ||
            allTiles[a].innerHTML !== "" && // excludes blank tiles
            allTiles[a].innerHTML === allTiles[b].innerHTML && // if the values in 3 spots are the same
            allTiles[b].innerHTML === allTiles[c].innerHTML
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
            moveTracker.push(allTiles[i].innerHTML) // tracks player symbols at each index
        }
        if (moveTracker.includes("")) { // all 9 tiles not filled yet
        } else {
            tieStatus.innerText = "It's a Tie" // no winner and all 9 tiles are filled
            tieScore.innerText = Number(tieScore.innerText) + 1 // increase score by 1
            playerOneStatus.innerText = ""
            playerTwoStatus.innerText = ""
        }
    }
}