let colors = [
  { translations: { it: "rosso", en: "red" }, color: "#e53935" },
  { translations: { it: "blu", en: "blue" }, color: "#1e88e5" },
  { translations: { it: "giallo", en: "yellow" }, color: "#fdd835" },
  { translations: { it: "verde", en: "green" }, color: "#43a047" },
  { translations: { it: "arancione", en: "orange" }, color: "#fb8c00" },
  { translations: { it: "viola", en: "purple" }, color: "#8e24aa" },
  { translations: { it: "rosa", en: "pink" }, color: "#f06292" },
  { translations: { it: "nero", en: "black" }, color: "#212121" },
];
let started = false;
let level = 0;
let mode = "it";
let correctAnswer;
let interfaceLanguage = "en";
let gameColors = [];
const languageToggle = document.querySelector("#language-toggle");
const startButton = document.querySelector("#start-button");
let levelDisplay = document.querySelector("#level-value");
const promptWord = document.querySelector("#prompt-word");
const result = document.querySelector("#result-text");
let buttons = document.querySelectorAll(".choice");
const hintText = document.querySelector("#hint-text");
const siteTitle = document.querySelector(".site-title");
const levelLabel = document.querySelector(".pill-label");
const star1 = document.querySelector("#star-1");
const star2 = document.querySelector("#star-2");
const star3 = document.querySelector("#star-3");
const star4 = document.querySelector("#star-4");
updateInterface();

function makeSound() {
  let correctItemSound = new Audio(
    "/sounds/" + correctAnswer.translations[mode] + ".mp3",
  );
  correctItemSound.play();
}
function t(en, it) {
  if (interfaceLanguage === "en") {
    return en;
  } else {
    return it;
  }
}
function updateStars(totalItems) {
  const progress = level / totalItems;

  if (progress >= 0.25) {
    star1.classList.add("filled");
  }

  if (progress >= 0.5) {
    star2.classList.add("filled");
  }

  if (progress >= 0.75) {
    star3.classList.add("filled");
  }

  if (level === totalItems) {
    star4.classList.add("filled");
  }
}
function updateInterface() {
  hintText.innerText = t("Click the right colour!", "Clicca il colore giusto!");
  siteTitle.innerText = t("COLOURS", "COLORI");
  levelLabel.innerText = t("Level", "Livello");

  if (!started) {
    promptWord.innerText = t("PRESS START", "PREMI START");
  }
}
languageToggle.addEventListener("click", function () {
  if (mode === "it") {
    mode = "en";
    interfaceLanguage = "it";
  } else {
    mode = "it";
    interfaceLanguage = "en";
  }
  languageToggle.classList.toggle("en");
  updateInterface();
  if (started) {
    startOver();
  }
});

startButton.addEventListener("click", function () {
  if (!started) {
    started = true;
    level = 0;
    startButton.style.display = "none";
    gameColors = [...colors];
    shuffle(gameColors);
    nextRound();
  }
});
function nextRound() {
  result.innerText = "";
  levelDisplay.innerText = level + 1;
  correctAnswer = gameColors[level];
  makeSound();
  promptWord.innerText = correctAnswer.translations[mode];
  let displayedItems = [...colors];
  shuffle(displayedItems);
  displayChoices(displayedItems);
}

function shuffle(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
}
function displayChoices(items) {
  let swatch = document.querySelectorAll(".color-swatch");
  for (let i = 0; i < items.length; i++) {
    buttons[i].dataset.color = items[i].translations[mode];
    swatch[i].style.backgroundColor = items[i].color;
  }
}
for (let i = 0; i < buttons.length; i++) {
  buttons[i].addEventListener("click", function () {
    if (started) {
      let clickedButton = this;
      let clickedColor = this.dataset.color;
      if (clickedColor === correctAnswer.translations[mode]) {
        result.innerText = t("Correct!", "Esatto!");
        clickedButton.classList.add("correct");
        let correctSound = new Audio("/sounds/correctAnswer.wav");
        correctSound.play();
        setTimeout(function () {
          clickedButton.classList.remove("correct");
        }, 800);
        level++;
        updateStars(gameColors.length);
        if (level === gameColors.length) {
          promptWord.innerText = t("Great job, you won!", "Bravo, hai vinto!");
          if (mode === "en") {
            let winningGameSoundIt = new Audio("/sounds/MessaggioVincita.mp3");
            winningGameSoundIt.play();
          } else {
            let winningGameSoundEn = new Audio("/sounds/WinVoiceMessage.mp3");
            winningGameSoundEn.play();
          }
          confetti({ particleCount: 120, spread: 70, origin: { y: 0.6 } });
          confetti({ particleCount: 120, spread: 70, origin: { x: 0.2 } });
          confetti({ particleCount: 120, spread: 70, origin: { x: 0.8 } });
          result.innerText = "";
          hintText.innerText = "";
          setTimeout(function () {
            startOver();
          }, 3000);
          return;
        }

        setTimeout(function () {
          result.innerText = "";
          nextRound();
        }, 800);
      } else {
        result.innerText = t("OOOPS, wrong!", "OOOPS, sbagliato!");
        clickedButton.classList.add("wrong");
        let gameOverSound = new Audio("/sounds/gameOver.wav");
        gameOverSound.play();
        document.querySelector(".app").classList.add("game-over");
        setTimeout(function () {
          clickedButton.classList.remove("wrong");
          document.querySelector(".app").classList.remove("game-over");
        }, 800);
        setTimeout(function () {
          startOver();
        }, 1000);
      }
    }
  });
}
function startOver() {
  started = false;
  level = 0;
  levelDisplay.innerText = 0;
  startButton.style.display = "block";
  result.innerText = "";
  gameColors = [];
  updateInterface();
  star1.classList.remove("filled");
  star2.classList.remove("filled");
  star3.classList.remove("filled");
  star4.classList.remove("filled");
}
