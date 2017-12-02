# hocrjs

Working with [hOCR](https://kba.github.io/hocr-spec/1.2/) in Javascript

## hocr-viewer

[Online Demo](https://kba.github.io/hocrjs/example/426117689_0459.html)

### Using with local hocr files

You can view your own hocr-files with this library by following these steps:
1. Download [hocr-fullscreen.webpack.js](https://raw.githubusercontent.com/kba/hocrjs/master/dist/hocr-fullscreen.webpack.js)
2. Add this line to your hocr-files:
```html
<script src="hocr-fullscreen.webpack.js"></script>
```
3. Download [hocr-viewer.css](https://raw.githubusercontent.com/kba/hocrjs/master/dist/hocr-viewer.css)
4. Add this line to your hocr-files:
```html
<link rel='stylesheet' href="hocr-viewer.css"/>
```
5. View the adapted hocr file in your browser.

### User script

To inject these lines into online hocr files there is a user script:
1. Install [Tampermonkey](https://tampermonkey.net/) in your browser or similar addon
2. Install the [user script](https://kba.github.io/hocrjs/dist/hocr-viewer.user.js)
3. Test it on [Demo for UserJS](https://kba.github.io/hocrjs/example/426117689_0459_noscript.html)

