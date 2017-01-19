# Lightbox-anything
Lightbox anything does what it says; Select element(s) you wish to show in a lightbox and this code does the rest.

## Installation
 - Download or clone files to your project
 - Make sure you have jQuery included in your project
 - Include lightboxAnything.js -file to your project
 - You don't necessarily need npm or gulp for this plugin, but if you wish to modify it, then I suggest you to use them. 

## Usage
 - Select elements you wish to show in a lightbox by adding some kind of selector to the array called 'objectsToLightbox'. You can do it with vanilla JS or with jQuery like I did.
 - Select elements that trigger some other element to show up in a lightbox (note: triggers has to have `data-target`-attribute to work properly.
 - If you wish to add elements to add elements to lightbox from html, use `addStuffToLightbox()`-function. Function takes 2 arguments: type ('object' or 'trigger') and selector of element object or array of element objects.
 - Refresh the page and try it.
 - If it is not working, there's either problems with your jQuery or browser.

## Modification
 - Edit lightboxAnything.js-file with your preferred editor
 - Lightboxes styles are set from the lightBoxAnything.js-file. Replace or modify them the way you feel.

## Demo
 - You can see the demo from your-project-folder/Lightbox-anything/demo

### Notes
 - This plugin uses `let` and `const` -variable types.
 - If you are using browser that has no support for let- or const variable type, use the `legacy/lightboxAnything.legacy.js` -file.
 - Trigger-elements does not have the multiselect option