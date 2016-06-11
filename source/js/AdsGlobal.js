/*! v0.5.1 || 2016-05-23 2:14PM EST */

// Use on every page

"use strict";

// Global Namespace
var w = window;
var $w = $(w);
var d = document;
var $d = $(document);
var e = d.documentElement;
var b = d.getElementsByTagName("body")[0];
var $b = $(b);
var ads = w.ads || {};
ads.b = $b;

ads.htmlElm = $("html");
ads.bodyElm = $b;
ads.documentElm = d;
ads.mainElm = $("#main");


var doc = document.documentElement;
doc.setAttribute('data-useragent', navigator.userAgent);
ads.checkIE = function () {
	var isIE10 = false;
	/*@cc_on
	 if (/^10/.test(@_jscript_version)) {
	 isIE10 = true;
	 }
	 @*/

	ads.checkIE.isIE10 = isIE10;
};


/**
 * Enquire
 - Extended functionality of matchMedia()
 - Used to add "primary nav" into "hamburger" menu on mobile and remove on desktop
 */

ads.enquire = {
	isMobile: false,
	isDesktop: false,
	resize: function () {
		(function ($, sr) {

			// debouncing function from John Hann
			// http://unscriptable.com/index.php/2009/03/20/debouncing-javascript-methods/
			var debounce = function (func, threshold, execAsap) {
				var timeout;

				return function debounced() {
					var obj = this, args = arguments;

					function delayed() {
						if (!execAsap)
							func.apply(obj, args);
						timeout = null;
					}

					if (timeout)
						clearTimeout(timeout);
					else if (execAsap)
						func.apply(obj, args);

					timeout = setTimeout(delayed, threshold || 100);
				};
			};
			// smartresize
			jQuery.fn[sr] = function (fn) {
				return fn ? this.bind('resize', debounce(fn)) : this.trigger(sr);
			};

		})(jQuery, 'smartresize');
	},
	desktopToMobile: function () {
		// update value to align with `$bp-header` in "_00-settings_bps.scss"
		enquire.register("screen and (min-width: 764px)", {
			match: function () {
				// global accessible screenview
				ads.enquire.isMobile = false;
				ads.enquire.isDesktop = true;
				ads.enquire.currentView = "desktop";

				// Set global var to either "mobile" || "desktop"
				if (!ads.enquire.startType) {
					ads.enquire.startType = "desktop";
				}

				// Remove "contextual nav" DOM from "hamburger" menu
				if (ads.navigation.contextNavigation.exists && ads.navigation.contextNavigation.injected) {
					ads.navigation.contextNavigation.removeDom();
				}

				// console.log("Desktop match!");
			},
			unmatch: function () {
				// global accessible screenview
				ads.enquire.isMobile = true;
				ads.enquire.isDesktop = false;
				ads.enquire.currentView = "mobile";

				// Add "contextual nav" menu into "hamburger" menu
				if (ads.navigation.contextNavigation.exists && !ads.navigation.contextNavigation.injected) {
					ads.navigation.contextNavigation.injectDom();
				}
			}
		});
	},
	mobileToDesktop: function () {
		// update value to align with `$bp-header` in "_00-settings_bps.scss"
		enquire.register("screen and (max-width: 764px)", {
			unmatch: function () {
				// global accessible screenview
				ads.enquire.isMobile = false;
				ads.enquire.isDesktop = true;
				ads.enquire.currentView = "desktop";

				// Remove "contextual nav" DOM from "hamburger" menu
				if (ads.navigation.contextNavigation.exists && ads.navigation.contextNavigation.injected) {
					ads.navigation.contextNavigation.removeDom();
				}

				ads.navigation.mobileNav.toggleToFalse();

				// Close nav to prevent hiccups when DOM manipulations occurs
				ads.navigation.mobileNav.toggleToFalse();
			},
			match: function () {
				// global accessible screenview
				ads.enquire.isMobile = true;
				ads.enquire.isDesktop = false;
				ads.enquire.currentView = "mobile";

				// Set global var to either "mobile" || "desktop"
				if (!ads.enquire.startType) {
					ads.enquire.startType = "mobile";
				}

				// Add "contextual nav" menu into "hamburger" menu
				if (ads.navigation.contextNavigation.exists && !ads.navigation.contextNavigation.injected) {
					ads.navigation.contextNavigation.injectDom();
				}

				// console.log("Mobile match!");
			}
		});
	},
	init: function () {
		this.desktopToMobile();
		this.mobileToDesktop();
	}
};


/**
 * Navigation Namespace
 */
ads.navigation = {
	el: $(".c-global-nav-container"),
	init: function () {
		// ads.navigation.primaryNav.init();
		ads.navigation.utilityNav.init();
		ads.navigation.mobileNav.init();

		if (ads.navigation.contextNavigation.containerEl.length) {
			ads.navigation.contextNavigation.exists = true;
			ads.navigation.contextNavigation.init();
		}
	}
};


ads.navigation.utilityNav = {
	init: function () {
	}
};

ads.navigation.mobileNav = {
	containerEl: $(".c-secondary-nav"),
	menuContainer: $(".c-secondary-nav__menu__scroll-area"),
	el: $(".js-secondary-nav-toggle"),
	expandedState: false,
	toggleState: function () {
		this.expandedState = (ads.htmlElm.attr("data-menu") !== "open") ? "open" : "closed";
		ads.htmlElm.attr("data-menu", this.expandedState);
		this.el.attr("data-open", this.expandedState);

		// if closed, scroll mobile menu to top
		if (this.expandedState === "closed" && ads.enquire.currentView === "mobile") {
			setTimeout(function () {
				ads.navigation.mobileNav.menuContainer.parent().scrollTop(0);
			}, 100);
		}
	},
	toggleToFalse: function () {
		ads.htmlElm.attr("data-menu", "closed");
		this.el.attr("data-open", "closed");
	},
	unbindClick: function () {
		this.el.off("click");
	},
	bindClick: function () {
		this.el.on("click", function () {
			ads.navigation.mobileNav.toggleState();
		});
	},
	init: function () {
		this.bindClick(); //temporily added
	}
};

// Context Navigation = Inner Page (Sub Navigation) `c-inner-page-nav`
ads.navigation.contextNavigation = {
	containerEl: $(".c-contextual-nav-wrapper"),
	injected: false,
	injectDom: function () {
		// Add "contextual nav" menu into "hamburger" menu
		ads.navigation.el.append(this.dom);
		ads.navigation.contextNavigation.injected = true;
		ads.htmlElm.attr("data-contextualnavdom", "true");

		// console.log("Inject Contextual Nav DOM");
	},
	removeDom: function () {
		// Remove "contextual nav" DOM primary navigation area
		ads.navigation.el.find(".c-contextual-nav").remove();

		ads.navigation.contextNavigation.injected = false;
		ads.htmlElm.attr("data-contextualnavdom", "false");

		// console.log("Remove Contextual Nav DOM");
	},
	cleanDom: function (dom) {
		// this.dom = dom.replace(/c-inner-page-nav__list/g,'c-primary-nav').replace(/c-page-nav/g,'c-nav-cta c-nav-cta--header').replace(/u-space-2-4/g,'u-space-2-4-fixed').replace(/u-space-1-3-sm/g, '');
	},
	init: function () {
		// Store "contextual nav" DOM for "mobile" use

		//this.cleanDom(this.containerEl.html());
		this.dom = this.containerEl.html();
	}
};


// Check support of CSS functionalities
ads.checkSupport = {
	css: function () {
		var support;

		if ('CSS' in window && 'supports' in window.CSS) {
			support = window.CSS.supports('mix-blend-mode', 'soft-light');
			// support = support ? '_mix-blend-mode':'_no-mix-blend-mode';
		}

		if (!support) {
			ads.htmlElm.addClass("_no-mix-blend-mode");
		}
	},
	init: function () {
		this.css();
	}
};


// IE10 fixes
ads.checkIE();

// Smart resize of window
ads.enquire.resize();

// Global navigation
ads.navigation.init();

// Matchmedia and RWD events init
ads.enquire.init();

// Check specific modern browser capabilities
ads.checkSupport.init();

