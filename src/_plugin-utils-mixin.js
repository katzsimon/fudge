/*
 * Generic plugin utility functions
 */
export default {
    insertAfter(target, newEl) {
        if (typeof target === 'string') target = document.querySelector(target);

        if (typeof newEl === 'string') {
            newEl = this.html(newEl);
        }

        if (typeof newEl === 'object') {
            target.parentNode.insertBefore(newEl, target.nextSibling);
        }
    },

    empty(item) {
        if (item === '') return true;
        if (item === null) return true;
        if (typeof item === 'undefined') return true;
        if (item.length === 0) return true;
        if (item === false) return true;

        return false;
    },

    cast(data) {
        if (typeof data === 'object') {
            Object.entries(this.opts).forEach((item) => {
                const key = item[0];
                const value = item[1];
                if (value === 'true') {
                    data[key] = true;
                }
                if (value === 'false') data[key] = false;
                if (this.isStringInteger(value)) data[key] = parseInt(value);
            });
        }
        return data;
    },

    isStringInteger(string) {
        const numbersOnly = new RegExp('^[0-9]+$');
        return typeof string === 'string' && numbersOnly.test();
    },

    triggerEvent(obj, type) {
        const evt = new CustomEvent(type);
        if (typeof obj.dispatchEvent !== 'undefined') {
            obj.dispatchEvent(evt);
        }
    },

    html(str) {
        const wrapper = document.createElement('div');
        wrapper.innerHTML = str.trim();
        return wrapper.firstChild;
    },

    getDataOptions(target, name) {
        name = name ?? '';
        const options = {};
        if (target !== null) {
            Object.keys(this.defaults).forEach((option) => {
                const opt1 = `data-${name}-${this.toSnakeCase(option)}`;
                const opt2 = `data-${this.toSnakeCase(option)}`;
                const opt3 = `data-${name}ignore-${this.toSnakeCase(option)}`;
                let data = null;
                if (target.hasAttribute(opt3)) {
                    // Ignore data-attribute (opt2)
                    data = target.getAttribute(opt1);
                } else {
                    // Check for data-name-attribute (opt1) or data-attribute (opt2)
                    data
                        = target.getAttribute(opt1) ?? target.getAttribute(opt2);
                }
                if (data !== null) {
                    options[option] = data;
                }
            });
        }
        return options;
    },

    toCamelCase(str) {
        return str.replace(/([-_][a-z])/gi, ($1) => $1.toUpperCase().replace('-', '').replace('_', ''));
    },

    toSnakeCase(str) {
        return str.replace(/[A-Z]/g, (letter) => `_${letter.toLowerCase()}`);
    },
};
