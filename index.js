let colors = [
  { name: "rosso", color: "#e53935" },
  { name: "blu", color: "#1e88e5" },
  { name: "giallo", color: "#fdd835" },
  { name: "verde", color: "#43a047" },
  { name: "arancione", color: "#fb8c00" },
  { name: "viola", color: "#8e24aa" },
  { name: "rosa", color: "#f06292" },
  { name: "nero", color: "#212121" },
];
let started = false;
let level = 0;
let correctAnswer;
const startButton = document.querySelector("#start-button");
let levelDisplay = document.querySelector("#level-value");
const title = document.querySelector("#prompt-word");
const result = document.querySelector("#result-text");
let buttons = document.querySelectorAll(".choice");

startButton.addEventListener("click", function () {
  if (!started) {
    started = true;
    level = 0;
    startButton.style.display = "none";
    nextRound();
  }
});
function nextRound() {
  result.innerText = "";
  levelDisplay.innerText = level + 1;
  correctAnswer = colors[level];
  title.innerText = correctAnswer.name;
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
    buttons[i].dataset.color = items[i].name;
    swatch[i].style.backgroundColor = items[i].color;
  }
}
for (let i = 0; i < buttons.length; i++) {
  buttons[i].addEventListener("click", function () {
    if (started) {
      let clickedButton = this;
      let clickedColor = this.dataset.color;
      if (clickedColor === correctAnswer.name) {
        result.innerText = "Esatto!";
        clickedButton.classList.add("correct");
        setTimeout(function () {
          clickedButton.classList.remove("correct");
        }, 800);
        if (level === colors.length - 1) {
          title.innerText = "Bravo, hai vinto!";
          confetti({ particleCount: 120, spread: 70, origin: { y: 0.6 } });
          confetti({ particleCount: 120, spread: 70, origin: { x: 0.2 } });
          confetti({ particleCount: 120, spread: 70, origin: { x: 0.8 } });
          result.innerText = "";
          setTimeout(function () {
            startOver();
          }, 3000);
          return;
        }
        level++;
        setTimeout(function () {
          result.innerText = "";
          nextRound();
        }, 800);
      } else {
        result.innerText = "OOPPPSS, sbagliato!";
        clickedButton.classList.add("wrong");
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
  result.innerText = "";
  title.innerText = "Premi START per iniziare ";
  started = false;
  level = 0;
  levelDisplay.innerText = level;
  startButton.style.display = "block";
}
