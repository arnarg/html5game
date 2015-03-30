
window.Controls = (function() {
    'use strict';

    /**
     * Key codes we're interested in.
     */
    var KEYS = {
        32: 'space',
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down',
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

    /**
     * Only answers true once until a key is pressed again.
     */
    Controls.prototype.didJump = function() {
        var answer = this._didJump;
        this._didJump = false;
        return answer;
    };
    
    // Export singleton.
    return new Controls();
})();
