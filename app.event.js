/**
 * Simple Event object to use as mixin for any object or as global event object
 *
 * @author Evgeniy Dubskiy
 */
(function(exports, undefined) {
    var App = window.App || {};
    App.Event = exports.Class.extend({
        events: {},
    
        on: function (event, callback) {
            if (!this.events[event]) {
                this.events[event] = [];
            }
            this.events[event].push(callback);
        },
    
        off: function(event) {
            if (this.events[event]) {
                delete this.events[event];
            }
        },
    
        trigger: function(event) {
            if (this.events[event]) {
                var i,
                    eventCount = this.events[event].length;
                for (i = 0; i < eventCount; i++) {
                    if (typeof this.events[event][i] === 'function') {
                        this.events[event][i].apply(this, [event]);
                    }
                }
            }
            return this;
        }
    });
    
    exports.App.Event = App.Event;
    
})(this);
