// every page - used in nav

ads.toggleState = {
	getHeight: function (el) {
		el = el || this.elAnimate;

		el.each(function () {
			var contentContainer = $(this),
				height = contentContainer.children().height();

			contentContainer.attr("data-height", height).css("max-height", height);
		});
	},
	toggle: function (cta, stateOverride) {
		var state = stateOverride || ((cta.attr("data-state") === "open") ? "closed" : "open");

		// console.log(state);
		cta.attr("data-state", state);
	},
	toggleAll: function (ctas, action) {
		if (action) {
			ads.toggleState.toggle(ctas, action);
		} else {
			this.el.each(function () {
				ads.toggleState.toggle($(this));
			});
		}
	},
	bindClick: function () {
		this.el.on("click", function (e) {
			ads.toggleState.toggle($(this));

			e.preventDefault();
		});

		this.elChild.on("click", function (e) {
			ads.toggleState.toggle($(this).parent());
			e.preventDefault();
		});

		this.elAll.on("click", function (e) {
			ads.toggleState.toggleAll(ads.toggleState.el);

			e.preventDefault();
		});

		this.elAllOpen.on("click", function (e) {
			ads.toggleState.toggleAll(ads.toggleState.el, "open");

			e.preventDefault();
		});

		this.elAllClose.on("click", function (e) {
			ads.toggleState.toggleAll(ads.toggleState.el, "closed");

			e.preventDefault();
		});
	},
	resize: function () {
		$(window).smartresize(function () {
			ads.toggleState.getHeight();
		});
	},
	contentToggle: {
		el: $(".js-toggle-content"),
		contentEl: $(".js-toggle-content-details"),
		closeMarkup: '<div class="u-dis-b@large u-dis-none@small js-toggle-content-details__close"><button class="u-size-cta u-fs-4 u-a-c u-round u-a-vh-before u-glyph-before u-glyph-before--animate c-button c-button--alpha c-anchor c-anchor--light-alt" data-icon="x" title="Close"><span class="u-vis-0">Close</span></button></div>',
		addCloseBtns: function (el) {
			el = el || this.contentEl;
			el.each(function () {
				$(this).append(ads.toggleState.contentToggle.closeMarkup);
			});

			$(".js-toggle-content-details__close").on("click", function () {
				ads.toggleState.toggleAll(ads.toggleState.contentToggle.el, "closed");

				if (ads.checkIE.isIE10) {
					$("._ieFix").removeClass("_ieFix-show");
				}
			});
		},
		bindClick: function () {

			this.el.on("click", function (e) {
				var cta = $(this),
					currentState = cta.attr("data-state");

				if (currentState == "open") {
					ads.toggleState.toggleAll(ads.toggleState.contentToggle.el, "closed");

					if (ads.checkIE.isIE10) {
						$("._ieFix").removeClass("_ieFix-show");
					}
				} else {
					// close siblings
					ads.toggleState.toggleAll(ads.toggleState.contentToggle.el, "closed");

					// expand item
					ads.toggleState.toggle(cta);
				}

				e.preventDefault();
			});
		},
		init: function () {
			if (this.contentEl.length) {
				this.addCloseBtns();
				this.bindClick();
			}
		}
	},
	unbindClick: function () {
		this.el.off("click");
		this.elAll.off("click");
	},
	init: function () {
		this.el = $(".js-toggle-state");
		this.elChild = $(".js-toggle-state-child");
		this.elAll = $(".js-toggle-state-all");
		this.elAllOpen = $(".js-toggle-state-all-open");
		this.elAllClose = $(".js-toggle-state-all-close");
		this.elAnimate = $(".c-toggle__content--animate");

		if (this.el.length || this.contentToggle.el.length || this.elChild.length) {
			this.getHeight();
			this.resize();
			this.contentToggle.init();
			this.bindClick();
		}
	}
};
