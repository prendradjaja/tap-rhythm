// TODO this stuff might just belong in the Staff class

var cursorState;

function animateCursor(staff) {
  cursorState = {
  };

  var __ = staff.drawCursor();
  cursorState.cursor = __.cursor;
  cursorState.initialX = __.left;

  window.requestAnimationFrame(stepCursor(staff));
}

function stepCursor(staff) {
  var step = function step(timestamp) {
    if (!cursorState.start) {
      cursorState.start = timestamp;
    }
    var zBeat = beatDiff(timestamp, cursorState.start);
    var xOffset = zBeat * BEAT_GAP;
    console.debug(xOffset);
    staff.moveCursor(cursorState.cursor, cursorState.initialX + xOffset);

    // TODO hardcoded
    if (xOffset < 480) {
      window.requestAnimationFrame(step);
    }
  };
  return step;
}
