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
        
        self.loadingTimeout = window.setInterval(self.checkElementWidth, 50, self);

    });

}

FontsLoaded.prototype.createElements = function (cb){
    // Create elements which we will use
    // to detect if the fonts have loaded

    var index, elem, font;

    for (index = 0; index < this.settings.fonts.length; ++index) {
        
        font = this.settings.fonts[index];

        // Font name to camelcase
        fontId = font
            .toLowerCase()
            .replace(/\s/g, '-')
            .replace(/-(.)/g, function(match, group1) {
                return group1.toUpperCase();
            });

        elem                  = document.createElement('span');
        elem.className        = 'fonts-loaded ';
        elem.id               = fontId;
        elem.style.fontFamily = font;
        elem.innerHTML        = font + ' is loading';

        document.body.appendChild(elem);

        this.fontList.push({
            font   : fontId,
            width  : elem.offsetWidth,
            loaded : false
        });
    }

    if (typeof cb === 'function') {
        cb();
    }

}

FontsLoaded.prototype.checkElementWidth = function (self){

    var index;

    for (index = 0; index < self.fontList.length; ++index) {

        var _this = self.fontList[index],
            el    = document.getElementById(_this.font);

        _this.loaded = el.offsetWidth !== _this.width;

        self.trigger('fonts.' + _this.font, document.body);

        ++self.loadedFonts;

    }

    if (self.loadedFonts === self.fontList.length) {
        window.clearInterval(self.loadingTimeout);

        self.trigger('fonts.all', document.body);

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
