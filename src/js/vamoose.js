((window, document, undefined) => { // eslint-disable-line no-unused-vars, no-shadow-restricted-names
    // Helper functions
    function forEach(array, cb, scope) {
        for (let i = 0; i < array.length; i++) {
            cb.call(scope, i, array[i]); // passes back stuff we need
        }
    }

    function trigger(eventsToTrigger) {
        const events = eventsToTrigger.split(',').map(item => item.trim());
        for (let i = 0; i < events.length; i++) {
            if ('createEvent' in document) {
                const evt = document.createEvent('HTMLEvents');
                evt.initEvent(events[i], false, true);
                this.dispatchEvent(evt);
            } else {
                this.fireEvent(`on${events[i]}`);
            }
        }
    }

    function Vamoose(element, options = {}) {
        this.element = element;
        this.options = options;

        this.init();
    }

    Vamoose.fn = Vamoose.prototype = { // eslint-disable-line no-multi-assign
        constructor: Vamoose,
        version: '0.1.1', // TODO: pull this from package.json
        init() {
            this.wrapper = document.createElement('div');
            this.wrapper.className = 'input-wrapper';
            this.element.parentNode.insertBefore(this.wrapper, this.element);
            this.element.parentNode.removeChild(this.element);
            this.wrapper.appendChild(this.element);


            this.renderClearCTA();

            this.element.addEventListener('focus', () => {
                this.elementOnFocus();
            });

            this.wrapper.querySelector('.clear-input').addEventListener('focus', () => {
                this.clearOnFocus();
            });

            this.element.addEventListener('blur', () => {
                this.elementOnBlur();
            });

            this.wrapper.querySelector('.clear-input').addEventListener('blur', () => {
                this.clearOnBlur();
            });

            this.wrapper.querySelector('.clear-input').addEventListener('keydown', this.triggerClearInput.bind(this));
            this.wrapper.querySelector('.clear-input').addEventListener('click', this.triggerClearInput.bind(this));
            return this;
        },

        triggerClearInput(e) {
            if (e.which === 32 || e.which === 13 || e.which === 1) { // space enter left-click
                e.preventDefault();
                this.clearInput.bind(this)();
            }
        },

        /**
         * Renders clear CTA
         */
        renderClearCTA() {
            const clear = document.createElement('span');
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
        elementOnFocus() {
            this.wrapper.classList.add('has-focus');
            this.wrapper.querySelector('.clear-input').style.display = 'inline';
        },


        /**
         * Handles when input is blurred
         * @returns {void}
         */
        elementOnBlur() {
            this.wrapper.classList.remove('has-focus');
        },


        /**
         * Handles when clear button is given focus
         * @returns {void}
         */
        clearOnFocus() {
            this.wrapper.classList.add('has-focus');
        },


        /**
         * Handles when clear button is blurred
         * @returns {void}
         */
        clearOnBlur() {
            this.wrapper.classList.remove('has-focus');
            this.wrapper.querySelector('.clear-input').style.display = 'none';
        },


        /**
         * Handles when clear button triggered
         * @returns {void}
         */
        clearInput() {
            this.element.value = '';
            this.element.focus();

            trigger.call(this.element, 'change, input');
            // const eventToTrigger = 'change';
            // if ('createEvent' in document) {
            //     const evt = document.createEvent('HTMLEvents');
            //     evt.initEvent(eventToTrigger, false, true);
            //     this.element.dispatchEvent(evt);
            // } else {
            //     this.element.fireEvent(`on${eventToTrigger}`);
            // }
        },
    };

    /**
     * Globally availalable plugin
     * @param {string} selector CSS selector
     * @param {object} options plugin options object
     */
    const vamoose = (selector, options = {}) => {
        const elements = document.querySelectorAll(selector);
        forEach(elements, (index, element) => {
            new Vamoose(element, options); // eslint-disable-line no-new
            // TODO: Cache plugin $ style??
            // element.dataset.vamoose = new Vamoose(element, options);
        });
        return Array.from(elements);
    };

    Vamoose.fn.init.prototype = Vamoose.fn;
    window.vamoose = vamoose;
})(window, document);
