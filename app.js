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
  state.notes.forEach(note => {
    setTimeout(() => playNote(note.num),
               note.time);
  });
}

// TODO is this currying good or bad?
function note(num) {
  return function() {
    ensureStarted();

    var noteTime = getTime() - state.recordStart;
    state.notes.push({
      time: noteTime,
      num: num
    });
  }
}

function tap(event) {
  var commands = {
    79: play,     // o
    69: record,   // e
    85: stop,     // u
    55: play,     // 7
    56: record,   // 8
    57: stop,     // 9
    72: note(1),  // h
    84: note(2),  // t
    78: note(3),  // n
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
