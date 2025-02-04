const PomodoroTimer = {
  isRunning: false,
  timeLeft: 0,
  workTime: 25,
  breakTime: 5,
  isWorkTime: true,
  timerId: null,

  elements: {
    minutesDisplay: document.getElementById("minutes"),
    secondsDisplay: document.getElementById("seconds"),
    startButton: document.getElementById("start"),
    pauseButton: document.getElementById("pause"),
    resetButton: document.getElementById("reset"),
    workTimeInput: document.getElementById("wtime"),
    breakTimeInput: document.getElementById("btime"),
    statusDisplay: document.getElementById("status"),
    progressBar: document.getElementById("progress"),
  },

  init() {
    this.timeLeft = this.workTime * 60;
    this.updateDisplay();
    this.setupEventListeners();
    this.elements.pauseButton.disabled = true;
  },

  setupEventListeners() {
    const { startButton, pauseButton, resetButton, workTimeInput, breakTimeInput } = this.elements;

    startButton.addEventListener("click", () => this.startTimer());
    pauseButton.addEventListener("click", () => this.pauseTimer());
    resetButton.addEventListener("click", () => this.resetTimer());

    workTimeInput.addEventListener("change", (event) => {
      this.workTime = parseInt(event.target.value);
      if (this.isWorkTime) this.resetTimer();
    });

    breakTimeInput.addEventListener("change", (event) => {
      this.breakTime = parseInt(event.target.value);
      if (!this.isWorkTime) this.resetTimer();
    });
  },

  startTimer() {
    if (!this.timerId) {
      this.timerId = setInterval(() => this.tick(), 1000);
    }
    this.toggleButtons(true);
  },

  pauseTimer() {
    clearInterval(this.timerId);
    this.timerId = null;
    this.toggleButtons(false);
    this.updateProgressBar(true); // Indicate paused state
  },

  resetTimer() {
    this.pauseTimer();
    this.isWorkTime = true;
    this.elements.statusDisplay.textContent = "Work";
    this.timeLeft = this.workTime * 60;
    this.updateDisplay();
  },

  tick() {
    this.timeLeft--;
    this.updateDisplay();

    if (this.timeLeft === 0) {
      this.switchMode();
    }
  },

  switchMode() {
    this.isWorkTime = !this.isWorkTime;
    this.timeLeft = (this.isWorkTime ? this.workTime : this.breakTime) * 60;
    this.elements.statusDisplay.textContent = this.isWorkTime ? "Work" : "Play!!!";
    this.updateDisplay();
  },

  updateDisplay() {
    const minutes = Math.floor(this.timeLeft / 60);
    const seconds = this.timeLeft % 60;
    this.elements.minutesDisplay.textContent = minutes.toString().padStart(2, "0");
    this.elements.secondsDisplay.textContent = seconds.toString().padStart(2, "0");
    this.updateProgressBar();
  },

  updateProgressBar(isPaused = false) {
    const totalTime = this.isWorkTime ? this.workTime * 60 : this.breakTime * 60;
    const progress = ((totalTime - this.timeLeft) / totalTime) * 100;

    this.elements.progressBar.style.width = `${progress}%`;
    this.elements.progressBar.style.backgroundColor = isPaused
      ? "#ff0000" // Red when paused
      : this.isWorkTime
      ? "#4caf50" // Green for work
      : "#2196f3"; // Blue for break
  },

  toggleButtons(isRunning) {
    this.elements.startButton.disabled = isRunning;
    this.elements.pauseButton.disabled = !isRunning;
  },
};

// Initialize the timer
PomodoroTimer.init();