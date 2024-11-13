const gameBoard = document.getElementById("game-board");
const restartBtn = document.getElementById("restart-btn");

let cards = ["❤️", "❤️", "💛", "💛", "💚", "💚", "💙", "💙", "🖤", "🖤", "🤍", "🤍", "🤎", "🤎", "🧡", "🧡"];
let flippedCards = [];
let matchedCards = [];


function startGame() {
    gameBoard.innerHTML = "";
    matchedCards = [];
    flippedCards = [];
    
   
    shuffle(cards).forEach(symbol => {
        const card = document.createElement("div");
        card.classList.add("card", "flipped"); 
        card.dataset.symbol = symbol;
        card.innerText = symbol; 
        card.addEventListener("click", flipCard);
        gameBoard.appendChild(card);
    });

  
    setTimeout(() => {
        document.querySelectorAll(".card").forEach(card => {
            card.classList.remove("flipped");
            card.innerText = ""; 
        });
    }, 1000);
}


function shuffle(array) {
    return array.sort(() => Math.random() - 0.5);
}


function flipCard() {
    if (flippedCards.length < 2 && !this.classList.contains("flipped")) {
        this.classList.add("flipped");
        this.innerText = this.dataset.symbol;
        flippedCards.push(this);

        if (flippedCards.length === 2) {
            checkForMatch();
        }
    }
}

function checkForMatch() {
    const [card1, card2] = flippedCards;
    if (card1.dataset.symbol === card2.dataset.symbol) {
        matchedCards.push(card1, card2);
        flippedCards = [];

        
        if (matchedCards.length === cards.length) {
            setTimeout(() => alert("Congratulations! You found all matches!"), 500);
        }
    } else {
        setTimeout(() => {
            card1.classList.remove("flipped");
            card2.classList.remove("flipped");
            card1.innerText = "";
            card2.innerText = "";
            flippedCards = [];
        }, 1000);
    }
}


restartBtn.addEventListener("click", startGame);


startGame();

