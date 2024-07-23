let register = document.getElementById("register");
let gameBoard = document.getElementById("gameboard")
let playersNames = document.getElementById("playersNames");
let playersArr = [];
let playerText = document.getElementById('playerText')
let restartBtn = document.getElementById('restartBtn')
let boxes = Array.from(document.getElementsByClassName('box'))
let winnerIndicator = getComputedStyle(document.body).getPropertyValue('--winning-blocks')

const O_TEXT = "O"
const X_TEXT = "X"
let currentPlayer = X_TEXT
let spaces = Array(9).fill(null)

gameboard.style.display = 'none';
restartBtn.style.display='none';



const fillPlayersArr = () => {
    document.getElementById('submit').addEventListener('click', (event) => {
        event.preventDefault();
        let firstPlayerName = document.getElementById("playerOne").value;
        let secondPlayerName = document.getElementById("playerTwo").value;
        playersArr[0] = firstPlayerName;
        playersArr[1] = secondPlayerName;
        console.log(playersArr);
        playerOne.value = '';
        playerTwo.value = '';
        register.style.display = 'none';
        playersNames.style.display = 'block';
        playersNames.innerText = `${firstPlayerName} : X  VS ${secondPlayerName} : O`
        gameboard.style.display = 'flex';
        restartBtn.style.display='block';

        })
}

const startGame = () => {
    boxes.forEach(box => box.addEventListener('click', boxClicked))
}

function boxClicked(e) {
    const id = e.target.id
    if(playersArr.length > 0){
    if(!spaces[id]){
        spaces[id] = currentPlayer
        e.target.innerText = currentPlayer

        if(playerHasWon() !==false){
            if(currentPlayer = X_TEXT){
                currentPlayer = playersArr[0];
            }
            else{currentPlayer = playersArr[1];}

            playerText.innerHTML = `${currentPlayer} has won!`
            let winning_blocks = playerHasWon()
            playersNames.style.display = 'none';

            winning_blocks.map( box => boxes[box].style.backgroundColor=winnerIndicator)
            return
        }

        currentPlayer = currentPlayer == X_TEXT ? O_TEXT : X_TEXT
    }}else;

    if(spaces.every(space => space !== null)) {
        playerText.innerHTML = `It's a draw, play again!`
    }}

const winningCombos = [
    [0,1,2],
    [3,4,5],
    [6,7,8],
    [0,3,6],
    [1,4,7],
    [2,5,8],
    [0,4,8],
    [2,4,6]
]

function playerHasWon() {
    for (const condition of winningCombos) {
        let [a, b, c] = condition

        if(spaces[a] && (spaces[a] == spaces[b] && spaces[a] == spaces[c])) {
            return [a,b,c]
        }
    }
    return false
}

// function playerHasDraw() {


// }


restartBtn.addEventListener('click', restart)

function restart() {
    spaces.fill(null)

    boxes.forEach( box => {
        box.innerText = ''
        box.style.backgroundColor=''
    })

    playerText.innerHTML = 'Tic Tac Toe'

    currentPlayer = X_TEXT
    playersArr = [];
    register.style.display = 'block';
    playersNames.style.display = 'none';
    restartBtn.style.display='none';
    gameboard.style.display = 'none';


}

startGame()
fillPlayersArr()