let timer;
let remainingTime = 0;
let goalText = "";

// Load stored values when popup opens
document.addEventListener("DOMContentLoaded", function () {
  chrome.storage.sync.get(["fokus_timer", "fokus_goal"], function (data) {
    remainingTime = data.fokus_timer || 0;
    goalText = data.fokus_goal || "";
    document.getElementById("goal-text").value = goalText;
    updateTimerDisplay();

    // Resume timer if it was running
    if (remainingTime > 0) {
      startCountdown();
    }
  });
});

// Start Timer with Goal
document.getElementById("start-timer").addEventListener("click", function () {
  let minutes = parseInt(document.getElementById("goal-time").value);
  goalText = document.getElementById("goal-text").value;

  if (!minutes || !goalText.trim()) {
    return alert("Set a goal and focus time first!");
  }

  remainingTime = minutes * 60;
  chrome.storage.sync.set({ fokus_timer: remainingTime, fokus_goal: goalText });

  updateTimerDisplay();
  startCountdown();
});

function startCountdown() {
  if (timer) clearInterval(timer);
  timer = setInterval(countdown, 1000);
}

// Countdown Function
function countdown() {
  if (remainingTime > 0) {
    remainingTime--;
    chrome.storage.sync.set({ fokus_timer: remainingTime });
    updateTimerDisplay();
  } else {
    clearInterval(timer);
    chrome.storage.sync.remove("fokus_timer");
    alert(`Time’s up! Did you achieve your goal?\nGoal: ${goalText}`);
  }
}

// Update Timer Display
function updateTimerDisplay() {
  let mins = Math.floor(remainingTime / 60);
  let secs = remainingTime % 60;
  document.getElementById("timer-display").textContent = `⏳ ${mins}:${secs < 10 ? "0" : ""}${secs}`;
}
