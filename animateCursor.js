var cursorState;

function animateCursor() {
  cursorState = {
  };

  var __ = drawCursor();
  cursorState.cursor = __.cursor;
  cursorState.initialX = __.left;

  window.requestAnimationFrame(stepCursor);
}

function stepCursor(timestamp) {
  if (!cursorState.start) {
    cursorState.start = timestamp;
  }
  var zBeat = beatDiff(timestamp, cursorState.start);
  var xOffset = zBeat * BEAT_GAP;
  moveCursor(cursorState.cursor, cursorState.initialX + xOffset);

  // TODO hardcoded
  if (xOffset < 480) {
    window.requestAnimationFrame(stepCursor);
  }
}
