
window.Controls = (function() {
    'use strict';

    /**
     * Key codes we're interested in.
     */
    var KEYS = {
        32: 'space',
        41: 'mouse'
    };

    /**
     * A singleton class which abstracts all player input,
     * should hide complexity of dealing with keyboard, mouse
     * and touch devices.
     * @constructor
     */
    var Controls = function() {
        this._didJump = false;
        this.keys = {};
        $(window)
            .on('keydown', this._onKeyDown.bind(this))
            .on('mousedown', this._onMouseDown.bind(this));
    };

    Controls.prototype._onMouseDown = function(){
        var keyName = 'mouse';
        this.keys[keyName] = true;
        return false;
    };

    Controls.prototype._onKeyDown = function(e) {
        if (e.keyCode === 32) {
            var keyName = 'mouse';
            this.keys[keyName] = true;
        }

        return false;
    };
    
    // Export singleton.
    return new Controls();
})();
