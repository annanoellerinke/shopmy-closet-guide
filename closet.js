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
