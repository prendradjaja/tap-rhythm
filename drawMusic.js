var BEATS_PER_MEASURE = 4;
var NUM_MEASURES = 2;

var BEAT_GAP = 60;

var LEFT_MARGIN = 20;
var TOP_MARGIN = 20;
var SCORE_HEIGHT = 80;
var BEAT_WIDTH = 1;  // stuff is hard-coded to this value, can't really change it

var BEAT_COLOR = '#ddd';
var MEASURE_COLOR = '#666';

var NOTE_WIDTH = 9;  // because BEAT_WIDTH is 1 (odd), this should be an odd number for symmetry
var NOTE_HEIGHT = NOTE_WIDTH;

// how many different pitches can be played
var PITCH_RANGE = 3;

////////////////////////////////// not configurable

var PITCH_GAP = SCORE_HEIGHT / (PITCH_RANGE + 1);

function drawCursor() {
  var left = LEFT_MARGIN;
  return {
    cursor: drawRect('blue', left, TOP_MARGIN, BEAT_WIDTH, SCORE_HEIGHT),
    left: left
  };
}

function moveCursor(cursor, left) {
  cursor.style.left = left;
}

function drawScore() {
  var color;
  var left = 0;
  for (var m = 0; m < NUM_MEASURES; m++) {
    for (var b = 0; b < BEATS_PER_MEASURE; b++) {
      if (b === 0) {
        color = MEASURE_COLOR;
      } else {
        color = BEAT_COLOR;
      }
      drawRect(color,
               LEFT_MARGIN + left,
               TOP_MARGIN,
               BEAT_WIDTH,
               SCORE_HEIGHT);
      left += BEAT_GAP;
    }
  }
  drawRect(MEASURE_COLOR, LEFT_MARGIN + left, TOP_MARGIN, BEAT_WIDTH, SCORE_HEIGHT);
}

// measure and beat are both 1-indexed
// pitch = 1 | 2 | 3
function drawNote(measure, beat, pitch, color) {
  color = color || 'green';

  // an zBeat is a "zero-indexed beat", which is (duh) 0-indexed but also
  // analogous to an improper fraction. e.g. in 4/4 time:
  // - the first beat  of the second measure is 4
  // - the second beat of the second measure is 5
  var zBeat = (measure - 1) * BEATS_PER_MEASURE + beat - 1;

  var xOffset = (NOTE_WIDTH - 1) / 2;
  var yOffset = (NOTE_HEIGHT - 1) / 2;

  drawRect(color,
           LEFT_MARGIN + BEAT_GAP * zBeat - xOffset,
           TOP_MARGIN + SCORE_HEIGHT - pitch * PITCH_GAP - yOffset,
           NOTE_WIDTH,
           NOTE_HEIGHT);
}

function drawZNote(zBeat, pitch, color) {
  drawNote(1, zBeat + 1, pitch, color);
}
