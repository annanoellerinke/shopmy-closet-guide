# Build a personal, interactive ShopMy closet

This is a brief for Codex, Claude Code, or another coding agent. Help the person create a website where objects and labels in a closet scene open their chosen ShopMy shelves. Explain decisions in ordinary language and handle the code and files for them.

**Working example:** https://anna-shopmy-closet.annanoellerinke.chatgpt.site/

**Example source and worksheet:** https://github.com/annanoellerinke/shopmy-closet-guide

Anna's version has a wooden wardrobe, handwritten labels, twelve shelf destinations, and different approved images for desktop and phones. The desktop image includes narrow cabinet panels on both sides. Treat it as an example; don't assume the person wants Anna's identity, products, shelf count, or destinations.

## 1. Establish the brief before building

Ask a few related questions at a time:

- What name, shop title, and short shopping instruction should appear? Get the exact spelling and desired size hierarchy.
- Which ShopMy shelves should be included? Get each exact URL or inspect the person's public profile and confirm the map. Never invent collection IDs or replace a missing link with a platform homepage.
- Ask for inspiration photos and what they like about them: wood, light, fabric texture, composition, handwriting, or a particular item.
- Which pieces should represent each shelf? More than one piece may share a destination.
- Do they want their own photograph, product-photo cutouts, a generated scene, or illustration? Explain the available image tools and any limitations.
- Should both objects and labels be clickable? Should links open in a new tab?
- How should the scene look on desktop and phones? Ask to see both, rather than deciding from the portrait mockup alone.

Use [PERSONALIZE.md](PERSONALIZE.md) to help them choose. Reuse decisions already made in the conversation; don't ask for approvals they have already given.

## 2. Separate product references from click destinations

Create a shelf map with the label, exact destination, representative objects, visual references, and placement.

| Shelf label | Exact destination | Objects | Visual reference | Placement |
| --- | --- | --- | --- | --- |
| User's label | Confirmed ShopMy URL | Chosen pieces | Photo or retailer page | Agreed location |

Retailer URLs usually identify the pictured product. They should not replace ShopMy shelf URLs unless the person explicitly requests product-level links. Preserve relevant tracking parameters on approved destinations.

Inspect references before claiming an exact product or color match. A generated image can change construction, logos, or proportions; real product photos are the better route when exact appearance matters. Keep private source material out of the public repository.

## 3. Approve the images and both screen layouts

Show a plan and visual mockup before the full build. For photographic scenes, use the person's references for believable material detail, irregular reflections, overlapping garments, and uneven natural light. Adding grain cannot repair incorrect shapes or uniformly synthetic textures.

A portrait image needs a deliberate desktop treatment. Offer a centered photo with a chosen backdrop, a wider desktop composition, or a full-width portrait with more scrolling. Don't automatically add white margins, crop the image, stretch it, or invent extra cabinetry. Show what the chosen treatment actually looks like in a desktop browser.

If the person approves a wider desktop image, save it separately from the phone image. Each approved composition needs its own link map. Anna's example switches at 900px, but that breakpoint is a design choice rather than a requirement.

**Keep approved images intact.** Do not regenerate the whole scene to add links or make small text changes. Where practical, keep typography on separate HTML/CSS or transparent artwork layers. Repeated image edits can soften clothing and wood detail. If lettering is already approved inside the image, preserve it and add only the interaction layer.

Use fonts and images the person has permission to publish. No font files are distributed in this example; Anna's commercial font license does not license a new creator's font use.

## 4. Build the responsive page

Prefer a simple implementation. This starter is static HTML/CSS with SVG links and a small script for the shelf directory. It needs no application server, database, external fonts, or runtime packages.

### Keep the image and link map aligned

- Save the exact approved image files, preserving their crop and aspect ratio.
- Use a responsive SVG overlay whose `viewBox` matches the image's native dimensions. All item paths and label targets use those coordinates.
- With different desktop and mobile compositions, use a `<picture>` source and a matching SVG for each. Switch both at the same breakpoint. Hide the inactive map with `display: none` so it adds no invisible keyboard targets.
- Draw around visible objects. Foreground objects should win where pieces overlap; a broad rectangle must not steal clicks from a smaller item in front.
- Make both the object and its handwritten name clickable if requested. Thin straps and cables may need wider stroke targets without filling the empty space inside them.
- Keep small targets as generous as the composition allows and include larger text links in a shelf list. Aim for 44 CSS pixels where practical without covering unrelated pieces.
- Preserve the approved visual; invisible link regions should not become persistent outlines or new labels.

### Make the interactions accessible

Use ordinary anchors with clear accessible names, visible keyboard focus, and appropriate `rel` attributes for new-tab links. Tell screen-reader users that shelves open in a new tab. Provide a page heading, short instruction, a skip link, and a readable directory.

In this example, the handwritten “Browse all shelves” has an overlaid button with `aria-expanded` and `aria-controls`. It opens the list below the image. The item links work without JavaScript; a `<noscript>` link also opens the user's ShopMy shelves. Update that fallback for the new creator.

The example gives the tapped piece a gentle 340ms wiggle before opening its shelf. It uses a temporary, masked copy of the same image, then removes that overlay completely. The image itself is unchanged. Labels animate a representative piece; the hanging tote and straps move together. Reduced-motion preferences, modified clicks, and the text directory keep normal link behavior. If a browser blocks the delayed new tab, the shelf opens in the current tab. Keep motion optional and subtle.

Do not add unrequested analytics or integrations. If adding motion, respect reduced-motion settings.

### Personalize the files

| File | What to change |
| --- | --- |
| `shelves.mjs` | Shelf names, URLs, mobile object paths, labels, check points, and drawing order. |
| `desktop-shelves.mjs` | Desktop object paths, labels, and check points; shelf identity and URLs are shared. |
| `build-site.mjs` | Name, page copy, public URL, image files and dimensions, breakpoint, metadata, and fallback link. |
| `styles.css` | Responsive layout, map switching, focus/hover feedback, and directory placement. |
| `closet.js` | Directory interaction, if the design requires changes. |
| `closet.png`, `closet-desktop.png`, `favicon.svg` | The new creator's approved artwork and icon. |

Run `node build-site.mjs` after changes to the generator or maps. It writes `index.html`; editing only the generated page will be overwritten on the next build.

The example mobile canvas is **941 × 1672**; desktop is **1122 × 1402**. Both currently have twelve shelves and twenty-five object regions. These outlines only fit these exact images. Changing the picture, crop, or proportions requires new coordinates and checks. Adding a shelf also requires updating both maps and the drawing order.

## 5. Verify the actual website

Show desktop and phone previews. Check:

- Every object and label opens its intended destination, including foreground overlaps, thin straps, and items sharing a shelf.
- The shelf directory and no-JavaScript fallback point to the new creator, not Anna.
- Desktop selects the desktop image and map; mobile selects the mobile pair. Check just above and below the breakpoint as well as common phone and desktop widths.
- There is no sideways scrolling, stretched imagery, clipped lettering, or invisible duplicate keyboard navigation.
- The directory opens and closes, keyboard focus is visible, and touch use does not depend on hover.
- The image files match the approved artwork. Compress only when visual quality remains approved; don't silently replace the design.
- All page titles, descriptions, canonical URLs, icons, and social-sharing metadata use the correct identity and production URL.

Report any destination or interaction you couldn't verify. Don't claim automatic ShopMy syncing; this site opens existing shelves.

## 6. Publish the person's own version

Prepare and check the site first. Publish when the person requests it, using the hosting method available in their environment. A direct instruction to publish is authorization; don't add another confirmation step. Create a separate project and repository for a new creator rather than deploying over Anna's example.

This repository includes an optional `vercel.json` for static hosting from the repository root. No build command is required because generated `index.html` is included. If the generator changes, run it before publishing. Keep the root limited to intended public content and store credentials in private provider settings.

For ChatGPT Sites, register the creator's own Site and configure the intended static output through the supported Sites workflow. This example deliberately includes no Sites identity or deployment credentials. Anna's live demo uses Sites; the repository can also be deployed to another static host.

Walk the person through sign-in if necessary. Don't require manual folder creation or file uploads when you can do that work for them. If they request GitHub publication, upload only the sanitized guide and intended source. Don't invent an open-source license or transfer rights to third-party assets.

Confirm deployment success, open the final public URL without authentication, and verify that it serves the correct images and shelf destinations. Give the person the link. Explain that future image or destination changes require an update and redeployment.
