// Unix time in milliseconds
function getTime() {
  return new Date().getTime();
}

function toBeats(timeDiff) {
  var timeElapsedMin = timeDiff / 1000 / 60;
  return timeElapsedMin * BEATS_PER_MINUTE;
}

// Subtract two timestamps, returning number of beats in between
function beatDiff(later, earlier) {
  var timeDiff = later - earlier;
  return toBeats(timeDiff);
}
