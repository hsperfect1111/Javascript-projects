// Stopwatch state object to hold time data
const stopwatchState = {
  seconds: 0,
  minutes: 0,
  hours: 0,
  timer: null,
};
// Avoid Global Variables
// let [seconds, minutes, hours] = [0, 0, 0];
// let timer = null;

// DOM element reference for the time display
const displayTime = document.getElementById("displayTime");

// Update the displayed time in the format HH:MM:SS
function updateDisplay() {
  const { seconds, minutes, hours } = stopwatchState;

  // Format hours, minutes, and seconds as two digits (e.g., 01, 02, etc.)
  // let h = hours < 10 ? "0" + hours : hours;
  let h = hours < 10 ? `0${hours}` : hours;
  let m = minutes < 10 ? `0${minutes}` : minutes;
  let s = seconds < 10 ? `0${seconds}` : seconds;

  // displayTime.innerHTML = h + ":" + m + ":" + s;
  // displayTime.innerHTML = `${h}:${m}:${s}`;
  displayTime.textContent = `${h}:${m}:${s}`; // Replaced `innerHTML` with `textContent` for security and performance
}

// create function for the stopwatch, seconds value will be increasing by 1 every second
// when it will come to the 60 sec then it will become 0 and it will inc min value by 1
// and when the min will become 60 it will change the hours value by 1.
function stopwatch() {
  stopwatchState.seconds++;
  if (stopwatchState.seconds === 60) {
    stopwatchState.seconds = 0;
    stopwatchState.minutes++;
    if (stopwatchState.minutes === 60) {
      stopwatchState.minutes = 0;
      stopwatchState.hours++;
    }
  }
  updateDisplay();
}

// we have to execute stopwatch function every second
// so every second it will inc the value by 1 sec
// for that we have to use time interval
function watchStart() {
  // If a timer is already running, clear it before starting a new one
  if (stopwatchState.timer !== null) {
    clearInterval(stopwatchState.timer); // stops the existing timer if it was running.
  }
  // starts a new timer that calls the stopwatch function every 1 second (1000 milliseconds).
  stopwatchState.timer = setInterval(stopwatch, 1000); // It will repeatedly call the stopwatch function every 1000 milliseconds (1 second).
}

// Stop the stopwatch
function watchStop() {
  clearInterval(stopwatchState.timer); // Stops the timer
}

// Reset the stopwatch to 00:00:00
function watchReset() {
  clearInterval(stopwatchState.timer);
  stopwatchState.seconds = 0;
  stopwatchState.minutes = 0;
  stopwatchState.hours = 0;
  updateDisplay(); // Reset display to 00:00:00
  // displayTime.innerHTML = "00:00:00";
}

// Add event listeners to the buttons (change: Moved event handling to JS)
document.getElementById("startBtn").addEventListener("click", watchStart); // change: Event listener for start
document.getElementById("stopBtn").addEventListener("click", watchStop); // change: Event listener for stop
document.getElementById("resetBtn").addEventListener("click", watchReset); // change: Event listener for reset
