ads.modal = {
	closeDom: '<div class="o-container"><div class="o-container__wrap o-container-full"><button class="mfp-close u-size-cta u-fs-4 u-a-c u-round u-a-vh-before u-glyph-before u-glyph-before--animate c-button c-button--alpha c-anchor c-anchor--primary" data-icon="x" title="%title%"><span class="u-vis-0">Close</span></button></div></div>',
	dom: function (dom, el) {
		var selector = el || $(".js-popup-dom");

		selector.magnificPopup({
			closeMarkup: ads.modal.closeDom,
			items: {
				src: dom,
				type: "inline"
			}
		});
	},
	dom2: function () {
		$(".js-popup[data-dom]").each(function () {
			var cta = $(this);

			cta.on("click", function (e) {
				e.preventDefault();
			});

			cta.magnificPopup({
				closeMarkup: ads.modal.closeDom,
				items: {
					src: $(cta.data("dom")).html(),
					type: "inline"
				}
			});
		});
	},
	linkVersion: function (el) {
		var selector = el || $(".js-popup-link");
		selector.magnificPopup({
			type: "ajax",
			closeMarkup: ads.modal.closeDom
		});
	},
	init: function () {
		this.dom();
		this.dom2();
		this.linkVersion();
	}
};
