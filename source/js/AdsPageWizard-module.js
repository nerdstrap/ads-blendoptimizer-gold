// Inner Page Widget for Marketing Side
// pages with "side navigtion"

ads.toggleState.pageSections = {
	el: $(".js-page-wizard__content-trigger"),
	bindClick: function () {
		this.el.on("click", function () {
			ads.toggleState.toggle($(this));
		});
	},
	init: function () {
		if (this.el.length) {
			this.bindClick();
		}
	}
};


ads.pageWizard = {
	init: function () {
		ads.pageWizard.enquire.init();
	}
};

ads.pageWizard.mainFnc = {
	el: $(".js-page-wizard"),
	elItem: $(".js-page-wizard__item"),
	elCtaContainer: $(".js-page-wizard__nav"),
	elCta: $(".js-page-wizard__cta"),
	currentItem: (window.location.hash || 0),
	total: 0,
	appendedMenu: false,
	injectedStyles: "@media screen and (min-width:47.75rem) { .c-image-feature:before, .c-image-feature\\@large:before { background-image: url({{src}}) !important; } } @media screen and (max-width:47.75rem) {.c-image-feature:before, .c-image-feature\\@small:before {background-image: url({{src}}) !important;}}",
	pagename: ads.mainElm.data("pagename") || "envisionrx",
	verifyShowFirstIndex: function () {
		if (ads.pageWizard.mainFnc.currentItem != 0) {
			ads.pageWizard.mainFnc.elItem.eq(0).hide();
		}
	},
	clickEvent: function (el) {
		if (ads.enquire.isDesktop) {
			ads.pageWizard.mainFnc.elItem.hide();

			$(el.attr("href")).show();

			ads.pageWizard.mainFnc.currentItem = window.location.hash || 0;

			setTimeout(function () {
				window.scrollTo(0, 0);
			}, 1);

			ads.pageWizard.mainFnc.verifyShowFirstIndex();

			ads.pageWizard.mainFnc.changeBGimage();

			ads.pageWizard.mainFnc.navigateThrough.changeLinks();
		}
	},
	bindClick: function () {
		this.elCta.on("click", function () {
			ads.pageWizard.mainFnc.clickEvent($(this));
		});
	},
	unbindClick: function () {
		this.elCta.off("click");
	},
	hashChanged: function () {
		window.addEventListener("hashchange", function () {

			if (ads.enquire.isDesktop) {
				var windowLocation = window.location,
					hash = windowLocation.hash;

				if (hash == "" || hash == "#") {
					windowLocation.hash = "";
					var url = windowLocation.href;
					windowLocation.href = url.replace("#", "");
					return false;
				}

				ads.pageWizard.mainFnc.elItem.hide();
				$(".js-page-wizard__cta").removeClass("js-page-wizard__cta--active");

				setTimeout(function () {
					window.scrollTo(0, 0);
				}, 1);

				if (!hash) {
					ads.pageWizard.mainFnc.currentItem = 0;
					ads.pageWizard.mainFnc.elItem.eq(0).removeAttr("style");
					ads.mainElm.removeAttr("data-activeitem");
					//ads.mainElm.css("background-image", ads.pageWizard.originalImage);
					// console.log(ads.pageWizard.originalImage);
				} else {
					$(hash).show();
					ads.pageWizard.mainFnc.currentItem = hash;
					ads.pageWizard.mainFnc.changeBGimage();
					ads.pageWizard.mainFnc.navigateThrough.changeLinks();
				}
			}
		});
	},
	removeMenuFromSection: function () {
		// this.elItem.not(":first-child").find(".js-page-wizard__nav").remove();
		this.unbindClick();
		this.elItem.removeAttr("style");
		ads.pageWizard.mainFnc.appendedMenu = false;
	},
	appendMenuToSection: function () {
		// this.elCtaContainer.clone().appendTo(this.elItem.not(":first-child"));
		// this.elCtaContainer.clone().appendTo(this.elItem.eq(0));
		// ads.pageWizard.appendedMenu = true;


		this.keyboardControl();
	},
	changeBGimage: function (src) {
		if (ads.pageWizard.mainFnc.currentItem && !$(ads.pageWizard.mainFnc.currentItem).data("useparentimage")) {
			src = src || "/images/page-image_" + this.pagename + "-" + ads.pageWizard.mainFnc.currentItem.replace(/#/, "") + ".jpg";
			// ads.mainElm.css("background-image", ("url('" + src + "')") );
			ads.mainElm.attr("data-activeitem", ads.pageWizard.mainFnc.currentItem.replace(/#/, ""));


			$("#wizard-styles").remove();
			ads.mainElm.prepend("<style type=\"text/css\" id=\"wizard-styles\">" + ads.pageWizard.mainFnc.injectedStyles.replace(/{{src}}/g, src) + "</style>")
		}
	},
	navigateThrough: {
		hyperlinks: ["#"],
		createStructure: function () {
			var previousDom = "<li class=\"u-size-2 o-tabular__cell\"><a class=\"js-page-wizard-nav__btn js-page-wizard-nav__btn--previous u-dis-ib c-button c-button-default c-anchor c-anchor--secondary\" href=\"#\"><span class=\"u-nw u-glyph-before u-data-title-button\" data-icon=\"(\"><span class=\"u-fs-6 u-vis-0\">previous</span></span></a></li>",
				nextDom = "<li class=\"u-a-r u-size-2 o-tabular__cell\"><a class=\"js-page-wizard-nav__btn js-page-wizard-nav__btn--next u-dis-ib c-button c-button-default c-anchor c-anchor--secondary\" href=\"#\"><span class=\"u-nw u-glyph-after u-data-title-button\" data-icon=\")\"><span class=\"u-fs-6 u-vis-0\">next</span></span></a></li>",
				dom = "<div class=\"js-page-wizard-nav\"><ul class=\"u-unlist o-tabular o-tabular--full\">" + previousDom + nextDom + "</ul></div>";

			ads.pageWizard.mainFnc.elItem.append(dom);
		},
		addLinks: function () {
			ads.pageWizard.mainFnc.elCta.each(function () {
				ads.pageWizard.mainFnc.navigateThrough.hyperlinks.push($(this).attr("href"));
			});

			this.changeLinks();
		},
		changeLinks: function () {
			var getCurrent = function () {
					return (ads.pageWizard.mainFnc.navigateThrough.hyperlinks.indexOf(ads.pageWizard.mainFnc.currentItem) > 0) ? ads.pageWizard.mainFnc.navigateThrough.hyperlinks.indexOf(ads.pageWizard.mainFnc.currentItem) : 0;
				},
				getPrevious = function () {
					return (getCurrent() > 0) ? ads.pageWizard.mainFnc.navigateThrough.hyperlinks[getCurrent() - 1] : "#";

				}, getNext = function () {
					return (getCurrent() < (ads.pageWizard.mainFnc.total - 1)) ? ads.pageWizard.mainFnc.navigateThrough.hyperlinks[getCurrent() + 1] : "#";
				},
				getText = function (id) {
					return (id == "#") ? "Home" : $("[href=" + id + "]").eq(0).text().trim();
				};

			// console.log(ads.pageWizard.currentItem);
			// console.log(ads.pageWizard.total);
			// console.log(ads.pageWizard.navigateThrough.hyperlinks);
			// console.log(getCurrent());
			// console.log(getPrevious());
			// console.log(getNext());

			// console.log(ads.pageWizard.currentItem);

			$(".js-page-wizard__cta[href='" + ads.pageWizard.mainFnc.currentItem + "']").addClass("js-page-wizard__cta--active");

			$(".js-page-wizard-nav__btn--previous").attr({
				"href": getPrevious(),
				"title": getText(getPrevious())
			}).find("span").find("span").html(getText(getPrevious()));
			$(".js-page-wizard-nav__btn--next").attr({
				"href": getNext(),
				"title": getText(getNext())
			}).find("span").find("span").html(getText(getNext())).attr("title", getText(getNext()).trim());
		},

		destroy: function () {
			$(".js-page-wizard__cta").removeClass("js-page-wizard__cta--active");
			$(".js-page-wizard-nav").remove();
			this.hyperlinks = ["#"];
		},
		init: function () {
			this.createStructure();
			this.addLinks();
		}
	},
	destroy: function () {
		if (ads.pageWizard.mainFnc.el.length) {
			this.unbindClick();
			this.removeMenuFromSection();
			ads.pageWizard.mainFnc.navigateThrough.destroy();
		}
	},
	keyboardControl: function () {
		ads.bodyElm.keydown(function (e) {
			var current = (ads.pageWizard.mainFnc.navigateThrough.hyperlinks.indexOf(ads.pageWizard.mainFnc.currentItem) > 0) ? ads.pageWizard.mainFnc.navigateThrough.hyperlinks.indexOf(ads.pageWizard.mainFnc.currentItem) : 0;

			if (e.keyCode == 37 && current != 0) { // left
				document.location = $(".js-page-wizard-nav__btn--previous").attr("href");
			}
			else if (e.keyCode == 39) { // right
				document.location = $(".js-page-wizard-nav__btn--next").attr("href");
			}
		});
	},
	init: function () {
		if (ads.pageWizard.mainFnc.el.length) {
			// store inital
			if (!this.originalImage) {
				this.originalImage = ads.mainElm.css("background-image");
			}

			this.total = this.elItem.size();

			if (ads.enquire.isDesktop && !ads.pageWizard.mainFnc.appendedMenu) {
				if (window.location.hash) {
					setTimeout(function () {
						window.scrollTo(0, 0);
					}, 1);
				}

				this.appendMenuToSection();

				ads.pageWizard.mainFnc.verifyShowFirstIndex();
				this.bindClick();
				this.hashChanged();
				this.changeBGimage();
				this.navigateThrough.init();
			}

		}
	}
};


ads.pageWizard.enquire = {
	desktopToMobile: function () {
		// update value to align with `$bp-header` in "_00-settings_bps.scss"
		enquire.register("screen and (min-width: 764px)", {
			match: function () {
				// Page Wizard setup for menu
				ads.pageWizard.mainFnc.init();
			},
			unmatch: function () {
				// Remove Page Wizard setup for menu
				ads.pageWizard.mainFnc.destroy();
			}
		});
	},
	mobileToDesktop: function () {
		// update value to align with `$bp-header` in "_00-settings_bps.scss"
		enquire.register("screen and (max-width: 764px)", {
			unmatch: function () {
				// Page Wizard setup for menu
				ads.pageWizard.mainFnc.init();
			},
			match: function () {
				// Remove Page Wizard setup for menu
				ads.pageWizard.mainFnc.destroy();
			}
		});
	},
	init: function () {
		this.desktopToMobile();
		this.mobileToDesktop();
	}
};
