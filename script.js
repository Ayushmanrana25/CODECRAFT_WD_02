
let [hours, minutes, seconds, milliseconds] = [0, 0, 0, 0];
let display = document.getElementById('display');
let timer = null;

document.getElementById('startBtn').addEventListener('click', startTimer);
document.getElementById('pauseBtn').addEventListener('click', pauseTimer);
document.getElementById('resetBtn').addEventListener('click', resetTimer);
document.getElementById('lapBtn').addEventListener('click', recordLap);

function updateDisplay() {
  let h = hours < 10 ? '0' + hours : hours;
  let m = minutes < 10 ? '0' + minutes : minutes;
  let s = seconds < 10 ? '0' + seconds : seconds;
  let ms = milliseconds < 10 ? '00' + milliseconds :
           milliseconds < 100 ? '0' + milliseconds : milliseconds;

  display.innerText = `${h}:${m}:${s}:${ms}`;
}

function timerCycle() {
  milliseconds += 10;

  if (milliseconds >= 1000) {
    milliseconds = 0;
    seconds++;
    if (seconds >= 60) {
      seconds = 0;
      minutes++;
      if (minutes >= 60) {
        minutes = 0;
        hours++;
      }
    }
  }

  updateDisplay();
}

function startTimer() {
  if (timer !== null) return;
  timer = setInterval(timerCycle, 10); // every 10 milliseconds
}

function pauseTimer() {
  clearInterval(timer);
  timer = null;
}

function resetTimer() {
  clearInterval(timer);
  timer = null;
  [hours, minutes, seconds, milliseconds] = [0, 0, 0, 0];
  updateDisplay();
  document.getElementById('laps').innerHTML = '';
}

function recordLap() {
  let laps = document.getElementById('laps');
  let li = document.createElement('li');
  li.innerText = display.innerText;
  laps.appendChild(li);
}

// Initialize display at start
updateDisplay();
