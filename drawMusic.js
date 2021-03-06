var BEATS_PER_MEASURE = 4;
var NUM_MEASURES = 4;

var BEAT_GAP = 60;
var STAFF_GAP = 20;

var LEFT_MARGIN = 20;
var TOP_MARGIN = 20;
var STAFF_HEIGHT = 80;
var BEAT_WIDTH = 1;  // stuff is hard-coded to this value, can't really change it

var BEAT_COLOR = '#ddd';
var MEASURE_COLOR = '#666';

var NOTE_WIDTH = 9;  // because BEAT_WIDTH is 1 (odd), this should be an odd number for symmetry
var NOTE_HEIGHT = NOTE_WIDTH;

// how many different pitches can be played
var PITCH_RANGE = 3;

////////////////////////////////// not configurable

var PITCH_GAP = STAFF_HEIGHT / (PITCH_RANGE + 1);

class Staff {
  constructor(x, y) {
    this.x = x;
    this.y = y;

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
                 this.x + left,
                 this.y,
                 BEAT_WIDTH,
                 STAFF_HEIGHT);
        left += BEAT_GAP;
      }
    }
    drawRect(MEASURE_COLOR, this.x + left, this.y, BEAT_WIDTH, STAFF_HEIGHT);
  }

  drawCursor() {
    var left = this.x;
    return {
      cursor: drawRect('blue', left, this.y, BEAT_WIDTH, STAFF_HEIGHT),
      left: left
    };
  }

  moveCursor(cursor, left) {
    cursor.style.left = left;
  }

  // measure and beat are both 1-indexed
  // pitch = 1 | 2 | 3
  drawNote(measure, beat, pitch, color) {
    color = color || 'green';

    // an zBeat is a "zero-indexed beat", which is (duh) 0-indexed but also
    // analogous to an improper fraction. e.g. in 4/4 time:
    // - the first beat  of the second measure is 4
    // - the second beat of the second measure is 5
    var zBeat = (measure - 1) * BEATS_PER_MEASURE + beat - 1;

    var xOffset = (NOTE_WIDTH - 1) / 2;
    var yOffset = (NOTE_HEIGHT - 1) / 2;

    drawRect(color,
             this.x + BEAT_GAP * zBeat - xOffset,
             this.y + STAFF_HEIGHT - pitch * PITCH_GAP - yOffset,
             NOTE_WIDTH,
             NOTE_HEIGHT);
  }

  drawZNote(zBeat, pitch, color) {
    this.drawNote(1, zBeat + 1, pitch, color);
  }
}
