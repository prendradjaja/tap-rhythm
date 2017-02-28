// num = 1 | 2 | 3
function playNote(num) {
  var audio = new Audio('sounds/' + num + '.mp3');
  audio.play();
}
