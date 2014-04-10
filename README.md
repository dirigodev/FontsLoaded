FontsLoaded
===========

Vanilla JavaScript plugin to detect when webfonts have been loaded

## Usage

    var fontsLoaded = new FontsLoaded({
        fonts    : ['Archer SSm A', 'Gotham SSm A', 'Archer SSm SMALLCAPS A'],
        complete : function () {
            // Do some things
            console.log('Fonts are ready');
        }
    });
    
    // 'fonts.all' event is triggered when all of the fonts
    // have finished loading
    
    document.body.addEventListener('fonts.all', function () {
        // Do some things
        console.log('All fonts have loaded');
    });
