let remainingTime = 0;
let timer;
let goalText = "";

// Load timer from storage when extension starts
chrome.runtime.onStartup.addListener(() => {
  chrome.storage.sync.get(["fokus_timer", "fokus_goal"], function (data) {
    remainingTime = data.fokus_timer || 0;
    goalText = data.fokus_goal || "";
    
    if (remainingTime > 0) {
      startCountdown();
    }
  });
});

// Listen for messages from popup.js
chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  if (message.action === "start_timer") {
    remainingTime = message.time;
    goalText = message.goal;
    
    chrome.storage.sync.set({ fokus_timer: remainingTime, fokus_goal: goalText });
    startCountdown();
  } else if (message.action === "get_timer") {
    sendResponse({ time: remainingTime, goal: goalText });
  }
});

function startCountdown() {
  if (timer) clearInterval(timer);
  timer = setInterval(() => {
    if (remainingTime > 0) {
      remainingTime--;
      chrome.storage.sync.set({ fokus_timer: remainingTime });
    } else {
      clearInterval(timer);
      chrome.storage.sync.remove("fokus_timer");
      chrome.notifications.create({
        type: "basic",
        iconUrl: "icons/icon48.png",
        title: "Fokus - Time's Up!",
        message: `Did you achieve your goal?\nGoal: ${goalText}`,
      });
    }
  }, 1000);
}
