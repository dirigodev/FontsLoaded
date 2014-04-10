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
    
A `fonts.all` event is triggered when all of the fonts have finished loading
    
    document.body.addEventListener('fonts.all', function () {
        // Do some things
        console.log('All fonts have loaded');
    });
