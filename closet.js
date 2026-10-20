const toggle = document.querySelector('.browse-toggle');
const directory = document.querySelector('#shelf-list');
function openDirectory(moveFocus = false) {
  directory.hidden = false;
  toggle.setAttribute('aria-expanded', 'true');
  if (moveFocus) directory.focus();
  directory.scrollIntoView({block: 'nearest'});
}
toggle.addEventListener('click', () => {
  if (directory.hidden) openDirectory();
  else { directory.hidden = true; toggle.setAttribute('aria-expanded', 'false'); }
});
document.querySelector('.skip-link').addEventListener('click', event => {
  event.preventDefault();
  openDirectory(true);
});
if (location.hash === '#shelf-list') openDirectory();

// Briefly lift a clipped copy of the tapped piece. The approved photograph is
// never edited, and the overlay disappears completely when the wiggle ends.
const photo = document.querySelector('.closet-photo');
const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
let shopping = false;

async function wigglePiece(piece) {
  const map = piece.closest('svg');
  const { width, height } = map.viewBox.baseVal;
  const pieces = [piece];
  if (['Fawn hanging tote', 'Hanging tote straps'].includes(piece.dataset.item)) {
    pieces.splice(0, 1, ...piece.closest('a').querySelectorAll('[data-item="Fawn hanging tote"], [data-item="Hanging tote straps"]'));
  }
  const boxes = pieces.map(region => region.getBBox());
  const x = Math.max(0, Math.floor(Math.min(...boxes.map(b => b.x)) - 5));
  const y = Math.max(0, Math.floor(Math.min(...boxes.map(b => b.y)) - 5));
  const right = Math.min(width, Math.ceil(Math.max(...boxes.map(b => b.x + b.width)) + 5));
  const bottom = Math.min(height, Math.ceil(Math.max(...boxes.map(b => b.y + b.height)) + 5));
  const overlay = document.createElement('canvas');
  overlay.className = 'piece-wiggle';
  overlay.setAttribute('aria-hidden', 'true');
  overlay.width = right - x;
  overlay.height = bottom - y;
  overlay.style.cssText = `left:${x / width * 100}%;top:${y / height * 100}%;width:${overlay.width / width * 100}%;height:${overlay.height / height * 100}%;transform-origin:50% 25%`;
  const context = overlay.getContext('2d');
  context.translate(-x, -y);
  context.fillStyle = context.strokeStyle = '#fff';
  context.lineWidth = 7;
  context.lineCap = 'round';
  for (const region of pieces) {
    const path = new Path2D(region.getAttribute('d'));
    if (region.classList.contains('wire')) context.stroke(path);
    else context.fill(path);
  }
  // Draw from the already-decoded photograph, not a newly loaded SVG image.
  context.globalCompositeOperation = 'source-in';
  context.drawImage(photo, 0, 0, width, height);
  const closet = photo.closest('.closet');
  closet.append(overlay);
  closet.classList.add('is-wiggling');
  try {
    // Give the painted cutout a frame on screen before beginning the movement.
    await new Promise(resolve => requestAnimationFrame(() => requestAnimationFrame(resolve)));
    await overlay.animate([
      { transform: 'translate(0, 0) rotate(0deg) scale(1)', offset: 0 },
      { transform: 'translate(-3px, -2px) rotate(-2.5deg) scale(1.045)', offset: 0.2 },
      { transform: 'translate(3px, -2px) rotate(2.2deg) scale(1.045)', offset: 0.44 },
      { transform: 'translate(-2px, -1px) rotate(-1.3deg) scale(1.025)', offset: 0.66 },
      { transform: 'translate(1px, 0) rotate(0.6deg) scale(1.01)', offset: 0.82 },
      { transform: 'translate(0, 0) rotate(0deg) scale(1)', offset: 1 }
    ], { duration: 620, easing: 'linear' }).finished;
  } finally {
    overlay.remove();
    closet.classList.remove('is-wiggling');
  }
}

function openShelf(sourceLink) {
  // After awaiting the animation, Safari may block opening a new tab.
  // Navigate this tab instead; Back returns to the unchanged closet.
  window.location.assign(sourceLink.getAttribute('href'));
}

document.querySelectorAll('.shelf-map').forEach(map => {
  map.addEventListener('click', async event => {
    const link = event.target.closest('a');
    if (!link || event.button !== 0 || event.metaKey || event.ctrlKey || event.shiftKey || event.altKey || reducedMotion.matches) return;
    const piece = event.target.closest('path[data-item]') || link.querySelector('path[data-item]');
    if (!piece || !photo.complete || !photo.naturalWidth || !Element.prototype.animate || !window.Path2D) return;
    event.preventDefault();
    if (shopping) return;
    shopping = true;
    try {
      await wigglePiece(piece);
    } catch {
      // Shopping still works if this browser cannot animate the cutout.
    } finally {
      shopping = false;
      openShelf(link);
    }
  });
});
