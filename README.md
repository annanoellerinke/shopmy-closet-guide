# Make your own interactive ShopMy closet

Your ShopMy can look like a closet full of your favorite things. People tap a piece or its handwritten label and land on the shelf you chose.

I made mine into a wooden wardrobe, with a built-in version for desktop and a closer view on phones. **[See my website here](https://anna-shopmy-closet.annanoellerinke.chatgpt.site/).** This repo includes the working example and a guide to help you make your own.

You don't need to know how to code!!!

## 1. Open Codex or Claude Code and start a new task

This is where you'll ask it to build your website. You can give it this guide without downloading or editing the code yourself.

## 2. Give it the guide and copy this prompt

**[The build guide is here](https://github.com/annanoellerinke/shopmy-closet-guide/blob/main/BUILD_GUIDE.md).**

> Help me build my own interactive ShopMy closet using this guide: https://github.com/annanoellerinke/shopmy-closet-guide/blob/main/BUILD_GUIDE.md. Ask me for my name, exact ShopMy shelf links, inspiration photos, and design preferences before building. Let me choose the pieces, labels, and where each click goes. Show me a plan and image mockup first, including how it will look on desktop and my phone. Once I approve the design, use that exact image and add the shopping links without changing it.

## 3. Answer its questions and make it yours!

Send your shelf links and inspo pics. Tell it what you like: warm wood, a particular bag, overlapping clothes, natural light, handwriting, or a completely different closet style.

You can use your own photograph, a collage of product photos, or a generated scene. If you care about the exact shape or color of a product, provide photos and check the result carefully.

Choose what each piece opens. A bag could open Accessories; a sweater could open Tops & Sweaters. **Retailer links help identify the pictured item. The click should go to your ShopMy shelf unless you ask for something else.**

Ask to see both screen sizes. Mine has narrow wooden side panels on desktop and the original closer crop on mobile. Yours can use one image everywhere or a different desktop treatment. You don't have to use my layout or twelve shelves.

Give feedback in plain language: “make the side panels narrower,” “keep this exact image,” or “make the labels easier to read on my phone.” **[More ideas and a simple worksheet](PERSONALIZE.md).**

## 4. Ask to put it online!

Copy and paste:

> Publish my finished website at a new public link. Use Vercel, or the hosting available in this app, and walk me through any sign-in steps. Check every item and label on desktop and mobile, including the shelf list. Give me the public link when it's live. If you publish the source to my GitHub, create a separate repository for my version.

Then put that link in your bio.

---

## What's in this repo?

| File | What it's for |
| --- | --- |
| [BUILD_GUIDE.md](BUILD_GUIDE.md) | The full brief to give your coding agent. |
| [PERSONALIZE.md](PERSONALIZE.md) | Inspiration prompts, screen-layout choices, and a shelf worksheet. |
| [index.html](index.html), [styles.css](styles.css), [closet.js](closet.js) | The working website example and shelf-list interaction. |
| [closet.png](closet.png), [closet-desktop.png](closet-desktop.png) | The approved phone and desktop images. |
| [shelves.mjs](shelves.mjs) | Example shelf URLs, mobile item outlines, and label targets. |
| [desktop-shelves.mjs](desktop-shelves.mjs) | Separate desktop outlines using the same destinations. |
| [build-site.mjs](build-site.mjs) | Generates the page from both shelf maps. |
| [favicon.svg](favicon.svg), [vercel.json](vercel.json) | The icon and optional Vercel hosting configuration. |

**This example contains my name, images, and links.** Ask your agent to replace them with yours, including the title and sharing preview. The clickable outlines fit these exact images; a new composition needs a new map. No font files are included; use fonts and images you have permission to publish.

For someone working with the code: run `node build-site.mjs` after editing the maps or generator. The checked-in `index.html` can also be served directly. Desktop switches at **900px**. The two maps are independent; the hidden one is excluded from keyboard navigation. `closet.js` opens the shelf list and gives a tapped piece a gentle 620ms wiggle before opening its shelf in the same tab. Use Back to return to the closet. Reduced-motion preferences skip the animation. Modified clicks and the text directory keep normal link behavior, and the shopping links still work without JavaScript.

The Vercel output directory is this repository's root, so keep it limited to intended public files. Keep credentials, hosting account IDs, and private references elsewhere. Anna's live example is hosted on ChatGPT Sites; copying this repository does not connect to or deploy over it.

Prefer the suitcase? **[That guide is here](https://github.com/annanoellerinke/shopmy-website-guide).**

This is an independent creator project, not an official ShopMy tool. It opens existing shelves and does not automatically synchronize changes from ShopMy.
