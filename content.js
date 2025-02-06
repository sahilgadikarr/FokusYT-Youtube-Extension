document.addEventListener("keydown", function (event) {
    if ((event.ctrlKey || event.metaKey) && event.key.toLowerCase() === "n") {
      event.preventDefault();
      addNote();
    }
  });
  
  function addNote() {
    let video = document.querySelector("video");
    if (video) {
      let currentTime = video.currentTime;
      let note = prompt(`Add a note for ${formatTime(currentTime)}:`);
  
      if (note) {
        let notes = JSON.parse(localStorage.getItem("fokus_notes")) || [];
        notes.push({ time: currentTime, text: note });
        localStorage.setItem("fokus_notes", JSON.stringify(notes));
        alert("Note added!");
      }
    }
  }
  
  // Format Time Function
  function formatTime(seconds) {
    let mins = Math.floor(seconds / 60);
    let secs = Math.floor(seconds % 60);
    return `${mins}:${secs < 10 ? "0" : ""}${secs}`;
  }
  