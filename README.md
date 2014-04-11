FontsLoaded
===========

Vanilla JavaScript plugin to detect when webfonts have been loaded

## Usage

Create a new instance of the `FontsLoaded` class and give it an array of fonts to check for.

```javascript
var fontsLoaded = new FontsLoaded({
    fonts    : ['Open Sans', 'Francois One'],
    interval : 50,
    success  : function () {
        console.log('Fonts are ready!');
    }
});
```

## Options

### fonts `array`

**Default**: `[]`

Array of fonts to test

`['Open Sans', 'Francois One']`

### baseFont `string`

**Default**: `'arial'`

Base font to compare width of webfont to

### interval `integer`

**Default**: `10`

How frequently (in ms) to compare the fonts

### timeout `integer`

**Default**: `10000`

Length of time (in ms) to continue testing before giving up

### success `function`

**Default**: `null`

Function that will be executed when all fonts have successfully load

### error `function`

**Default**: `null`

Function that will be executed when the timeout expires and not all fonts have loaded

## Events

Events are fired on the `body` as each font is loaded, and a final event is fired once all fonts have loaded. Font names are converted to camelcase, so `Helvetica Neue` becomes `helveticaNeue`, `Archer SSm A` becomes `archerSsmA`, etc.

```javascript
document.body.addEventListener('fonts.all', function () {
    // Do some things
    console.log('All fonts have loaded');
});

document.body.addEventListener('fonts.archerSsmSmallcapsA', function () {
    // Do some things
    console.log('Archer SSm SMALLCAPS A has loaded');
});
```

If you are using jQuery, it is likely these events will fire before jQuery has loaded. In addition to listening for the events, you can add a class to the `body` to indicate that fonts have loaded.

```javascript
document.body.addEventListener('fonts.all', function () {
    document.body.className += ' fonts-loaded';
});
``
