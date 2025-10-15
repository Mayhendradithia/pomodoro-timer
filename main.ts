const timerDisplay = document.getElementById("timer") as HTMLElement;
const startBtn = document.getElementById("startBtn") as HTMLButtonElement;
const stopBtn = document.getElementById("stopBtn") as HTMLButtonElement;

let timeLeft = 25 * 60;
let breakTime = 5 * 60;
let interval: number | undefined;
let isBreak = false;

function updateTimerDisplay() {
  const minutes = Math.floor(timeLeft / 60).toString().padStart(2, "0");
  const seconds = (timeLeft % 60).toString().padStart(2, "0");
  timerDisplay.textContent = `${minutes}:${seconds}`;
}

function startTimer() {
  if (interval) return;

  interval = setInterval(() => {
    timeLeft--;
    updateTimerDisplay();

    if (timeLeft <= 0) {
      clearInterval(interval);
      interval = undefined;

      if (!isBreak) {
        showAutoCloseAlert("⏳ Time to break!");
        isBreak = true;
        timeLeft = breakTime;
        startTimer();
      } else {
        showAutoCloseAlert("💪 Break over, back to work!");
        isBreak = false;
        timeLeft = 25 * 60;
      }
    }
  }, 1000);
}

function stopTimer() {
  clearInterval(interval);
  interval = undefined;
}

function showAutoCloseAlert(message: string) {
  const audio = new Audio("notification.wav");
  audio.play();


  const alertBox = document.createElement("div");
  alertBox.textContent = message;
  alertBox.style.position = "fixed";
  alertBox.style.top = "20px";
  alertBox.style.left = "50%";
  alertBox.style.transform = "translateX(-50%)";
  alertBox.style.background = "#333";
  alertBox.style.color = "#fff";
  alertBox.style.padding = "10px 20px";
  alertBox.style.borderRadius = "8px";
  alertBox.style.zIndex = "9999";
  document.body.appendChild(alertBox);

  setTimeout(() => {
    document.body.removeChild(alertBox);
  }, 5000);
}


startBtn.addEventListener("click", startTimer);
stopBtn.addEventListener("click", stopTimer);

updateTimerDisplay();
