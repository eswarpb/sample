const animalImages = [
  "https://a-z-animals.com/media/2021/12/lion.jpg",
  "https://a-z-animals.com/media/tiger_laying_hero_background.jpg",
  "https://a-z-animals.com/media/2022/05/elephant-1536x1037.jpg",
  "https://a-z-animals.com/media/2021/11/Zebra-in-field-e1653793342190.jpg",
  "https://a-z-animals.com/media/2021/05/Amazing-Rainforest-Animal_-Jaguar.jpg",
  "https://a-z-animals.com/media/animals/images/original/bear.jpg",
  "https://a-z-animals.com/media/2021/12/Mysterious-Gray-Animals-Rhinoceros.jpg",
  "https://a-z-animals.com/media/2021/12/bald-eagle-header.jpg",
];
let cards = [];
let firstCard = null;
let secondCard = null;
let attempts = 0;
let matches = 0;
let playerName = "";
let selectedLevel = "easy";
let cardCount = 8;
let score = 0;
let timer = 0;
let timerInterval;

const updateCardCount = (level) => {
  if (level === "easy") {
    cardCount = 8;
  } else if (level === "medium") {
    cardCount = 12;
  } else if (level === "difficult") {
    cardCount = 16;
  }
};

const startTimer = () => {
  timer = 0;
  timerInterval = setInterval(() => {
    timer++;
    document.getElementById("timer").textContent = `Time: ${timer} seconds`;
  }, 1000);
};

const stopTimer = () => {
  clearInterval(timerInterval);
};

/* const setupGame = () => {
        const selectedImages = animalImages.slice(0, cardCount / 2);
        cards = [...selectedImages, ...selectedImages].sort(() => 0.5 - Math.random());
        const gameBoard = document.getElementById('game-board');
        gameBoard.innerHTML = '';

        cards.forEach((image, index) => {
            const card = document.createElement('div');
            card.classList.add('card');
            card.setAttribute('data-image', image);
            card.setAttribute('data-index', index);
            card.style.backgroundImage = 'url(https://example.com/back.jpg)'; // Back of the card image
            card.addEventListener('click', flipCard);
            gameBoard.appendChild(card);
        });

        firstCard = null;
        secondCard = null;
        attempts = 0;
        matches = 0;
        score = 0;
        document.getElementById('attempts').textContent = `Attempts: ${attempts}`;
        document.getElementById('timer').textContent = `Time: 0 seconds`;
        document.getElementById('score').textContent = `Score: ${score}`;
        document.getElementById('message').textContent = '';
        stopTimer();
        startTimer();
    };

    const flipCard = (e) => {
        const clickedCard = e.currentTarget;

        if (clickedCard === firstCard || clickedCard.classList.contains('matched')) return;

        clickedCard.style.backgroundImage = `url(${clickedCard.getAttribute('data-image')})`;
        clickedCard.classList.add('flipped');

        if (!firstCard) {
            firstCard = clickedCard;
        } else {
            secondCard = clickedCard;
            attempts++;
            document.getElementById('attempts').textContent = `Attempts: ${attempts}`;

            setTimeout(checkForMatch, 1000);
        }
    };

    const checkForMatch = () => {
        if (firstCard.getAttribute('data-image') === secondCard.getAttribute('data-image')) {
            firstCard.classList.add('matched');
            secondCard.classList.add('matched');
            matches += 2;
            score += 10;
            document.getElementById('score').textContent = `Score: ${score}`;

            if (matches === cards.length) {
                stopTimer();
                document.getElementById('message').textContent = `Congratulations, ${playerName}! You matched all pairs in ${timer} seconds!`;
            }
        } else {
            firstCard.style.backgroundImage = 'url(https://example.com/back.jpg)';
            secondCard.style.backgroundImage = 'url(https://example.com/back.jpg)';
        }
        firstCard = null;
        secondCard = null;
    };*/
const setupGame = () => {
  const selectedImages = animalImages.slice(0, cardCount / 2);
  cards = [...selectedImages, ...selectedImages].sort(
    () => 0.5 - Math.random()
  );
  const gameBoard = document.getElementById("game-board");
  gameBoard.innerHTML = "";

  cards.forEach((image, index) => {
    const card = document.createElement("div");
    card.classList.add("card");
    card.setAttribute("data-image", image);
    card.setAttribute("data-index", index);
    card.textContent = "?"; // Display question mark on face-down cards
    card.style.backgroundImage = "none"; // No background image initially
    card.addEventListener("click", flipCard);
    gameBoard.appendChild(card);
  });

  firstCard = null;
  secondCard = null;
  attempts = 0;
  matches = 0;
  score = 0;
  document.getElementById("attempts").textContent = `Attempts: ${attempts}`;
  document.getElementById("timer").textContent = `Time: 0 seconds`;
  document.getElementById("score").textContent = `Score: ${score}`;
  document.getElementById("message").textContent = "";
  stopTimer();
  startTimer();
};

const flipCard = (e) => {
  const clickedCard = e.currentTarget;

  if (clickedCard === firstCard || clickedCard.classList.contains("matched"))
    return;

  clickedCard.textContent = "";
  clickedCard.style.backgroundImage = `url(${clickedCard.getAttribute(
    "data-image"
  )})`;
  clickedCard.classList.add("flipped");

  if (!firstCard) {
    firstCard = clickedCard;
  } else {
    secondCard = clickedCard;
    attempts++;
    document.getElementById("attempts").textContent = `Attempts: ${attempts}`;

    setTimeout(checkForMatch, 1000);
  }
};

const checkForMatch = () => {
  if (
    firstCard.getAttribute("data-image") ===
    secondCard.getAttribute("data-image")
  ) {
    firstCard.classList.add("matched");
    secondCard.classList.add("matched");
    matches += 2;
    score += 10;
    document.getElementById("score").textContent = `Score: ${score}`;

    if (matches === cards.length) {
      stopTimer();
      document.getElementById(
        "message"
      ).textContent = `🎉👏🎊 Congratulations, ${playerName}! You matched all pairs in ${timer} seconds! and your score is ${score} 🎉👏🎊`;

      // Add firecrackers effect using party.js
      const messageElement = document.getElementById("message");
      party.confetti(messageElement, {
        count: party.variation.range(50, 100),
      });

      // Optional: Add sound effect
      const celebrationSound = new Audio(
        "https://www.soundjay.com/misc/sounds/magic-chime-02.mp3"
      );
      celebrationSound.play();
    }
  } else {
    firstCard.textContent = "?";
    secondCard.textContent = "?";
    firstCard.style.backgroundImage = "none";
    secondCard.style.backgroundImage = "none";
  }
  firstCard = null;
  secondCard = null;
};

document.getElementById("start-button").addEventListener("click", () => {
  playerName = document.getElementById("player-name").value;

  // Check if the player has entered a name
  if (!playerName) {
    alert("Please enter your name to start the game.");
    return; // Prevent the game from starting if no name is entered
  }

  selectedLevel = document.getElementById("difficulty-level").value;
  updateCardCount(selectedLevel);
  setupGame();
  document.getElementById("name-form").style.display = "none";
  document.getElementById("game-container").style.display = "block";
});
document.getElementById("show-instructions").addEventListener("click", () => {
  const instructions = document.getElementById("instructions");
  if (
    instructions.style.display === "none" ||
    instructions.style.display === ""
  ) {
    instructions.style.display = "block";
  } else {
    instructions.style.display = "none";
  }
});

document.getElementById("reset-button").addEventListener("click", () => {
  setupGame();
});
