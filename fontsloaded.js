/*!
* FontsLoaded 1.0
*
* Copyright 2014, Dirigo Design & Development http://github.com/dirigodev
* Released under the MIT license
*
*/

var FontsLoaded = function(options){

    var self     = this,
        defaults = {
            fonts    : [],
            complete : null
        };

    this.settings    = this.extend(defaults, options);
    this.fontList    = [];
    this.loadedFonts = 0;

    this.createElements(function () {
        
        self.loadingTimeout = window.setInterval(self.checkElementWidth, 10, self);

    });

}

FontsLoaded.prototype.createElements = function (cb){

    // Create elements which we will use
    // to detect if the fonts have loaded

    var index, elem, font;

    for (index = 0; index < this.settings.fonts.length; ++index) {
        
        // Get the name of the font
        font = this.settings.fonts[index];

        // Convert font name to camelcase
        fontId = font
            .toLowerCase()
            .replace(/\s/g, '-')
            .replace(/-(.)/g, function(match, group1) {
                return group1.toUpperCase();
            });

        // Create and style element
        elem                  = document.createElement('span');
        elem.className        = 'fonts-loaded ';
        elem.id               = fontId;
        elem.style.fontFamily = font;
        elem.style.fontFamily = font;
        elem.style.position   = 'absolute';
        elem.style.left       = '-9999px';
        elem.innerHTML        = font + ' is loading';

        // Add the element to the body
        document.body.appendChild(elem);

        // Create an object in the fontList array so
        // we can keep track of fonts more easily
        this.fontList.push({
            font   : fontId,
            width  : elem.offsetWidth,
            loaded : false
        });
    }

    // Execute callback function once elements
    // have been created
    if (typeof cb === 'function') {
        cb();
    }

}

FontsLoaded.prototype.checkElementWidth = function (self){

    // Here we're going to compare the current width
    // of the elements we created to their original
    // width. If the width has changed, the font is
    // finished loading.

    var index;

    for (index = 0; index < self.fontList.length; ++index) {

        var _this = self.fontList[index],
            el    = document.getElementById(_this.font);

        if (el.offsetWidth !== _this.width) {
            // Mark font as loaded in fontList
            _this.loaded = true;

            // Trigger an event so we can do something when
            // this particular font has loaded
            self.trigger('fonts.' + _this.font, document.body);

            // Remove the original element from the DOM. We
            // don't need it anymore.
            document.body.removeChild(el);

            // Let everyone know we have loaded one more font
            ++self.loadedFonts;
        }

    }

    // If we have loaded all the fonts, do some stuff
    if (self.loadedFonts === self.fontList.length) {

        // Clear the setInterval
        window.clearInterval(self.loadingTimeout);

        // Trigger an event so we can do something when
        // ALL the fonts have loaded
        self.trigger('fonts.all', document.body);

        // Execute the complete function, if it exists
        if (typeof self.settings.complete === 'function') {
            self.settings.complete(self);
        }

    }

}

FontsLoaded.prototype.trigger = function (eventName, el) {

    var event; // The custom event that will be created

    if (document.createEvent) {
        event = document.createEvent('HTMLEvents');
        event.initEvent(eventName, true, true);
    } else {
        event = document.createEventObject();
        event.eventType = eventName;
    }

    event.eventName = eventName;

    if (document.createEvent) {
        el.dispatchEvent(event);
    } else {
        el.fireEvent("on" + event.eventType, event);
    }

}

FontsLoaded.prototype.extend = function (object1, object2) {
    
    var object3 = {};
    
    for (var key in object1) { object3[key] = object1[key]; }
    for (var key in object2) { object3[key] = object2[key]; }
    
    return object3;

}