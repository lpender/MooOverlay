/*
 MooTools Plugin by Lee Pender

 Creates Overlay of a thumnail on roll over

 Dependencies:
 MooTools

usage

$$('.moooverlay').each(function(el) {
    new MooOverlay(el)
});

It will use the title attribute as the overlay text, unless you specify otherwise

 */

MooOverlay = new Class({

    Implements: [Events, Options],

    options: {
        html : '',
        testMode : false,
        onMouseEnter: null,
        onMouseLeave: null
    },

    containerEl : null,
    overlayEl : null,
    textEl : null,
    href : null,
    enabled: true,
    EVENT_COMPLETE : 'complete',
    EVENT_MOUSEENTER : 'mouseenter',
    EVENT_MOUSELEAVE : 'mouseleave',

    initialize: function(element, options) {
        var instance = this;
        instance.setOptions(options);
        instance.trace('Initalizing MooOverlay');
        // If selector is an array, take the first in the array.
        if(element.length > 1) {
            instance.containerEl = element[0];
        } else {
            instance.containerEl = element;
        }
        if (instance.containerEl.get('tag') == 'img') {
            var tempHolder = new Element('div', {
               styles : {
                   position: instance.containerEl.getStyle('position'),
                   width: instance.containerEl.getStyle('width'),
                   height: instance.containerEl.getStyle('height'),
                   display: 'inline-block'
               }
            });
            tempHolder.setAttribute('title', instance.containerEl.get('title'));
            instance.containerEl.grab(tempHolder, 'before');
            tempHolder.grab(instance.containerEl);
            instance.containerEl = tempHolder;
        }
        instance.createOverlay();
        instance.initOverlay();
    },

    createOverlay: function() {
        var instance = this;
        instance.overlayEl = new Element('div', {
            'class':'MooOverlay'
        });

        instance.textEl = new Element('div', {
            'class' : 'MooOverlayText',
            html : instance.options.html || instance.containerEl.get('title')
        });
        instance.textHolderEl = new Element('div', {
            'class' : 'MooOverlayTextHolder'
        });
        instance.overlayEl.grab(instance.textHolderEl);
        instance.textHolderEl.grab(instance.textEl);
        if(instance.containerEl.getStyle('position') != 'absolute') {
            instance.containerEl.setStyle('position', 'relative');
        }
        instance.containerEl.grab(instance.overlayEl);
        return;
    },

    initOverlay: function() {
        var instance = this;
        instance.containerEl.addEvent('mouseenter', function (event) {
            if(instance.enabled) {
                instance.overlayEl.tween('opacity', 1);
            }
        });
        instance.containerEl.addEvent('mouseleave', function ( event) {
            instance.overlayEl.tween('opacity', 0);
        });
        if(instance.containerEl.get('tag') == 'a') {

        }
    },

    enable: function() {
        this.enabled = true;
    },

    disable: function () {
        this.enabled = false;
    },

    kill: function () {
        this.overlayEl.setStyle('opacity', 0);
    },

    trace: function(s) {
        var instance = this;
        if (instance.options.testMode) {
            if(console.log)
                console.log(s);
        }
    },

    complete : function () {
        this.fireEvent('complete');
    }
});
