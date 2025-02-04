let isRunning = false; // Tracks if timer is currently running
let timeLeft; // Remaining time in seconds
let workTime = 25; // Work duration in minutes
let breakTime = 5; // Break duration in minutes
let isWorkTime = true; // Tracks if we're working or in break mode
let timerId = null; // Hold the interval id for the timer

const minutesDisplay = document.getElementById("minutes");
const secondsDisplay = document.getElementById("seconds");
const startButton = document.getElementById("start");
const pauseButton = document.getElementById("pause");
const resetButton = document.getElementById("reset");
const workTimeInput = document.getElementById("wtime");
const breakTimeInput = document.getElementById("btime");
const statusDisplay = document.getElementById("status");
const progressBar = document.getElementById("progress");

// Start with work time
function initTimer() {
  timeLeft = workTime * 60; // mins to seconds
  updateDisplay();
}

// Update the timer display
function updateDisplay() {
  const minutes = Math.floor(timeLeft / 60);
  const seconds = timeLeft % 60;
  minutesDisplay.textContent = minutes.toString().padStart(2, "0");
  secondsDisplay.textContent = seconds.toString().padStart(2, "0");

  updateProgressBar();
}

// Update the progress bar
function updateProgressBar() {
  const totalTime = isWorkTime ? workTime * 60 : breakTime * 60;
  const progress = ((totalTime - timeLeft) / totalTime) * 100;

  progressBar.style.width = `${progress}%`;
  progressBar.style.backgroundColor = isWorkTime ? "#4caf50" : "#2196f3";
}

// Start the timer
function startTimer() {
  if (timerId === null) {
    timerId = setInterval(() => {
      timeLeft--;
      updateDisplay();

      if (timeLeft === 0) {
        switchMode();
      }
    }, 1000);
  }

  startButton.disabled = true;
  pauseButton.disabled = false;
}

function pauseTimer() {
  clearInterval(timerId);
  timerId = null;

  startButton.disabled = false;
  pauseButton.disabled = true;
}

function resetTimer() {
  pauseTimer();
  isWorkTime = true;
  statusDisplay.textContent = "Work";
  initTimer();
}

function switchMode() {
  isWorkTime = !isWorkTime; // toggle between work and break

  timeLeft = (isWorkTime ? workTime : breakTime) * 60;
  statusDisplay.textContent = isWorkTime ? "Work" : "Play!!!";
  updateDisplay();
}

startButton.addEventListener("click", startTimer);
pauseButton.addEventListener("click", pauseTimer);
resetButton.addEventListener("click", resetTimer);

workTimeInput.addEventListener("change", (event) => {
  workTime = parseInt(event.target.value);
  if (isWorkTime) {
    resetTimer();
  }
});

breakTimeInput.addEventListener("change", (event) => {
  breakTime = parseInt(event.target.value);
  if (!isWorkTime) {
    resetTimer();
  }
});

pauseButton.disabled = true;
initTimer();