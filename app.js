// === AUDIO ======================================

function playNote() {
  var audio = new Audio('piano.mp3');
  audio.play();
}



// === DRAWING ============================================

// Draw and return Rectangle.
// TODO z-index
function drawRect(color, left, top, width, height) {
  var rect = document.createElement('div');
  rect.style.backgroundColor = color;
  rect.style.position = 'absolute';
  rect.style.left = left + 'px';
  rect.style.top = top + 'px';
  rect.style.width = width + 'px';
  rect.style.height = height + 'px';

  document.body.appendChild(rect);
  return rect;
}

// Erase a Rectangle.
function eraseRect(rect) {
  document.body.removeChild(rect);
}



// === TIME ==========================================

// Unix time in milliseconds
function getTime() {
  return new Date().getTime();
}



// === APP LOGIC ======================================

// TODO state machine probably appropriate

function ensureStarted(message) {
  message = message || 'Need to start recording first';
  if (!state.recording) {
    throw message;
  }
}

function ensureStopped(message) {
  message = message || 'Need to stop recording first';
  if (state.recording) {
    throw message;
  }
}

function record() {
  ensureStopped('Already recording');

  console.log('Recording');
  state.recording = true;
  state.recordStart = getTime();
  state.notes = [];
}

function stop() {
  ensureStarted("Can't stop if not recording");

  console.log('Stopped');
  state.recording = false;
}

function play() {
  state.notes.forEach(delay => setTimeout(playNote, delay));
}

function note() {
  ensureStarted();

  var noteTime = getTime() - state.recordStart;
  state.notes.push(noteTime);
}

function tap(event) {
  var commands = {
    82: record,  // r
    83: stop,    // s
    80: play,    // p
    76: play,    // l (alias for p)
    84: note,    // t
  };

  if (event.keyCode in commands) {
    commands[event.keyCode]();
  }
}

var state = {
  recording: false,
  recordStart: null,  // in milliseconds
  notes: [],          // list of millisecond delays e.g. [1000, 2000, 3000]
                      // for three notes 1sec apart each
};

function main() {
  drawRect('red', 10, 10, 10, 10);
  console.log('hi');
}
