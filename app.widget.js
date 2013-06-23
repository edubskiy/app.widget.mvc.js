/**
 * Inheritable widget system. So you can create reusable widgets
 * injecting your own models and separating data from the controller
 *
 * @author Evgeniy Dubskiy
 */
(function(exports, undefined) {
    var App = window.App || {};
    App.Widget = App.Event.extend({
        /**
         * Model for data manipulation
         */
        model: {},

        /**
         * Template rendering system
         * @param name template name
         * @param toHtml function to compile template to html
         */
        template: {
            name: '',
            toHtml: ''
        },

        /**
         * jQuery object
         */
        el: {},

        /**
         * Tag is created when no element is passed
         */
        tag: {
            "type": "div",
            "className": ""
        },

        /**
         * Cached UI Elements to increase performance
         */
        cachedElements: {},

        /**
         * Initial Widget Constructor
         *
         * @param {object} options
         * @constructor
         */
        init: function(options) {
            var t = this;

            // @todo data configuration with options

            t._super(options);
            t.run(options);
        },

        /**
         * Abstract method should be overriden with extendable class logic
         */
        run: function(options) {
            // override this
        },

        /**
         * Render widget using model data (if provided)
         *
         * @return {App.Widget}
         */
        render: function() {
            var t = this;
            if (this.model) {
                if (this.model.isLoaded()) {
                    this.renderTemplate(this.model.data());
                } else {
                    this.model.load();
                }
            } else {
                this.renderTemplate();
            }
            return t;
        },

        /**
         * Render template
         *
         * @private
         * @param data
         * @return {Deferred}
         */
        renderTemplate: function(data) {
            var t = this;
            return t.buildTemplate(t.template.name, data)
                    .addCallback(function(html){
                        // Updating jQuery element
                        t.el.html(html);
                        // Broadcasting trigger event
                        t.trigger("render");
                    });
        },

        /**
         * Build html from given template system
         *
         * @param {String} tplName template name
         * @param {Object} data data to render template
         */
        buildTemplate: function (tplName, data) {
            var def = new Deferred(),
                t = this;
            def.callback(t.template.toHtml(tplName, data));
            return def;
        },

        /**
         * Get jquery element and cache it for future use
         * If no map found, cache element using real selector as key
         * otherwise modify string selector path to the actual jQuery object
         * and cache by selector path key
         *
         * @param {string} pathSelector
         * @returns {jQuery}
         */
        getElement: function(pathSelector) {
            var t = this;
            if (!t.cachedElements[pathSelector]) {
                t.cachedElements[pathSelector] = t.el.find(pathSelector);
            } else if (t.cachedElements[pathSelector].constructor === String) {
                t.cachedElements[pathSelector] = t.el.find(t.cachedElements[pathSelector]);
            }
            return t.cachedElements[pathSelector];
        }
    });

    exports.App.Widget = App.Widget;

}(this));
