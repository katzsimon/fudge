import utils from './_plugin-utils-mixin';

class Fudge {
    constructor(target, options) {
        Object.assign(this, utils); // Import generic function
        this.target = target; // Set the target/source element
        const data = this.getDataOptions(target, 'fudge'); // Get the data- attributes set on the target element
        // Merge default options, options set in constructor, data options
        this.opts = { ...this.defaults, ...options, ...data };
        this.opts = this.cast(this.opts);
        this.mode = this.opts.mode; // Set the mode: select or tags
        this.parseInitialOptions(); // Make the initial options
        this.init(); // Initialize the Fudge instance
    }

    // Default options
    defaults = {
        // If you need to override the zIndex
        zindex: null,
        // Limit the amount of selectable tags. -1 = no limit
        tagLimit: -1,
        // Close the dropdown when the tag limit has been reached, if in Tag mode
        closeOnTagLimit: true,
        // select or tags
        mode: 'select',
        // Glue character to join the different tags with
        glue: ',',
        // Separate the value and text of an option text1::Text 1,text2::Text 2
        glueOption: '::',
        // Add the glue character to the end of the tag string
        // true = tag1,tag2, || false = tag1,tag2
        glueEnd: false,
        // Allow adding new options to the dropdown list
        add: false,
        // Icon on the right to show the dropdown (Font Awesome: angle-down)
        iconDropdown:
            '<svg viewBox="0 0 512 512"><path d="m397 160l19 21-160 171-160-171 19-21 141 151z"/></svg>',
        // Icon to show when filtering items (Font Awesome: search)
        iconSearch:
            '<svg viewBox="0 0 512 512"><path d="m496 436l-121-103c-13-12-26-17-37-16 29-34 46-77 46-125 0-106-86-192-192-192-106 0-192 86-192 192 0 106 86 192 192 192 48 0 91-17 125-46-1 11 4 24 16 37l103 121c17 20 46 21 64 4 17-18 16-47-4-64z m-304-116c-71 0-128-57-128-128 0-71 57-128 128-128 71 0 128 57 128 128 0 71-57 128-128 128z"></path></svg>',
        // Icon to show when adding a new option (Font Awesome: plus)
        iconAdd:
            '<svg viewBox="0 0 512 512"><path d="m457 210l0 55c0 8-3 14-8 20-5 5-12 8-19 8l-119 0 0 118c0 8-3 15-8 20-5 5-12 8-20 8l-54 0c-8 0-15-3-20-8-5-5-8-12-8-20l0-118-119 0c-7 0-14-3-19-8-5-6-8-12-8-20l0-55c0-7 3-14 8-19 5-5 12-8 19-8l119 0 0-119c0-8 3-14 8-19 5-6 12-8 20-8l54 0c8 0 15 2 20 8 5 5 8 11 8 19l0 119 119 0c7 0 14 3 19 8 5 5 8 12 8 19z"></path></svg>',
        // Icon to show when removing a tag (Font Awesome: times)
        iconRemove:
            '<svg viewBox="0 0 512 512"><path d="m426 378c0 7-3 14-8 19l-39 39c-5 5-12 8-20 8-7 0-14-3-19-8l-84-84-84 84c-5 5-12 8-19 8-8 0-15-3-20-8l-39-39c-5-5-8-12-8-19 0-8 3-14 8-20l84-84-84-84c-5-5-8-12-8-19 0-8 3-14 8-20l39-38c5-6 12-8 20-8 7 0 14 2 19 8l84 84 84-84c5-6 12-8 19-8 8 0 15 2 20 8l39 38c5 6 8 12 8 20 0 7-3 14-8 19l-84 84 84 84c5 6 8 12 8 20z"></path></svg>',
        // Text to show when there are no options filtered
        msgNoResults: 'No Matching Results',
        // Add a custom theme
        theme: '',
        // Set the maximum height of the dropdown
        maxDropdownHeight: null,
        // Show the target/original element (useful for testing/debugging)
        showTarget: false,
        // Disable adding glow to filtered options
        glowDisable: false,
        // Possibly holds the initial values for the options
        options: [],
        // Displaying the placeholder text
        placeholder: '',
        // Override placeholder style if needed
        placeholderStyle: '',
        // Override placeholder class if needed
        placeholderClass: '',
        // Displaying the placeholder text for the filter input
        placeholderFilter: 'Filter...',
    };

    // Contains the initial options for the dropdown list
    options = {};
    // The number of tags selected
    addedTags = 0;
    // The mode for the dropdown - 'select' or 'tags'
    mode = 'select';
    // Holds the options for the plugin
    // options used to pass in the initial option values, so opts used internally instead
    opts = {};
    // The original select or input element
    target = null;
    // Inline style from the target element
    targetStyle = '';
    // Classes from the target element
    targetClass = '';
    // Holds if the dropdown is open
    opened = false;
    // Used for a timeout to prevent multiple opening events
    opening = false;
    // Holds the bound event to the document, closes the dropdown when clicked outside the dropdown
    clickedInsideFunction = null;
    // The current selected value
    value = '';
    // HTML for the Fudge plugin
    fudge = null;
    // HTML for the dropdown menu
    dropdown = null;
    // HTML element for the openclose button
    openclose = null;
    // HTML for the options/items
    items = null;
    // HTML for displaying the current selected option or tags
    selected = null;
    // HTML for displaying the plugin when it is closed
    display = null;
    // The input element to filter options or add a new option
    input = null;
    // Wrapper for the Message when there are no options to display
    noOptions = null;
    // Wrapper for adding a new option
    elAddOptions = null;
    // Displaying the new item text/value to add
    elAddOption = null;

    /**
     * Initialize this plugin
     *
     * Build the HTML required,
     * Assign elements to variables,
     * Assign basic events
     */
    init() {
        const { target } = this;
        this.targetStyle = target.getAttribute('style');
        this.targetClass = target.getAttribute('class');
        if (this.opts.showTarget === false) target.style.display = 'none';
        target.Fudge = this;

        // Check if there a placeholder on the target element
        if (
            this.empty(this.opts.placeholder)
            && target.hasAttribute('placeholder')
        ) this.opts.placeholder = target.getAttribute('placeholder');

        let maxDropdownHeight = '';
        if (this.opts.maxDropdownHeight !== null) maxDropdownHeight = ` style="max-height:${this.opts.maxDropdownHeight}"`;

        let fudgeStyles = '';
        if (this.opts.zindex !== null) fudgeStyles = `${fudgeStyles}z-index:${this.opts.zindex};`;

        if (fudgeStyles !== '') fudgeStyles = ` style="${fudgeStyles}"`;

        let icon = this.opts.iconSearch;
        if (this.opts.add) icon = this.opts.iconAdd;

        const fudge = this.html(`
<div class="fudge ${this.opts.theme}" tabindex="0" aria-haspopup="true" aria-expanded="false" aria-haspopup="listbox" ${fudgeStyles}>
    <div class="fudge-display ${this.targetClass}" style="${this.targetStyle}">
        <div class="fudge-placeholder" style="${this.opts.placeholderStyle}" class="${this.opts.placeholderClass}">
            ${this.opts.placeholder}
        </div>
        <div class="fudge-selected">
            &nbsp;
        </div>
        <div class="fudge-openclose">${this.opts.iconDropdown}</div>
    </div>
    <div class="fudge-dropdown" role="listbox">
        <div class="fudge-input">
            <div class="fudge-input-icon">
                ${icon}
            </div>
            <input class="fudge-input-el" placeholder="${this.opts.placeholderFilter}">
        </div>
        <div class="fudge-add-option fudge-hidden">
            <div class="fudge-option fudge-adding"><span class="fudge-bold">Add: </span><span class="fudge-add"></span></div>
        </div>
        <div class="fudge-no-options fudge-hidden">
            <div class="fudge-option fudge-bold fudge-no">${this.opts.msgNoResults}</div>
        </div>
        <div class="fudge-options" ${maxDropdownHeight}>
        </div>
    </div>
</div>
`);
        this.insertAfter(target, fudge);
        this.fudge = fudge;
        this.dropdown = fudge.querySelector('.fudge-dropdown');
        this.openclose = fudge.querySelector('.fudge-openclose');
        this.fudgeOptions = fudge.querySelector('.fudge-options');
        this.selected = fudge.querySelector('.fudge-selected');
        this.display = fudge.querySelector('.fudge-display');
        this.input = fudge.querySelector('.fudge-input-el');
        this.noOptions = fudge.querySelector('.fudge-no-options');
        this.elAddOptions = fudge.querySelector('.fudge-add-option');
        this.elAddOption = fudge.querySelector('.fudge-add');
        this.placeholder = fudge.querySelector('.fudge-placeholder');

        this.buildInitialOptions(); // Create the dropdown items

        // Highlight and select the target value, if there is one
        this.highlight(target.value);
        this.select(target.value);

        // Toggle the dropdown menu whn clicking the openclose icon
        this.openclose.addEventListener('click', () => {
            if (this.opened === false) {
                this.open();
            } else {
                this.close();
            }
        });

        // Click on selected to open the dropdown menu
        this.selected.addEventListener('mousedown', () => {
            if (this.opened === false) this.open();
        });

        this.fudge.addEventListener('focus', () => {
            if (this.opened === false) this.open();
        });

        // Handle different key presses
        this.input.addEventListener('keydown', (e) => {
            const key = e.key ?? null;
            if (key === 'Tab') {
                e.preventDefault();
                this.close();
            } else if (key === 'Enter') {
                e.preventDefault();
            }
        });
        this.input.addEventListener('keyup', (e) => {
            e.preventDefault();
            this.keys(e);
        });

        // Update the plugin if the target value changes
        this.target.addEventListener('change', () => {
            this.select(this.target.value);
            this.close();
        });

        // Highlight the add new option on mouseenter
        this.elAddOptions.addEventListener('mouseenter', () => {
            this.highlight('add');
        });
        // Click on the add item message, so add a new option if enabled
        this.elAddOptions.addEventListener('click', () => {
            this.select();
        });
        // Access the Fudge Instance from the target
        this.target.fudge = this;
    }

    /**
     * Open the dropdown menu
     */
    open() {
        if (this.opened === false) {
            this.opening = true;
            this.opened = true;
            this.fudge.classList.add('open');
            this.fudge.setAttribute('aria-expanded', 'true');
            this.input.focus();
            if (this.mode === 'select') this.highlight(this.target.value);

            // Close the dropdown if clicked outside the plugin
            // Bind an event/function to the document to detect clicks outside
            const t = this;
            if (this.clickedInsideFunction === null) {
                this.clickedInsideFunction = function clickedInside(e) {
                    const isClickInside = t.fudge.contains(e.target);
                    if (!isClickInside) {
                        document.removeEventListener('click', this.clickedInsideFunction, true);
                        t.close();
                        this.clickedInsideFunction = null;
                    }
                };
                document.addEventListener('click', this.clickedInsideFunction, true);
            }
            // A little delay to prevent multiple events firing
            setTimeout(() => {
                this.opening = false;
                this.input.focus();
            }, 100);
        }
    }

    /**
     * Close the dropdown menu
     */
    close() {
        if (this.opened === true && this.opening === false) {
            this.opened = false;
            this.fudge.classList.remove('open');
            this.fudge.setAttribute('aria-expanded', 'false');
            this.input.value = '';
            this.filter();

            // Remove the document event to detect clicks outside plugin
            if (this.clickedInsideFunction !== null) {
                document.removeEventListener('click', this.clickedInsideFunction, true);
                this.clickedInsideFunction = null;
            }
        }
    }

    /**
     * Handle the different key presses
     * @param e
     */
    keys(e) {
        const key = e.key ?? null;
        if (key === 'ArrowDown') {
            this.highlight('next');
        } else if (key === 'ArrowUp') {
            this.highlight('prev');
        } else if (key === 'Enter') {
            e.preventDefault();
            this.select();
        } else if (key === 'Escape') {
            this.close();
        } else if (key === 'Home') {
            this.highlight('first');
        } else if (key === 'End') {
            this.highlight('last');
        } else {
            this.filter();
        }
    }

    /**
     * Generate the initial options from the different possible sources
     *
     * Populates this.options with the [{value:"the_value",text:"Display Text"},*]
     */
    parseInitialOptions() {
        this.options = [];
        let value;
        let text;
        if (!this.empty(this.opts.options)) {
            if (typeof this.opts.options === 'string') {
                try {
                    // Try decode a JSON string from the options
                    const decoded = JSON.parse(this.opts.options);
                    decoded.forEach((item) => {
                        value = item.value ?? item.text;
                        text = item.text ?? item.value;
                        this.options.push({ value, text });
                    });
                } catch (e) {
                    // If the JSON decode fails,
                    // Split options string separated by this.opts.glue
                    const opts = this.opts.options.split(this.opts.glue);
                    opts.forEach((opt) => {
                        // String separated by this.opts.glue2 for value/text pair
                        const opts2 = opt.split(this.opts.glueOption);
                        value = opts2[0];
                        text = opts2[1] ?? opts2[0];
                        this.options.push({ value, text });
                    });
                }
            } else if (typeof this.opts.options === 'object') {
                this.opts.options.forEach((opt) => {
                    // String separated by this.opts.glue2 for value/text pair
                    if (typeof opt === 'object') {
                        value = opt.value;
                        text = opt.value ?? opt.text;
                        this.options.push({ value, text });
                    } else if (typeof opt === 'string') {
                        const opts2 = opt.split(this.opts.glueOption);
                        value = opts2[0];
                        text = opts2[1] ?? opts2[0];
                        this.options.push({ value, text });
                    }
                });
            }
        } else if (
            this.target.nodeName === 'SELECT'
            && this.empty(this.opts.options)
        ) {
            // Get options from the target selects option elements
            const selectOptions = this.target.querySelectorAll('option, optgroup');
            selectOptions.forEach((anOption) => {
                if (anOption.nodeName === 'OPTGROUP') {
                    value = 'optgroup';
                    text = anOption.getAttribute('label');
                    this.options.push({ value, text });
                } else if (anOption.nodeName === 'OPTION') {
                    value = anOption.value;
                    text = anOption.innerHTML;
                    this.options.push({ value, text });
                }
            });
        }
    }

    /**
     * Build the initial options
     *
     * Adding all the initial options in 1 go, to prevent multiple repaints
     */
    buildInitialOptions() {
        let html = '';
        this.options.forEach((option) => {
            html += this.buildOption(option.value, option.text);
        });

        this.fudgeOptions.innerHTML = html;

        const options = this.fudgeOptions.querySelectorAll('.fudge-option');
        options.forEach((option) => {
            option.addEventListener('click', () => {
                this.select(option);
            });
            option.addEventListener('mouseenter', () => {
                this.highlight(option);
            });
            // Also see this.addOption
        });
    }

    /**
     * Creates the HTML for an option
     * Equivalent to: <option="value">text</option>
     *
     * @param value
     * @param text
     * @returns {string}
     */
    buildOption(value, text) {
        // If no text specified use value
        if (this.empty(text)) text = value;
        if (text === '') text = '&nbsp;';

        if (value === 'optgroup') return `<div class="fudge-optgroup">${text}</div>`;

        return `<div class="fudge-option" data-value="${value}" data-text="${text}" role="option">${text}</div>`;
    }

    /**
     * Add a new option to the dropdown list
     *
     * @param newValue
     * @param newText
     * @returns {boolean|*}
     */
    addOption(newValue, newText) {
        // if no value specified, use the current text from this.input
        newValue = newValue ?? this.input.value;
        newText = newText ?? this.input.value;

        // Don't add an empty value and text
        if (this.empty(newValue) && this.empty(newText)) return false;

        const exists = this.fudgeOptions.querySelector(`[data-value='${newValue}']`);
        // Return the existing option if it exists
        if (!this.empty(exists)) return exists;

        const newItem = this.html(this.buildOption(newValue, newText));
        this.fudgeOptions.append(newItem);
        this.highlight(this.input.value);
        this.hide(this.noOptions);

        this.input.value = '';
        this.hide(this.addiItems);
        this.elAddOption.innerHTML = '';
        this.filter();
        this.highlight(newValue);

        newItem.addEventListener('click', () => {
            this.select(newItem);
        });
        newItem.addEventListener('mouseenter', () => {
            this.highlight(newItem);
        });
        // Also see this.buildInitialOptions

        // Returns the HTML element of the new option
        return newItem;
    }

    /**
     * Build the HTML tag
     *
     * @param value
     * @param text
     * @returns {null|*}
     */
    buildTag(value, text) {
        text = text ?? value;
        return this.html(`
<div class="fudge-tag" data-value="${value}" data-text="${text}">
    <div class="fudge-tag-text">${text}</div>
    <div class="fudge-tag-remove">${this.opts.iconRemove}</div>
</div>`);
    }

    /**
     * Add a tag to to fudge.selected
     *
     * @param tag
     */
    addTag(tag) {
        // Check the tagLimit that new tags can be added
        if (this.opts.tagLimit === -1 || this.addedTags < this.opts.tagLimit) {
            if (
                typeof tag === 'object'
                && tag.classList.contains('fudge-option')
            ) {
                // Add a tag from an option
                tag.classList.add('fudge-hidden');
                tag = this.buildTag(tag.getAttribute('data-value'), tag.getAttribute('data-text'));
            } else if (typeof tag === 'string') {
                // Add a tag from a string
                tag = this.buildTag(tag);
            }

            if (tag !== null) {
                this.selected.append(tag);
                this.addedTags += 1;
                tag.querySelector('.fudge-tag-remove').addEventListener('click', () => {
                    this.removeTag(tag);
                });
                this.setTagsValue();
            }
        }
    }

    /**
     * Remove a selected tag
     *
     * @param tag
     */
    removeTag(tag) {
        if (typeof tag === 'string') {
            tag = this.selected.querySelector(`[data-value="${tag}"]`);
        }

        if (this.empty(tag)) return;

        // Find the corresponding option and make it visible
        const item = this.fudgeOptions.querySelector(`[data-value="${tag.getAttribute('data-value')}"]`);
        item.classList.remove('fudge-hidden');

        this.addedTags -= 1;
        tag.remove();

        this.setTagsValue();
        this.filter();
        this.input.focus();
    }

    /**
     * Set the target value, joining the tags with the glue character
     */
    setTagsValue() {
        const tags = this.selected.querySelectorAll('.fudge-tag');
        const output = [];
        let newValue = '';
        tags.forEach((tag) => {
            output.push(tag.getAttribute('data-value'));
        });
        newValue = output.join(this.opts.glue);

        // Add an additional glue character to the end of the string
        if (this.opts.glueEnd === true) newValue += this.opts.glue;

        if (newValue === this.opts.glue) newValue = '';
        this.value = newValue;
        this.target.value = newValue;
        this.triggerEvent(this.target, 'updated');
        this.triggerEvent(this.target, 'input');

        if (this.empty(newValue)) this.setPlaceholder();
    }

    /**
     * Show placeholder text if there is no selected option
     */
    setPlaceholder() {
        const checkEmptyOption = this.fudgeOptions.querySelector("[data-value='']");
        if (this.empty(checkEmptyOption) && this.empty(this.value)) {
            this.placeholder.classList.remove('fudge-hidden');
        } else {
            this.placeholder.classList.add('fudge-hidden');
        }
    }

    /**
     * Filter the dropdown options by the text or input.value
     *
     * @param text
     */
    filter(text) {
        text = text ?? this.input.value;
        text = text.toLowerCase();

        if (this.mode === 'select') {
            // Go through each option to check if the text matches the filter
            this.fudgeOptions
                .querySelectorAll('.fudge-option')
                .forEach((item) => {
                    if (
                        item
                            .getAttribute('data-text')
                            .toLowerCase()
                            .indexOf(text) >= 0
                    ) {
                        this.showOption(item);
                    } else {
                        this.hideOption(item);
                    }
                });
        } else {
            // Show Options for Tags
            const currentTags
                = this.opts.glue + this.target.value + this.opts.glue;
            this.fudgeOptions
                .querySelectorAll('.fudge-option')
                .forEach((item) => {
                    const itemGlued
                        = this.opts.glue
                        + item.getAttribute('data-value')
                        + this.opts.glue;
                    if (
                        item
                            .getAttribute('data-text')
                            .toLowerCase()
                            .indexOf(text) >= 0
                        && currentTags.indexOf(itemGlued) === -1
                    ) {
                        this.showOption(item);
                    } else {
                        this.hideOption(item);
                    }
                });
        }

        const visibleItems = this.fudgeOptions.querySelectorAll('.fudge-option:not(.fudge-hidden)');
        if (visibleItems.length === 0) this.show(this.noOptions);
        else this.hide(this.noOptions);

        if (this.opts.add === true) {
            this.elAddOption.innerHTML = this.input.value;
            if (text === '') this.hide(this.elAddOptions);
            else this.show(this.elAddOptions);
        }

        this.highlight('filter');
    }

    /**
     * Highlight the next selected option
     *
     * Move to next, previous, first or last option in the dropdown list
     *
     * @param type
     */
    highlight(type) {
        type = type ?? '';

        let options = [];
        if (this.opts.add === true && this.input.value !== '') {
            options = this.fudge.querySelectorAll('.fudge-option:not(.fudge-hidden):not(.fudge-no)');
        } else {
            options = this.fudgeOptions.querySelectorAll('.fudge-option:not(.fudge-hidden)');
        }

        const currentHighlight = this.fudge.querySelector('.fudge-highlight');
        let nextHighlight = null;
        let current = -1;
        if (typeof type === 'object') {
            nextHighlight = type;
        } else if (type === 'clear') {
            nextHighlight = null;
        } else if (type === 'add') {
            nextHighlight = this.elAddOptions.querySelector('.fudge-option');
        } else if (type === 'first') {
            nextHighlight = options[0];
        } else if (type === 'last') {
            nextHighlight = options[options.length - 1];
        } else if (type === 'next') {
            if (this.empty(currentHighlight)) {
                nextHighlight = options[0];
            } else {
                for (current = 0; current < options.length; current += 1) {
                    if (options[current] === currentHighlight) break;
                }
                nextHighlight = options[current + 1];
            }
            if (this.empty(nextHighlight)) {
                nextHighlight = options[options.length - 1];
            }
        } else if (type === 'prev') {
            for (current = 0; current < options.length; current += 1) {
                if (options[current] === currentHighlight) break;
            }

            if (current >= 1) nextHighlight = options[current - 1];

            if (this.empty(nextHighlight)) nextHighlight = options[0];
        } else if (type === 'filter') {
            if (this.opts.add === true) {
                if (options.length === 1) {
                    nextHighlight = options[0];
                } else if (options.length >= 1) {
                    nextHighlight = options[1];
                }
            } else {
                nextHighlight = options[0] ?? null;
            }
        } else if (!this.empty(type)) {
            // Get the option matching the current selected value / targets value
            nextHighlight = this.fudgeOptions.querySelector(`[data-value='${type}']`);
        }

        if (!this.empty(currentHighlight)) {
            currentHighlight.classList.remove('fudge-highlight');
        }
        if (!this.empty(nextHighlight)) {
            nextHighlight.classList.add('fudge-highlight');
        }
    }

    /**
     * Show an option by filtering, add the glow if needed
     *
     * @param option
     */
    showOption(option) {
        option.classList.remove('fudge-hidden');
        option.innerHTML = this.glow(option);
    }

    /**
     * Hide an option by filtering
     *
     * @param option
     */
    hideOption(option) {
        if (!option.classList.contains('fudge-hidden')) {
            option.classList.add('fudge-hidden');
            option.classList.remove('fudge-highlight');
        }
    }

    /**
     * Highlight the option text matching the filtered text
     *
     * @param option
     * @param filter
     * @returns {string}
     */
    glow(option, filter) {
        let output = '';
        filter = filter ?? this.input.value.toLowerCase();
        const text = option.getAttribute('data-text');
        if (this.empty(filter) || this.opts.glowDisable) {
            output = text;
        } else {
            const startPos = text.toLowerCase().indexOf(filter);
            const endPos = startPos + filter.length;
            // Splits the string to find the matching part that need to have the glow added
            // Replace spaces with &nbsp; to prevent collapsing white spaces
            const glowBefore = text
                .substring(0, startPos)
                .replace(/ /g, '&nbsp;');
            const glowApply = text
                .substring(startPos, endPos)
                .replace(/ /g, '&nbsp;');
            const glowAfter = text
                .substring(endPos, text.length)
                .replace(/ /g, '&nbsp;');
            // Wrap the matching text in a .fudge-glow span
            output = `${glowBefore}<span class="fudge-glow">${glowApply}</span>${glowAfter}`;
        }
        return output;
    }

    /**
     * Select an option from the dropdown list
     * Or specify a new option to add and select
     *
     * @param option
     */
    select(option) {
        option = option ?? null;
        if (option === null) {
            // If no option specified, check for the current .fudge-highlighted option
            let highlighted = this.fudge.querySelector('.fudge-highlight');
            if (highlighted !== null) {
                if (highlighted.classList.contains('fudge-adding')) {
                    highlighted = this.addOption();
                }
                option = highlighted;
            }
        } else if (typeof option === 'string') {
            // If the new option is a string create or get the corresponding option
            option = this.addOption(option);
        }
        // Check if there is an option with an empty value
        if (option === false) {
            option = this.fudgeOptions.querySelector("[data-value='']");
        }

        if (option !== null && typeof option === 'object') {
            if (this.mode === 'tags') {
                // Add a tag
                this.addTag(option);
                this.input.value = '';
                this.filter();
                this.input.focus();
                if (
                    parseInt(this.addedTags) === parseInt(this.opts.tagLimit)
                    && this.opts.closeOnTagLimit
                ) {
                    this.close(true);
                }
            } else {
                // Select the option
                this.selected.innerHTML = option.getAttribute('data-text');
                this.value = option.getAttribute('data-value');
                option.setAttribute('aria-selected', 'true');
                this.fudgeOptions
                    .querySelector('[aria-selected]')
                    .removeAttribute('aria-selected');
                this.close();
                if (this.target.value !== this.value) {
                    if (this.target.nodeName === 'SELECT') {
                        const exists = this.target.querySelector(`[value='${this.value}']`);
                        if (this.empty(exists)) {
                            this.target.append(this.html(`<option value="${this.value}">${this.value}</option>`));
                        }
                    }
                    this.target.value = this.value;
                    this.triggerEvent(this.target, 'updated');
                    this.triggerEvent(this.target, 'input');
                    this.triggerEvent(this.target, 'change');
                }
            }
        }
        // Show the placeholder text if needed
        this.setPlaceholder();
    }

    /**
     * Hide an element by adding a 'fudge-hidden' class
     *
     * @param element
     */
    hide(element) {
        if (!this.empty(element)) element.classList.add('fudge-hidden');
    }

    /**
     * Make an element visible by removing the 'fudge-hidden' class
     *
     * @param element
     */
    show(element) {
        if (!this.empty(element)) element.classList.remove('fudge-hidden');
    }
}

export default Fudge;
