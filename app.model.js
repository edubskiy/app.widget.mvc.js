/**
 * Model class for data manipulation
 *
 * @class
 * @author Evgeniy Dubskiy
 */
(function(exports, undefined) {
    var App = window.App || {};
    App.Model = exports.Class.extend({
        /**
         * @property {boolean} Model's data
         * @private
         */
        data: {},

        /**
         * @property {Boolean} Checks if data has been injected into the model
         * @private
         */
        loaded: false,

        /**
         * Gets the model data by key
         *
         * @param modelKey
         * @returns {*}
         */
        getData: function(modelKey) {
            if ( ! this.isLoaded()) {
                throw new Error("Model's data is not loaded!");
            }
            return modelKey
                ? this.data[modelKey]
                : this.data;
        },

        /**
         * Sets key / value pair or simple the overrides it with the new given object
         *
         * @param {string|object} modelKey string of key / value pair, object if case of overriding the whole object
         * @param modelValue value to override with (key must be provdied)
         */
        setData: function(modelKey, modelValue) {
            // if no value has been passed assume that modelKey is the object
            if ( ! modelValue) {
                this.data = modelKey;
                return;
            }
            this.data[modelKey] = modelValue;
            this.trigger("change", this.getData());
        },

        updateData: function(data) {
            this.data = jQuery.extend({}, this.data, data);
            this.trigger("update", this.getData());
            this.trigger("change", this.getData());
        },

        /**
         * Can be and must be extended in your model
         */
        load: function() {
            this.setData(this.data);
            this.trigger("loaded", this.getData());
        },

        /**
         * Check if data has been loaded
         * @return {Boolean}
         */
        isLoaded: function() {
            return this.loaded;
        },

        /**
         * Removed model data by key. If no key provided - removes all model data
         *
         * @param {String} modelKey
         * @return {App.Model}
         */
        removeData: function(modelKey) {
            if (this.getData(modelKey)) {
                delete this.data[modelKey];
                this.trigger('change');
                this.trigger('removed', {
                    key: modelKey
                });
            } else {
                this.data = null;
            }
            return this;
        }

    });
    
    exports.App.Event = App.Event;

})(this);
