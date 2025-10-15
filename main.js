var timerDisplay = document.getElementById("timer");
var startBtn = document.getElementById("startBtn");
var stopBtn = document.getElementById("stopBtn");
var timeLeft = 25 * 60;
var breakTime = 5 * 60;
var interval;
var isBreak = false;
function updateTimerDisplay() {
    var minutes = Math.floor(timeLeft / 60).toString().padStart(2, "0");
    var seconds = (timeLeft % 60).toString().padStart(2, "0");
    timerDisplay.textContent = "".concat(minutes, ":").concat(seconds);
}
function startTimer() {
    if (interval)
        return;
    interval = setInterval(function () {
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
            }
            else {
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
function showAutoCloseAlert(message) {

    var audio = new Audio("notification.wav");
    audio.play();

    var alertBox = document.createElement("div");
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
    setTimeout(function () {
        document.body.removeChild(alertBox);
    }, 5000);
}
startBtn.addEventListener("click", startTimer);
stopBtn.addEventListener("click", stopTimer);
updateTimerDisplay();
