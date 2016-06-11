// any page with a form

/**
 * Format Input
 * e.g. change 04182016 to 04/18/2016
 */
ads.formFunctions = {
	autogrow: {
		el: document.querySelectorAll(".js-textarea-grow"),
		resizeTA: function (e) {
			var el = this,
				className = "js-text-autosubmit",
				includeEnterSubmit = (el.classList) ? el.classList.contains(className) : new RegExp('(^| )' + className + '( |$)', 'gi').test(el.className);

			setTimeout(function () {
				el.style.cssText = "height: auto;";
				// for box-sizing other than "content-box" use:
				// el.style.cssText = '-moz-box-sizing: content-box';
				el.style.cssText = "height:" + el.scrollHeight + "px";
			}, 0);

		},
		init: function () {
			Array.prototype.forEach.call(this.el, function (el, i) {
				ads.formFunctions.autogrow.el[i].addEventListener("keydown", ads.formFunctions.autogrow.resizeTA);
			});
		}
	},
	disableStates: function () {

	},
	datepickers: {
		_pickers: Array.prototype.map.call(document.querySelectorAll('.c-datepicker'), function (pickerElm, i) {
			return {
				element: pickerElm
			};
		}),
		checkTheme: function (elem, theme) {
			Array.prototype.forEach.call(elem.classList, function (className, i) {
				if (className.search('t-') >= 0) {
					theme = className;
				}
			});
			return theme || null;
		},
		loadPickers: function () {
			this._pickers.map(function (p, i) {

				var config = {
					field: p.element,
					format: 'MM/DD/YYYY',
					firstDay: 1,
					showDaysInNextAndPreviousMonths: true,
					theme: ads.formFunctions.datepickers.checkTheme(p.element)
				};

				p.picker = p.picker || new Pikaday(config);

				return p;
			});
			return this._pickers;
		},
		getSoloPickers: function (p) {
			var parent = p.element.offsetParent;
			if (parent) {
				return (!parent.classList.contains('datepicker-start__input') && !parent.classList.contains('datepicker-end__input'))
			} else {
				return true;
			}
		},
		getRangePickers: function (p) {
			var parent = p.element.offsetParent;
			if (parent) {
				return (parent.classList.contains('datepicker-start__input') || parent.classList.contains('datepicker-end__input'))
			} else {
				return true;
			}
		},
		filterRangePickers: function () {
			var rangedPickers = this._pickers.filter(this.getRangePickers);

			if ((rangedPickers.length > 0) && (rangedPickers.length % 2 == 0)) {
				return rangedPickers.map(function (p, i) {
					if ((i + 1) % 2) {
						return {
							start: p,
							end: rangedPickers[i + 1]
						};
					}
					return false;
				}).filter(function (p) {
					return p;
				});
			}

			if ((rangedPickers.length > 0)) {
				// console.log('Ranged pickers markup may be incorrect, or missing a start/end input');
			}
			return rangedPickers;
		},
		init: function () {
			this.loadPickers();
			this.rangePickers = this.filterRangePickers();
			this.rangePickers = this.rangePickers.map(function (p) {
				p.start.picker._o.onSelect = function () {
					startDate = this.getDate();
					updateStartDate();
				};
				p.end.picker._o.onSelect = function () {
					endDate = this.getDate();
					updateEndDate();
				};
				var startDate,
					endDate,
					startPicker = p.start.picker,
					endPicker = p.end.picker,
					updateStartDate = function () {
						startPicker.setStartRange(startDate);
						endPicker.setStartRange(startDate);
						endPicker.setMinDate(startDate);
					},
					updateEndDate = function () {
						startPicker.setEndRange(endDate);
						startPicker.setMaxDate(endDate);
						endPicker.setEndRange(endDate);
					},
					_startDate = startPicker.getDate(),
					_endDate = endPicker.getDate();
				if (_startDate) {
					startDate = _startDate;
					updateStartDate();
				}
				if (_endDate) {
					endDate = _endDate;
					updateEndDate();
				}
				return p;
			});

			this.pickers = this._pickers.filter(this.getSoloPickers);

			return this._pickers;
		}
	},
	autocomplete: {
		defaultCB: function (obj) {
			obj = obj || ['Lorem ipsum #1', 'Lorem ipsum #2', 'Lorem ipsum #3', 'Lorem ipsum #4', 'Lorem ipsum #5', 'Lorem ipsum #6'];

			return obj;
		},
		inputs: [],
		addAutocompleteListeners: function (input) {
			input.element.addEventListener('keyup', function (e) {

				input.results.list = input.cb();

				var $e = $(e.target);
				if (e.target.value.length >= 3) {
					$e.addClass('js-typing');
					// the 1 below is to account for the default styles current border thickness
					var resultsList = input.results.list.filter(function (result, i) {

						if (result.toLowerCase().replace(/\s+/g, '').indexOf(e.target.value.toLowerCase().replace(/\s+/g, '')) >= 0) {
							return result;
						}

					});

					var top = 1 + e.target.offsetHeight + e.target.offsetTop - parseInt(window.getComputedStyle(e.target, null).getPropertyValue('padding-top'), 10),
						width = e.target.offsetWidth;
					$(input.results.element).attr("style", "top: " + top + "px;width: " + width + "px;");

					var $html = resultsList.map(function (result, i) {
						if (i < 4) {
							return '<li class="c-autocomplete-list__item"><a href="#" class="c-autocomplete-list__link">' + result + '</a></li>';
						}
						return '';
					}).join('');
					$(input.results.element).html($html);
					$('.c-autocomplete-list__item').on('click', '.c-autocomplete-list__link', function (e) {
						$e[0].value = $(this).text();
						e.preventDefault();
					});

				} else {
					$e.removeClass('js-typing');
					$(input.results.element).empty();

				}

				input.results.list = resultsList;

			});

			return input;
		},
		init: function () {

			this.inputs = Array.prototype.map.call(document.querySelectorAll('.js-autocomplete'), function (el, i) {
				return {
					element: el
				}
			}).map(function (ac) {
				var $results = ($(ac.element).next().hasClass('js-autocomplete')) ? $(ac.element).next() : $(ac.element).after('<ul class="c-autocomplete-list"></ul>');
				$results = $(ac.element).next();

				// console.log(ac.element.getAttribute('data-autocompletecb'));
				return {
					element: ac.element,
					cb: window[ac.element.getAttribute('data-autocompletecb')] || ads.formFunctions.autocomplete.defaultCB,
					results: {
						element: $results[0],
						list: []
					}
				};
			}).map(function (ac) {
				ac = ads.formFunctions.autocomplete.addAutocompleteListeners(ac);
				return ac;
			});
		}
	},
	inputEvents: {
		dateFormat: function (el) {
			el = el || $(".js-format-date");

			// Masking MM/DD/YYYY
			el.mask("00/00/0000");
		},
		telephoneForm: function (el) {
			el = el || $(".js-format-phone");

			// Masking Phone
			el.mask("000-000-0000");
		},
		moneyFormat: function (el) {
			el = el || $(".js-format-money");

			// Masking money values
			el.mask("00,000.00", {
				reverse: true
			});
		},
		accountNumberFormat: function (el) {
			el = el || $(".js-format-account");

			// Masking Account
			el.mask("0000-0000-0000");
		},
		init: function () {
			this.dateFormat();
			this.telephoneForm();
			this.moneyFormat();
			this.accountNumberFormat();
		}
	},
	warnBeforeLeave: {
		theAlert: function (msg) {
			window.addEventListener("beforeunload", function (e) {
				(e || window.event).returnValue = msg;
				return msg;
			});
		},
		init: function () {
			this.theAlert("If you leave before saving, your changes will be lost.");
		}
	},
	init: function () {
		// Form masking events
		this.inputEvents.init();

		// Load all autocomplete inputs
		this.autocomplete.init();

		// JS-form elements init
		this.datepickers.init();

		// textarea autogrow
		this.autogrow.init();

		// fix for styled select boxes
		this.disableStates();

		// Warn users if they've edited a field but didn't save
		// this.warnBeforeLeave.init();
	}
};
