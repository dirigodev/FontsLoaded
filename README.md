FontsLoaded
===========

Vanilla JavaScript plugin to detect when webfonts have been loaded

## Usage

Create a new instance of the `FontsLoaded` class and give it an array of fonts to check for. Optionally there is a `complete` parameter which, when passed a function, will be executed once all fonts have loaded.

    var fontsLoaded = new FontsLoaded({
        fonts    : ['Archer SSm A', 'Gotham SSm A', 'Archer SSm SMALLCAPS A'],
        complete : function () {
            // Do some things
            console.log('Fonts are ready');
        }
    });
    
#### Events

Events are fired on the `body` as each font is loaded, and a final event is fired once all fonts have loaded. Font names are converted to camelcase, so `Helvetica Neue` becomes `helveticaNeue`, `Archer SSm A` becomes `archerSsmA`, etc.
    
    document.body.addEventListener('fonts.all', function () {
        // Do some things
        console.log('All fonts have loaded');
    });

    document.body.addEventListener('fonts.archerSsmSmallcapsA', function () {
        // Do some things
        console.log('Archer SSm SMALLCAPS A has loaded');
    });
    
If you are using jQuery, it is likely these events will fire before jQuery has loaded. In addition to listening for the events, you can add a class to the `body` to indicate that fonts have loaded.

    document.body.addEventListener('fonts.all', function () {
        document.body.className += ' fonts-loaded';
    });
