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
