'use strict';

(function (window, document, undefined) {
    // eslint-disable-line no-unused-vars, no-shadow-restricted-names
    function Vamoose(element) {
        var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

        this.element = element;
        this.options = options;

        this.init();
    }

    Vamoose.fn = Vamoose.prototype = { // eslint-disable-line no-multi-assign
        constructor: Vamoose,
        version: '0.1.0', // TODO: pull this from package.json
        init: function init() {
            var _this = this;

            var self = this;

            this.wrapper = document.createElement('div');
            this.wrapper.className = 'input-wrapper';
            this.element.parentNode.insertBefore(this.wrapper, this.element);
            this.element.parentNode.removeChild(this.element);
            this.wrapper.appendChild(this.element);

            this.renderClearCTA();

            this.element.addEventListener('focus', function () {
                _this.elementOnFocus();
            });

            this.wrapper.querySelector('.clear-input').addEventListener('focus', function () {
                _this.clearOnFocus();
            });

            this.element.addEventListener('blur', function () {
                _this.elementOnBlur();
            });

            this.wrapper.querySelector('.clear-input').addEventListener('blur', function () {
                _this.clearOnBlur();
            });

            function triggerClearInput(e) {
                if (e.which === 32 || e.which === 13 || e.which === 1) {
                    // space enter left-click
                    e.preventDefault();
                    self.clearInput.bind(this)();
                }
            }

            this.wrapper.querySelector('.clear-input').addEventListener('keydown', triggerClearInput.bind(this));
            this.wrapper.querySelector('.clear-input').addEventListener('click', triggerClearInput.bind(this));
            return this;
        },


        /**
         * Renders clear CTA
         */
        renderClearCTA: function renderClearCTA() {
            var clear = document.createElement('span');
            clear.className = 'clear-input';
            clear.setAttribute('tabindex', '0');
            clear.setAttribute('role', 'button');

            if (this.element.matches('textarea')) {
                clear.setAttribute('data-text', 'Clear');
            }

            this.wrapper.appendChild(clear);
        },


        /**
         * Handles when input is given focus
         * @returns {void}
         */
        elementOnFocus: function elementOnFocus() {
            this.wrapper.classList.add('has-focus');
            this.wrapper.querySelector('.clear-input').style.display = 'inline';
        },


        /**
         * Handles when input is blurred
         * @returns {void}
         */
        elementOnBlur: function elementOnBlur() {
            this.wrapper.classList.remove('has-focus');
        },


        /**
         * Handles when clear button is given focus
         * @returns {void}
         */
        clearOnFocus: function clearOnFocus() {
            this.wrapper.classList.add('has-focus');
        },


        /**
         * Handles when clear button is blurred
         * @returns {void}
         */
        clearOnBlur: function clearOnBlur() {
            this.wrapper.classList.remove('has-focus');
            this.wrapper.querySelector('.clear-input').style.display = 'none';
        },


        /**
         * Handles when clear button triggered
         * @returns {void}
         */
        clearInput: function clearInput() {
            this.element.value = '';
            this.element.focus();

            var eventToTrigger = 'change';
            if ('createEvent' in document) {
                var evt = document.createEvent('HTMLEvents');
                evt.initEvent('change', false, true);
                this.element.dispatchEvent(evt);
            } else {
                this.element.fireEvent('on' + eventToTrigger);
            }
        }
    };

    function forEach(array, cb, scope) {
        for (var i = 0; i < array.length; i++) {
            cb.call(scope, i, array[i]); // passes back stuff we need
        }
    }

    /**
     * Globally availalable plugin
     * @param {string} selector CSS selector
     * @param {object} options plugin options object
     */
    var vamoose = function vamoose(selector) {
        var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

        var elements = document.querySelectorAll(selector);
        forEach(elements, function (index, element) {
            new Vamoose(element, options); // eslint-disable-line no-new
            // TODO: Cache plugin $ style??
            // element.dataset.vamoose = new Vamoose(element, options);
        });
        return Array.from(elements);
    };

    Vamoose.fn.init.prototype = Vamoose.fn;
    window.vamoose = vamoose;
})(window, document);