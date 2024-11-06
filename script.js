
console.log("Welcome to Rhythm's games");
let music = new Audio("background-sound.mp3"); 
let turn = new Audio("click.mp3");
let gameover = new Audio("gameover.mp3");
let first = "X";
let Gameover = false; 
let playerX = "";
let playerO = "";
let scores = { X: 0, O: 0 };


document.getElementById("namePopup").style.display = "block";

const startGame = () => {
    playerX = document.getElementById("playerXName").value || "Player X";
    playerO = document.getElementById("playerOName").value || "Player O";
    document.querySelector(".info").innerText = "Turn for " + first;
    document.getElementById("namePopup").style.display = "none";
    updateLeaderboard();
};

const changeTurn = () => {
    return first === "X" ? "O" : "X";
}

const checkWin = () => {
    let boxtext = document.getElementsByClassName('boxtext');
    let wins = [
        [0, 1, 2], [3, 4, 5], [6, 7, 8],
        [0, 3, 6], [1, 4, 7], [2, 5, 8],
        [0, 4, 8], [2, 4, 6]
    ];

    wins.forEach(e => {
        if ((boxtext[e[0]].innerText === boxtext[e[1]].innerText) &&
            (boxtext[e[2]].innerText === boxtext[e[1]].innerText) &&
            (boxtext[e[0]].innerText !== "")) {

            let winner = boxtext[e[0]].innerText;
            document.querySelector('.info').innerText = winner + " Won";
            Gameover = true;
            gameover.play();

            
            if (winner === "X") {
                scores.X += 1;
            } else {
                scores.O += 1;
            }
            updateLeaderboard();

            
            let winningLine = document.getElementById('winningLine');
            let box1 = document.getElementsByClassName('box')[e[0]].getBoundingClientRect();
            let box2 = document.getElementsByClassName('box')[e[2]].getBoundingClientRect();
            let board = document.getElementById('gameBoard').getBoundingClientRect();

            let x1 = box1.left - board.left + box1.width / 2;
            let y1 = box1.top - board.top + box1.height / 2;
            let x2 = box2.left - board.left + box2.width / 2;
            let y2 = box2.top - board.top + box2.height / 2;

            let length = Math.sqrt(Math.pow(x2 - x1, 2) + Math.pow(y2 - y1, 2));
            let angle = Math.atan2(y2 - y1, x2 - x1) * (180 / Math.PI);

            winningLine.style.width = `${length}px`;
            winningLine.style.top = `${y1}px`;
            winningLine.style.left = `${x1}px`;
            winningLine.style.transform = `rotate(${angle}deg)`;
            winningLine.style.display = 'block';

            showWinnerPopup(winner);
        }
    });


    let boxtexts = document.querySelectorAll('.boxtext');
    if (![...boxtexts].some(e => e.innerText === "") && !Gameover) {
        document.querySelector('.info').innerText = "It's a Draw!";
        Gameover = true;
        setTimeout(resetGame, 2000);  
    }
};


const showWinnerPopup = (winner) => {
    document.getElementById("winnerText").innerText = (winner === "X" ? playerX : playerO) + " Wins!";
    document.getElementById("winnerPopup").style.display = "block";
};

const closeWinnerPopup = () => {
    document.getElementById("winnerPopup").style.display = "none";
    resetGame();
};


const updateLeaderboard = () => {
    let leaderboard = document.getElementById("leaderboardList");
    leaderboard.innerHTML = `<li>${playerX} (X): ${scores.X} Wins</li>
                             <li>${playerO} (O): ${scores.O} Wins</li>`;
};


const resetGame = () => {
    let boxtexts = document.querySelectorAll('.boxtext');
    Array.from(boxtexts).forEach(element => {
        element.innerText = "";
    });
    first = "X";
    Gameover = false;
    document.getElementsByClassName("info")[0].innerText = "Turn for " + first;
    document.getElementsByTagName('img')[0].style.width = "0px";


    let winningLine = document.getElementById('winningLine');
    winningLine.style.display = 'none';
}



let boxes = document.getElementsByClassName("box");
Array.from(boxes).forEach(element => {
    let boxtext = element.querySelector('.boxtext');
    element.addEventListener('click', () => {
        if (boxtext.innerText === '' && !Gameover) {
            boxtext.innerText = first;
            first = changeTurn();
            turn.play();
            checkWin();
            if (!Gameover) {
                document.getElementsByClassName("info")[0].innerText = "Turn for " + first;
            }
        }
    });
});


document.getElementById("reset").addEventListener('click', resetGame);


