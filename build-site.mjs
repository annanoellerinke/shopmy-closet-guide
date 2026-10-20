import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { shelves, paintOrder } from './shelves.mjs';
import { desktopShelves } from './desktop-shelves.mjs';

const root = path.dirname(fileURLToPath(import.meta.url));
const destination = 'https://anna-shopmy-closet.annanoellerinke.chatgpt.site';
const escape = s => s.replaceAll('&','&amp;').replaceAll('"','&quot;').replaceAll('<','&lt;');
const anchors = collection => paintOrder.map(id => {
  const s = collection.find(s => s.id === id);
  return `<a href="${s.url}" data-shelf="${id}" aria-label="${escape(s.name)} — shop the shelf" target="_self" rel="noopener noreferrer">
    <title>${escape(s.name)}</title>
    ${s.shapes.map(([item,d,type]) => `<path class="${type || 'piece'}" data-item="${escape(item)}" d="${d}"/>`).join('\n    ')}
    ${s.labels.map(([x,y,w,h])=>`<rect class="label" x="${x}" y="${y}" width="${w}" height="${h}" rx="8"/>`).join('\n    ')}
  </a>`;
}).join('\n');
const html = `<!doctype html>
<html lang="en">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <meta name="theme-color" content="#ffffff">
  <title>ShopMy Closet — Anna Noelle Rinke</title>
  <meta name="description" content="Shop Anna Noelle Rinke’s curated closet. Tap a piece or its handwritten label to explore her ShopMy shelves.">
  <link rel="canonical" href="${destination}/">
  <meta property="og:title" content="ShopMy Closet — Anna Noelle Rinke">
  <meta property="og:description" content="Tap a piece to shop Anna’s curated closet.">
  <meta property="og:type" content="website">
  <meta property="og:url" content="${destination}/">
  <meta property="og:image" content="${destination}/closet.png">
  <meta property="og:image:width" content="941">
  <meta property="og:image:height" content="1672">
  <meta property="og:image:alt" content="Anna’s wooden closet with clothes, shoes, accessories and handwritten shelf labels.">
  <meta name="twitter:card" content="summary_large_image">
  <link rel="icon" href="favicon.svg" type="image/svg+xml">
  <link rel="stylesheet" href="styles.css?v=native-taps-5">
  <script src="closet.js?v=native-taps-5" defer></script>
</head>
<body>
  <a class="skip-link" href="#shelf-list">Browse shelves as a list</a>
  <main>
    <h1 class="sr-only">ShopMy — Anna Noelle Rinke</h1>
    <p class="sr-only" id="instructions">Tap a piece or its handwritten label to shop that shelf. Follow the link to shop on ShopMy. Browse all shelves opens a list of larger links.</p>
    <div class="closet" aria-describedby="instructions">
      <picture>
        <source media="(min-width: 900px)" srcset="closet-desktop.png" width="1122" height="1402">
        <img class="closet-photo" src="closet.png" width="941" height="1672" alt="" fetchpriority="high" draggable="false">
      </picture>
      <!-- Both approved images are unchanged. Each has its own transparent link map. -->
      <svg class="shelf-map map-mobile" viewBox="0 0 941 1672" xmlns="http://www.w3.org/2000/svg" aria-label="Shop the pieces in Anna’s closet" role="group">
        ${anchors(shelves)}
      </svg>
      <svg class="shelf-map map-desktop" viewBox="0 0 1122 1402" xmlns="http://www.w3.org/2000/svg" aria-label="Shop the pieces in Anna’s built-in closet" role="group">
        ${anchors(desktopShelves)}
      </svg>
      <button class="browse-toggle" type="button" aria-label="Browse all shelves" aria-controls="shelf-list" aria-expanded="false"><span class="sr-only">Browse all shelves</span></button>
    </div>
    <section class="shelf-directory" id="shelf-list" hidden aria-labelledby="directory-title" tabindex="-1">
      <h2 class="sr-only" id="directory-title">All ShopMy shelves</h2>
      <nav aria-label="All ShopMy shelves">
        ${shelves.map(s=>`<a href="${s.url}" target="_self" rel="noopener noreferrer">${escape(s.name)} <span aria-hidden="true">↗</span></a>`).join('\n        ')}
      </nav>
    </section>
    <noscript><p class="no-script"><a href="https://shopmy.us/annanoellerinke/shelves" target="_self" rel="noopener noreferrer">Browse all shelves on ShopMy ↗</a></p></noscript>
  </main>
</body>
</html>
`;
fs.writeFileSync(path.join(root,'index.html'),html);
console.log(JSON.stringify({shelves:shelves.length,mobileItems:shelves.reduce((n,s)=>n+s.shapes.length,0),desktopItems:desktopShelves.reduce((n,s)=>n+s.shapes.length,0)}));
