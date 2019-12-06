import '../scss/vamoose.scss';
import { version } from '../../package.json';

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
    version,
    init() {
        this.wrapper = document.createElement('div');
        this.wrapper.className = 'input-wrapper';
        const parent = this.element.parentNode;

        if (this.options.useParentAsWrapper) {
            this.wrapper = parent;
            this.wrapper.classList.add('input-wrapper');
        } else {
            parent.insertBefore(this.wrapper, this.element);
            parent.removeChild(this.element);
            this.wrapper.appendChild(this.element);
        }

        this.renderClearCTA();

        // Element event listeners
        switch (this.options.showOn) {
            case 'change':
            case 'input': {
                this.element.addEventListener(this.options.showOn, () => {
                    if (this.element.value) {
                        this.engage();
                    } else {
                        this.disengage();
                    }
                });
                this.watch();

                // Show cta if value is prepopulated
                if (this.element.value) {
                    this.engage();
                }

                break;
            }
            case 'focus':
            default: {
                this.element.addEventListener('focus', () => {
                    this.engage();
                });

                this.element.addEventListener('blur', () => {
                    this.disengage();
                });
            }
        }


        // Wrapper event listeners
        this.wrapper.querySelector('.clear-input').addEventListener('focus', () => {
            this.clearOnFocus();
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
    engage() {
        this.showCTA();
        this.wrapper.querySelector('.clear-input').style.display = 'inline';
    },


    /**
         * Handles when input is blurred
         * @returns {void}
         */
    disengage() {
        if (!this.element.value || this.options.hideOnBlur) {
            this.hideCTA();
        }
    },


    /**
     * Handles when clear button is given focus
     * @returns {void}
     */
    clearOnFocus() {
        this.showCTA();
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

    showCTA() {
        this.wrapper.classList.add('has-focus');
    },

    hideCTA() {
        this.wrapper.classList.remove('has-focus');
    },

    watch() {
        const timeout = 400;
        this.oldValue = this.element.value;
        this.snoopTimer = setTimeout(function s(self) {
            if (self.element.value && self.oldValue !== self.element.value) {
                trigger.call(self.element, 'change, input');
                self.oldValue = self.element.value; // eslint-disable-line no-param-reassign
            }

            clearTimeout(self.snoopTimer);
            self.snoopTimer = setTimeout(s, timeout, self); // eslint-disable-line no-param-reassign
        },
        timeout,
        this,
        );
    },
};

/**
 * Globally availalable plugin
 * @param {string} selector CSS selector
 * @param {object} options plugin options object
 */
const vamoose = (selector, options = {}) => {
    let elements = [selector];
    const config = {
        hideOnBlur: true,
        useParentAsWrapper: false,
        showOn: 'focus', // {focus, input}
        ...options,
    };

    if (typeof selector === 'string') {
        elements = document.querySelectorAll(selector);
    }

    forEach(elements, (index, element) => {
        new Vamoose(element, config); // eslint-disable-line no-new
        // TODO: Cache plugin $ style??
        // element.dataset.vamoose = new Vamoose(element, options);
    });
    return Array.from(elements);
};

Vamoose.fn.init.prototype = Vamoose.fn;
export default vamoose;

