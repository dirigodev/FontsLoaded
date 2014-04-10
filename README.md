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
    
    document.body.addEventListener('fonts.all', function () {
        // Do some things
        console.log('All fonts have loaded');
    });
