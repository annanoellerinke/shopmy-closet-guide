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
const svgNamespace = 'http://www.w3.org/2000/svg';
let shopping = false;

function svgElement(name, attributes = {}) {
  const element = document.createElementNS(svgNamespace, name);
  for (const [key, value] of Object.entries(attributes)) element.setAttribute(key, value);
  return element;
}

async function wigglePiece(piece, map) {
  const overlay = svgElement('svg', {
    class: 'piece-wiggle', viewBox: map.getAttribute('viewBox'),
    'aria-hidden': 'true', focusable: 'false'
  });
  const { width, height } = map.viewBox.baseVal;
  const mask = svgElement('mask', {
    id: 'tapped-piece-mask', maskUnits: 'userSpaceOnUse', x: 0, y: 0, width, height
  });
  const pieces = [piece];
  const item = piece.dataset.item;
  if (item === 'Fawn hanging tote' || item === 'Hanging tote straps') {
    pieces.splice(0, 1, ...piece.closest('a').querySelectorAll('[data-item="Fawn hanging tote"], [data-item="Hanging tote straps"]'));
  }
  for (const region of pieces) {
    const wire = region.classList.contains('wire');
    mask.append(svgElement('path', {
      d: region.getAttribute('d'), fill: wire ? 'none' : 'white',
      stroke: wire ? 'white' : 'none', 'stroke-width': 7, 'stroke-linecap': 'round'
    }));
  }
  const definitions = svgElement('defs');
  definitions.append(mask);
  const moving = svgElement('g');
  const cutout = svgElement('g', { mask: 'url(#tapped-piece-mask)' });
  cutout.append(svgElement('image', { href: photo.currentSrc, width, height }));
  moving.append(cutout);
  overlay.append(definitions, moving);
  photo.closest('.closet').append(overlay);
  const box = piece.getBBox();
  moving.style.transformOrigin = `${box.x + box.width / 2}px ${box.y + box.height * 0.25}px`;
  document.querySelector('.closet').classList.add('is-wiggling');
  try {
    await moving.animate([
      { transform: 'rotate(0deg) scale(1)' },
      { transform: 'rotate(-0.8deg) scale(1.012)', offset: 0.22 },
      { transform: 'rotate(0.7deg) scale(1.012)', offset: 0.47 },
      { transform: 'rotate(-0.35deg) scale(1.006)', offset: 0.72 },
      { transform: 'rotate(0deg) scale(1)' }
    ], { duration: 340, easing: 'ease-in-out' }).finished;
  } finally {
    overlay.remove();
    document.querySelector('.closet').classList.remove('is-wiggling');
  }
}

function openShelf(url) {
  // Open only after the motion, so visitors see the wiggle before leaving.
  // A same-tab fallback still reaches the shelf if a browser blocks the popup.
  const destination = window.open('about:blank', '_blank');
  if (destination) {
    destination.opener = null;
    const policy = destination.document.createElement('meta');
    policy.name = 'referrer';
    policy.content = 'no-referrer';
    destination.document.head.append(policy);
    destination.location.replace(url);
  } else {
    window.location.assign(url);
  }
}

document.querySelectorAll('.shelf-map').forEach(map => {
  map.addEventListener('click', async event => {
    const link = event.target.closest('a');
    if (!link || event.button !== 0 || event.metaKey || event.ctrlKey || event.shiftKey || event.altKey || reducedMotion.matches) return;
    const piece = event.target.closest('path[data-item]') || link.querySelector('path[data-item]');
    if (!piece || !photo.complete || !photo.naturalWidth || !Element.prototype.animate) return;
    event.preventDefault();
    if (shopping) return;
    shopping = true;
    try {
      await wigglePiece(piece, map);
    } catch {
      // Shopping still works if this browser cannot animate the SVG overlay.
    } finally {
      shopping = false;
      openShelf(link.getAttribute('href'));
    }
  });
});
