const greekLetters = ['α','β','γ','δ','ε','ζ','η','θ'];
let cards = [...greekLetters, ...greekLetters];

let flippedCards = [];
let matchedCards = 0;
let score = 100;

const board = document.getElementById("gameBoard");
const scoreDisplay = document.getElementById("score");

function shuffle(array) {
    return array.sort(() => Math.random() - 0.5);
}

function createBoard() {
    board.innerHTML = "";
    cards = shuffle(cards);

    cards.forEach(letter => {
        const card = document.createElement("div");
        card.classList.add("card");
        card.dataset.letter = letter;
        card.innerHTML = "";
        card.addEventListener("click", flipCard);
        board.appendChild(card);
    });
}

function flipCard() {
    if (flippedCards.length === 2 || this.classList.contains("flipped")) return;

    this.classList.add("flipped");
    this.innerHTML = this.dataset.letter;
    flippedCards.push(this);

    if (flippedCards.length === 2) {
        checkMatch();
    }
}

function checkMatch() {
    const [card1, card2] = flippedCards;

    if (card1.dataset.letter === card2.dataset.letter) {
        matchedCards += 2;
        flippedCards = [];

        if (matchedCards === cards.length) {
            setTimeout(() => alert("🎉 You Win!"), 300);
        }

    } else {
        score -= 4;
        scoreDisplay.innerText = score;

        setTimeout(() => {
            card1.classList.remove("flipped");
            card2.classList.remove("flipped");
            card1.innerHTML = "";
            card2.innerHTML = "";
            flippedCards = [];
        }, 1000);

        if (score <= 0) {
            setTimeout(() => alert("❌ Game Over! Score reached 0"), 300);
        }
    }
}

function restartGame() {
    score = 100;
    matchedCards = 0;
    flippedCards = [];
    scoreDisplay.innerText = score;
    createBoard();
}

createBoard();
