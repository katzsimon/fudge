/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	// The require scope
/******/ 	var __webpack_require__ = {};
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
// ESM COMPAT FLAG
__webpack_require__.r(__webpack_exports__);

// EXPORTS
__webpack_require__.d(__webpack_exports__, {
  "default": () => (/* binding */ src)
});

;// CONCATENATED MODULE: ./node_modules/@babel/runtime/helpers/esm/typeof.js
function _typeof(obj) {
  "@babel/helpers - typeof";

  if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") {
    _typeof = function _typeof(obj) {
      return typeof obj;
    };
  } else {
    _typeof = function _typeof(obj) {
      return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj;
    };
  }

  return _typeof(obj);
}
;// CONCATENATED MODULE: ./node_modules/@babel/runtime/helpers/esm/classCallCheck.js
function _classCallCheck(instance, Constructor) {
  if (!(instance instanceof Constructor)) {
    throw new TypeError("Cannot call a class as a function");
  }
}
;// CONCATENATED MODULE: ./node_modules/@babel/runtime/helpers/esm/createClass.js
function _defineProperties(target, props) {
  for (var i = 0; i < props.length; i++) {
    var descriptor = props[i];
    descriptor.enumerable = descriptor.enumerable || false;
    descriptor.configurable = true;
    if ("value" in descriptor) descriptor.writable = true;
    Object.defineProperty(target, descriptor.key, descriptor);
  }
}

function _createClass(Constructor, protoProps, staticProps) {
  if (protoProps) _defineProperties(Constructor.prototype, protoProps);
  if (staticProps) _defineProperties(Constructor, staticProps);
  return Constructor;
}
;// CONCATENATED MODULE: ./node_modules/@babel/runtime/helpers/esm/defineProperty.js
function _defineProperty(obj, key, value) {
  if (key in obj) {
    Object.defineProperty(obj, key, {
      value: value,
      enumerable: true,
      configurable: true,
      writable: true
    });
  } else {
    obj[key] = value;
  }

  return obj;
}
;// CONCATENATED MODULE: ./src/_plugin-utils-mixin.js


/*
 * Generic plugin utility functions
 */
/* harmony default export */ const _plugin_utils_mixin = ({
  insertAfter: function insertAfter(target, newEl) {
    if (typeof target === 'string') target = document.querySelector(target);

    if (typeof newEl === 'string') {
      newEl = this.html(newEl);
    }

    if (_typeof(newEl) === 'object') {
      target.parentNode.insertBefore(newEl, target.nextSibling);
    }
  },
  empty: function empty(item) {
    if (item === '') return true;
    if (item === null) return true;
    if (typeof item === 'undefined') return true;
    if (item.length === 0) return true;
    if (item === false) return true;
    return false;
  },
  cast: function cast(data) {
    var _this = this;

    if (_typeof(data) === 'object') {
      Object.entries(this.opts).forEach(function (item) {
        var key = item[0];
        var value = item[1];

        if (value === 'true') {
          data[key] = true;
        }

        if (value === 'false') data[key] = false;
        if (_this.isStringInteger(value)) data[key] = parseInt(value);
      });
    }

    return data;
  },
  isStringInteger: function isStringInteger(string) {
    var numbersOnly = new RegExp('^[0-9]+$');
    return typeof string === 'string' && numbersOnly.test();
  },
  triggerEvent: function triggerEvent(obj, type) {
    var evt = new CustomEvent(type);

    if (typeof obj.dispatchEvent !== 'undefined') {
      obj.dispatchEvent(evt);
    }
  },
  html: function html(str) {
    var wrapper = document.createElement('div');
    wrapper.innerHTML = str.trim();
    return wrapper.firstChild;
  },
  getDataOptions: function getDataOptions(target, name) {
    var _name,
        _this2 = this;

    name = (_name = name) !== null && _name !== void 0 ? _name : '';
    var options = {};

    if (target !== null) {
      Object.keys(this.defaults).forEach(function (option) {
        var opt1 = "data-".concat(name, "-").concat(_this2.toSnakeCase(option));
        var opt2 = "data-".concat(_this2.toSnakeCase(option));
        var opt3 = "data-".concat(name, "ignore-").concat(_this2.toSnakeCase(option));
        var data = null;

        if (target.hasAttribute(opt3)) {
          // Ignore data-attribute (opt2)
          data = target.getAttribute(opt1);
        } else {
          var _target$getAttribute;

          // Check for data-name-attribute (opt1) or data-attribute (opt2)
          data = (_target$getAttribute = target.getAttribute(opt1)) !== null && _target$getAttribute !== void 0 ? _target$getAttribute : target.getAttribute(opt2);
        }

        if (data !== null) {
          options[option] = data;
        }
      });
    }

    return options;
  },
  toCamelCase: function toCamelCase(str) {
    return str.replace(/([-_][a-z])/gi, function ($1) {
      return $1.toUpperCase().replace('-', '').replace('_', '');
    });
  },
  toSnakeCase: function toSnakeCase(str) {
    return str.replace(/[A-Z]/g, function (letter) {
      return "_".concat(letter.toLowerCase());
    });
  }
});
;// CONCATENATED MODULE: ./src/fudge.js





function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }



var Fudge = /*#__PURE__*/function () {
  function Fudge(target, options) {
    _classCallCheck(this, Fudge);

    _defineProperty(this, "defaults", {
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
      // true = tag1,tag2 || false = tag1,tag2
      glueEnd: true,
      // Allow adding new options to the dropdown list
      add: false,
      // Icon on the right to show the dropdown (Font Awesome: angle-down)
      iconDropdown: '<svg viewBox="0 0 512 512"><path d="m397 160l19 21-160 171-160-171 19-21 141 151z"/></svg>',
      // Icon to show when filtering items (Font Awesome: search)
      iconSearch: '<svg viewBox="0 0 512 512"><path d="m496 436l-121-103c-13-12-26-17-37-16 29-34 46-77 46-125 0-106-86-192-192-192-106 0-192 86-192 192 0 106 86 192 192 192 48 0 91-17 125-46-1 11 4 24 16 37l103 121c17 20 46 21 64 4 17-18 16-47-4-64z m-304-116c-71 0-128-57-128-128 0-71 57-128 128-128 71 0 128 57 128 128 0 71-57 128-128 128z"></path></svg>',
      // Icon to show when adding a new option (Font Awesome: plus)
      iconAdd: '<svg viewBox="0 0 512 512"><path d="m457 210l0 55c0 8-3 14-8 20-5 5-12 8-19 8l-119 0 0 118c0 8-3 15-8 20-5 5-12 8-20 8l-54 0c-8 0-15-3-20-8-5-5-8-12-8-20l0-118-119 0c-7 0-14-3-19-8-5-6-8-12-8-20l0-55c0-7 3-14 8-19 5-5 12-8 19-8l119 0 0-119c0-8 3-14 8-19 5-6 12-8 20-8l54 0c8 0 15 2 20 8 5 5 8 11 8 19l0 119 119 0c7 0 14 3 19 8 5 5 8 12 8 19z"></path></svg>',
      // Icon to show when removing a tag (Font Awesome: times)
      iconRemove: '<svg viewBox="0 0 512 512"><path d="m426 378c0 7-3 14-8 19l-39 39c-5 5-12 8-20 8-7 0-14-3-19-8l-84-84-84 84c-5 5-12 8-19 8-8 0-15-3-20-8l-39-39c-5-5-8-12-8-19 0-8 3-14 8-20l84-84-84-84c-5-5-8-12-8-19 0-8 3-14 8-20l39-38c5-6 12-8 20-8 7 0 14 2 19 8l84 84 84-84c5-6 12-8 19-8 8 0 15 2 20 8l39 38c5 6 8 12 8 20 0 7-3 14-8 19l-84 84 84 84c5 6 8 12 8 20z"></path></svg>',
      // Text to show when there are no options filtered
      msgNoResults: 'No Matching Results',
      // Add a custom theme
      theme: '',
      // Set the maximum height of the dropdown
      maxDropdownHeight: null,
      // Show the target/original element (useful for testing/debugging)
      showTarget: false,
      // Placeholder text
      placeholder: '',
      // Disable adding glow to filtered options
      glowDisable: false,
      // Possibly holds the initial values for the options
      options: []
    });

    _defineProperty(this, "options", {});

    _defineProperty(this, "addedTags", 0);

    _defineProperty(this, "mode", 'select');

    _defineProperty(this, "opts", {});

    _defineProperty(this, "target", null);

    _defineProperty(this, "targetStyle", '');

    _defineProperty(this, "targetClass", '');

    _defineProperty(this, "add", false);

    _defineProperty(this, "opened", false);

    _defineProperty(this, "opening", false);

    _defineProperty(this, "clickedInsideFunction", null);

    _defineProperty(this, "value", '');

    _defineProperty(this, "fudge", null);

    _defineProperty(this, "dropdown", null);

    _defineProperty(this, "openclose", null);

    _defineProperty(this, "items", null);

    _defineProperty(this, "selected", null);

    _defineProperty(this, "display", null);

    _defineProperty(this, "input", null);

    _defineProperty(this, "noOptions", null);

    _defineProperty(this, "elAddOptions", null);

    _defineProperty(this, "elAddOption", null);

    _defineProperty(this, "placeholder", null);

    _defineProperty(this, "placeholderStyle", '');

    _defineProperty(this, "placeholderClass", '');

    Object.assign(this, _plugin_utils_mixin); // Import generic function

    this.target = target; // Set the target/source element

    var data = this.getDataOptions(target, 'fudge'); // Get the data- attributes set on the target element
    // Merge default options, options set in constructor, data options

    this.opts = _objectSpread(_objectSpread(_objectSpread({}, this.defaults), options), data);
    this.opts = this.cast(this.opts);
    this.mode = this.opts.mode; // Set the mode: select or tags

    this.parseInitialOptions(); // Make the initial options

    this.init(); // Initialize the Fudge instance
  } // Default options


  _createClass(Fudge, [{
    key: "init",
    value:
    /**
     * Initialize this plugin
     *
     * Build the HTML required,
     * Assign elements to variables,
     * Assign basic events
     */
    function init() {
      var _this = this;

      var target = this.target;
      this.targetStyle = target.getAttribute('style');
      this.targetClass = target.getAttribute('class');
      if (this.opts.showTarget === false) target.style.display = 'none';
      target.Fudge = this; // Check if there a placeholder on the target element

      if (this.empty(this.opts.placeholder) && target.hasAttribute('placeholder')) this.opts.placeholder = target.getAttribute('placeholder');
      var maxDropdownHeight = '';
      if (this.opts.maxDropdownHeight !== null) maxDropdownHeight = " style=\"max-height:".concat(this.opts.maxDropdownHeight, "\"");
      var icon = this.opts.iconSearch;
      if (this.opts.add) icon = this.opts.iconAdd;
      var fudge = this.html("\n<div class=\"fudge ".concat(this.opts.theme, "\" tabindex=\"0\" aria-haspopup=\"true\" aria-expanded=\"false\" aria-haspopup=\"listbox\">\n    <div class=\"fudge-display ").concat(this.targetClass, "\" style=\"").concat(this.targetStyle, "\">\n        <div class=\"fudge-placeholder\" style=\"").concat(this.opts.placeholderStyle, "\" class=\"").concat(this.opts.placeholderClass, "\">\n            ").concat(this.opts.placeholder, "\n        </div>\n        <div class=\"fudge-selected\">\n            &nbsp;\n        </div>\n        <div class=\"fudge-openclose\">").concat(this.opts.iconDropdown, "</div>\n    </div>\n    <div class=\"fudge-dropdown\" role=\"listbox\">\n        <div class=\"fudge-input\">\n            <div class=\"fudge-input-icon\">\n                ").concat(icon, "\n            </div>\n            <input class=\"fudge-input-el\">\n        </div>\n        <div class=\"fudge-add-option fudge-hidden\">\n            <div class=\"fudge-option fudge-adding\"><span class=\"fudge-bold\">Add: </span><span class=\"fudge-add\"></span></div>\n        </div>\n        <div class=\"fudge-no-options fudge-hidden\">\n            <div class=\"fudge-option fudge-bold fudge-no\">").concat(this.opts.msgNoResults, "</div>\n        </div>\n        <div class=\"fudge-options\" ").concat(maxDropdownHeight, ">\n        </div>\n    </div>\n</div>\n"));
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
      this.select(target.value); // Toggle the dropdown menu whn clicking the openclose icon

      this.openclose.addEventListener('click', function () {
        if (_this.opened === false) {
          _this.open();
        } else {
          _this.close();
        }
      }); // Click on selected to open the dropdown menu

      this.selected.addEventListener('mousedown', function () {
        if (_this.opened === false) _this.open();
      });
      this.fudge.addEventListener('focus', function () {
        if (_this.opened === false) _this.open();
      }); // Handle different key presses

      this.input.addEventListener('keydown', function (e) {
        var _e$key;

        var key = (_e$key = e.key) !== null && _e$key !== void 0 ? _e$key : null;

        if (key === 'Tab') {
          e.preventDefault();

          _this.close();
        }
      });
      this.input.addEventListener('keyup', function (e) {
        e.preventDefault();

        _this.keys(e);
      }); // Update the plugin if the target value changes

      this.target.addEventListener('change', function () {
        _this.select(_this.target.value);

        _this.close();
      }); // Highlight the add new option on mouseenter

      this.elAddOptions.addEventListener('mouseenter', function () {
        _this.highlight('add');
      }); // Click on the add item message, so add a new option if enabled

      this.elAddOptions.addEventListener('click', function () {
        _this.select();
      });
    }
    /**
     * Open the dropdown menu
     */

  }, {
    key: "open",
    value: function open() {
      var _this2 = this;

      if (this.opened === false) {
        this.opening = true;
        this.opened = true;
        this.fudge.classList.add('open');
        this.fudge.setAttribute('aria-expanded', 'true');
        this.input.focus();
        if (this.mode === 'select') this.highlight(this.target.value); // Close the dropdown if clicked outside the plugin
        // Bind an event/function to the document to detect clicks outside

        var t = this;

        if (this.clickedInsideFunction === null) {
          this.clickedInsideFunction = function clickedInside(e) {
            var isClickInside = t.fudge.contains(e.target);

            if (!isClickInside) {
              document.removeEventListener('click', this.clickedInsideFunction, true);
              t.close();
              this.clickedInsideFunction = null;
            }
          };

          document.addEventListener('click', this.clickedInsideFunction, true);
        } // A little delay to prevent multiple events firing


        setTimeout(function () {
          _this2.opening = false;

          _this2.input.focus();
        }, 100);
      }
    }
    /**
     * Close the dropdown menu
     */

  }, {
    key: "close",
    value: function close() {
      if (this.opened === true && this.opening === false) {
        this.opened = false;
        this.fudge.classList.remove('open');
        this.fudge.setAttribute('aria-expanded', 'false');
        this.input.value = '';
        this.filter(); // Remove the document event to detect clicks outside plugin

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

  }, {
    key: "keys",
    value: function keys(e) {
      var _e$key2;

      var key = (_e$key2 = e.key) !== null && _e$key2 !== void 0 ? _e$key2 : null;

      if (key === 'ArrowDown') {
        this.highlight('next');
      } else if (key === 'ArrowUp') {
        this.highlight('prev');
      } else if (key === 'Enter') {
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

  }, {
    key: "parseInitialOptions",
    value: function parseInitialOptions() {
      var _this3 = this;

      this.options = [];
      var value;
      var text;

      if (!this.empty(this.opts.options)) {
        if (typeof this.opts.options === 'string') {
          try {
            // Try decode a JSON string from the options
            var decoded = JSON.parse(this.opts.options);
            decoded.forEach(function (item) {
              var _item$value, _item$text;

              value = (_item$value = item.value) !== null && _item$value !== void 0 ? _item$value : item.text;
              text = (_item$text = item.text) !== null && _item$text !== void 0 ? _item$text : item.value;

              _this3.options.push({
                value: value,
                text: text
              });
            });
          } catch (e) {
            // If the JSON decode fails,
            // Split options string separated by this.opts.glue
            var opts = this.opts.options.split(this.opts.glue);
            opts.forEach(function (opt) {
              var _opts2$;

              // String separated by this.opts.glue2 for value/text pair
              var opts2 = opt.split(_this3.opts.glueOption);
              value = opts2[0];
              text = (_opts2$ = opts2[1]) !== null && _opts2$ !== void 0 ? _opts2$ : opts2[0];

              _this3.options.push({
                value: value,
                text: text
              });
            });
          }
        } else if (_typeof(this.opts.options) === 'object') {
          this.opts.options.forEach(function (opt) {
            // String separated by this.opts.glue2 for value/text pair
            if (_typeof(opt) === 'object') {
              var _opt$value;

              value = opt.value;
              text = (_opt$value = opt.value) !== null && _opt$value !== void 0 ? _opt$value : opt.text;

              _this3.options.push({
                value: value,
                text: text
              });
            } else if (typeof opt === 'string') {
              var _opts2$2;

              var opts2 = opt.split(_this3.opts.glueOption);
              value = opts2[0];
              text = (_opts2$2 = opts2[1]) !== null && _opts2$2 !== void 0 ? _opts2$2 : opts2[0];

              _this3.options.push({
                value: value,
                text: text
              });
            }
          });
        }
      } else if (this.target.nodeName === 'SELECT' && this.empty(this.opts.options)) {
        // Get options from the target selects option elements
        var selectOptions = this.target.querySelectorAll('option');
        selectOptions.forEach(function (anOption) {
          value = anOption.value;
          text = anOption.innerHTML;

          _this3.options.push({
            value: value,
            text: text
          });
        });
      }
    }
    /**
     * Build the initial options
     *
     * Adding all the initial options in 1 go, to prevent multiple repaints
     */

  }, {
    key: "buildInitialOptions",
    value: function buildInitialOptions() {
      var _this4 = this;

      var html = '';
      this.options.forEach(function (option) {
        html += _this4.buildOption(option.value, option.text);
      });
      this.fudgeOptions.innerHTML = html;
      var options = this.fudgeOptions.querySelectorAll('.fudge-option');
      options.forEach(function (option) {
        option.addEventListener('click', function () {
          _this4.select(option);
        });
        option.addEventListener('mouseenter', function () {
          _this4.highlight(option);
        }); // Also see this.addOption
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

  }, {
    key: "buildOption",
    value: function buildOption(value, text) {
      // If no text specified use value
      if (this.empty(text)) text = value;
      if (text === '') text = '&nbsp;';
      return "<div class=\"fudge-option\" data-value=\"".concat(value, "\" data-text=\"").concat(text, "\" role=\"option\">").concat(text, "</div>");
    }
    /**
     * Add a new option to the dropdown list
     *
     * @param newValue
     * @param newText
     * @returns {boolean|*}
     */

  }, {
    key: "addOption",
    value: function addOption(newValue, newText) {
      var _newValue,
          _newText,
          _this5 = this;

      // if no value specified, use the current text from this.input
      newValue = (_newValue = newValue) !== null && _newValue !== void 0 ? _newValue : this.input.value;
      newText = (_newText = newText) !== null && _newText !== void 0 ? _newText : this.input.value; // Don't add an empty value and text

      if (this.empty(newValue) && this.empty(newText)) return false;
      var exists = this.fudgeOptions.querySelector("[data-value='".concat(newValue, "']")); // Return the existing option if it exists

      if (!this.empty(exists)) return exists;
      var newItem = this.html(this.buildOption(newValue, newText));
      this.fudgeOptions.append(newItem);
      this.highlight(this.input.value);
      this.hide(this.noOptions);
      this.input.value = '';
      this.hide(this.addiItems);
      this.elAddOption.innerHTML = '';
      this.filter();
      this.highlight(newValue);
      newItem.addEventListener('click', function () {
        _this5.select(newItem);
      });
      newItem.addEventListener('mouseenter', function () {
        _this5.highlight(newItem);
      }); // Also see this.buildInitialOptions
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

  }, {
    key: "buildTag",
    value: function buildTag(value, text) {
      var _text;

      text = (_text = text) !== null && _text !== void 0 ? _text : value;
      return this.html("\n<div class=\"fudge-tag\" data-value=\"".concat(value, "\" data-text=\"").concat(text, "\">\n    <div class=\"fudge-tag-text\">").concat(text, "</div>\n    <div class=\"fudge-tag-remove\">").concat(this.opts.iconRemove, "</div>\n</div>"));
    }
    /**
     * Add a tag to to fudge.selected
     *
     * @param tag
     */

  }, {
    key: "addTag",
    value: function addTag(tag) {
      var _this6 = this;

      // Check the tagLimit that new tags can be added
      if (this.opts.tagLimit === -1 || this.addedTags < this.opts.tagLimit) {
        if (_typeof(tag) === 'object' && tag.classList.contains('fudge-option')) {
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
          tag.querySelector('.fudge-tag-remove').addEventListener('click', function () {
            _this6.removeTag(tag);
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

  }, {
    key: "removeTag",
    value: function removeTag(tag) {
      if (typeof tag === 'string') {
        tag = this.selected.querySelector("[data-value=\"".concat(tag, "\"]"));
      }

      if (this.empty(tag)) return; // Find the corresponding option and make it visible

      var item = this.fudgeOptions.querySelector("[data-value=\"".concat(tag.getAttribute('data-value'), "\"]"));
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

  }, {
    key: "setTagsValue",
    value: function setTagsValue() {
      var tags = this.selected.querySelectorAll('.fudge-tag');
      var output = [];
      var newValue = '';
      tags.forEach(function (tag) {
        output.push(tag.getAttribute('data-value'));
      });
      newValue = output.join(this.opts.glue); // Add an additional glue character to the end of the string

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

  }, {
    key: "setPlaceholder",
    value: function setPlaceholder() {
      var checkEmptyOption = this.fudgeOptions.querySelector("[data-value='']");

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

  }, {
    key: "filter",
    value: function filter(text) {
      var _text2,
          _this7 = this;

      text = (_text2 = text) !== null && _text2 !== void 0 ? _text2 : this.input.value;
      text = text.toLowerCase();

      if (this.mode === 'select') {
        // Go through each option to check if the text matches the filter
        this.fudgeOptions.querySelectorAll('.fudge-option').forEach(function (item) {
          if (item.getAttribute('data-text').toLowerCase().indexOf(text) >= 0) {
            _this7.showOption(item);
          } else {
            _this7.hideOption(item);
          }
        });
      } else {
        // Show Options for Tags
        var currentTags = this.opts.glue + this.target.value + this.opts.glue;
        this.fudgeOptions.querySelectorAll('.fudge-option').forEach(function (item) {
          var itemGlued = _this7.opts.glue + item.getAttribute('data-value') + _this7.opts.glue;

          if (item.getAttribute('data-text').toLowerCase().indexOf(text) >= 0 && currentTags.indexOf(itemGlued) === -1) {
            _this7.showOption(item);
          } else {
            _this7.hideOption(item);
          }
        });
      }

      var visibleItems = this.fudgeOptions.querySelectorAll('.fudge-option:not(.fudge-hidden)');
      if (visibleItems.length === 0) this.show(this.noOptions);else this.hide(this.noOptions);

      if (this.opts.add === true) {
        this.elAddOption.innerHTML = this.input.value;
        if (text === '') this.hide(this.elAddOptions);else this.show(this.elAddOptions);
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

  }, {
    key: "highlight",
    value: function highlight(type) {
      var _type;

      type = (_type = type) !== null && _type !== void 0 ? _type : '';
      var options = [];

      if (this.opts.add === true && this.input.value !== '') {
        options = this.fudge.querySelectorAll('.fudge-option:not(.fudge-hidden):not(.fudge-no)');
      } else {
        options = this.fudgeOptions.querySelectorAll('.fudge-option:not(.fudge-hidden)');
      }

      var currentHighlight = this.fudge.querySelector('.fudge-highlight');
      var nextHighlight = null;
      var current = -1;

      if (_typeof(type) === 'object') {
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
          var _options$;

          nextHighlight = (_options$ = options[0]) !== null && _options$ !== void 0 ? _options$ : null;
        }
      } else if (!this.empty(type)) {
        // Get the option matching the current selected value / targets value
        nextHighlight = this.fudgeOptions.querySelector("[data-value='".concat(type, "']"));
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

  }, {
    key: "showOption",
    value: function showOption(option) {
      option.classList.remove('fudge-hidden');
      option.innerHTML = this.glow(option);
    }
    /**
     * Hide an option by filtering
     *
     * @param option
     */

  }, {
    key: "hideOption",
    value: function hideOption(option) {
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

  }, {
    key: "glow",
    value: function glow(option, filter) {
      var _filter;

      var output = '';
      filter = (_filter = filter) !== null && _filter !== void 0 ? _filter : this.input.value.toLowerCase();
      var text = option.getAttribute('data-text');

      if (this.empty(filter) || this.opts.glowDisable) {
        output = text;
      } else {
        var startPos = text.toLowerCase().indexOf(filter);
        var endPos = startPos + filter.length; // Splits the string to find the matching part that need to have the glow added
        // Replace spaces with &nbsp; to prevent collapsing white spaces

        var glowBefore = text.substring(0, startPos).replace(/ /g, '&nbsp;');
        var glowApply = text.substring(startPos, endPos).replace(/ /g, '&nbsp;');
        var glowAfter = text.substring(endPos, text.length).replace(/ /g, '&nbsp;'); // Wrap the matching text in a .fudge-glow span

        output = "".concat(glowBefore, "<span class=\"fudge-glow\">").concat(glowApply, "</span>").concat(glowAfter);
      }

      return output;
    }
    /**
     * Select an option from the dropdown list
     * Or specify a new option to add and select
     *
     * @param option
     */

  }, {
    key: "select",
    value: function select(option) {
      var _option;

      option = (_option = option) !== null && _option !== void 0 ? _option : null;

      if (option === null) {
        // If no option specified, check for the current .fudge-highlighted option
        var highlighted = this.fudge.querySelector('.fudge-highlight');

        if (highlighted !== null) {
          if (highlighted.classList.contains('fudge-adding')) {
            highlighted = this.addOption();
          }

          option = highlighted;
        }
      } else if (typeof option === 'string') {
        // If the new option is a string create or get the corresponding option
        option = this.addOption(option);
      } // Check if there is an option with an empty value


      if (option === false) {
        option = this.fudgeOptions.querySelector("[data-value='']");
      }

      if (option !== null && _typeof(option) === 'object') {
        if (this.mode === 'tags') {
          // Add a tag
          this.addTag(option);
          this.input.value = '';
          this.filter();
          this.input.focus();
          if (this.addedTags === this.opts.taglimit) this.close(true);
        } else {
          // Select the option
          this.selected.innerHTML = option.getAttribute('data-text');
          this.value = option.getAttribute('data-value');
          option.setAttribute('aria-selected', 'true');
          this.fudgeOptions.querySelector('[aria-selected]').removeAttribute('aria-selected');
          this.close();

          if (this.target.value !== this.value) {
            if (this.target.nodeName === 'SELECT') {
              var exists = this.target.querySelector("[value='".concat(this.value, "']"));

              if (this.empty(exists)) {
                this.target.append(this.html("<option value=\"".concat(this.value, "\">").concat(this.value, "</option>")));
              }
            }

            this.target.value = this.value;
            this.triggerEvent(this.target, 'updated');
            this.triggerEvent(this.target, 'input');
          }
        }
      } // Show the placeholder text if needed


      this.setPlaceholder();
    }
    /**
     * Hide an element by adding a 'fudge-hidden' class
     *
     * @param element
     */

  }, {
    key: "hide",
    value: function hide(element) {
      if (!this.empty(element)) element.classList.add('fudge-hidden');
    }
    /**
     * Make an element visible by removing the 'fudge-hidden' class
     *
     * @param element
     */

  }, {
    key: "show",
    value: function show(element) {
      if (!this.empty(element)) element.classList.remove('fudge-hidden');
    }
  }]);

  return Fudge;
}();

/* harmony default export */ const fudge = (Fudge);
;// CONCATENATED MODULE: ./src/index.js


/* harmony default export */ const src = (fudge);
window.Fudge = __webpack_exports__;
/******/ })()
;