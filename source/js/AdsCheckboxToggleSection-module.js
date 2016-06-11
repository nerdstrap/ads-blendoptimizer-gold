ads.formFunctions.checkboxToggleSection = {
	el: $(".js-toggleCheckbox"),
	toggleSection: function () {
		this.el.find("[type=\"checkbox\"]").on("change", function () {
			var checkbox = $(this),
				parentContainer = checkbox.parent().parent().parent().parent(),
				state = (parentContainer.attr("data-state") == "closed") ? "open" : "closed",
				input = parentContainer.parent().find(".js-toggleCheckbox__input");

			// Toggle to show input field
			parentContainer.attr("data-state", state);

			// Toggle to enable input field for email address
			if (state == "open") {
				input.removeAttr("disabled");

				input.focus();
			} else {
				input.attr("disabled", "disabled")
			}
		});
	},
	init: function () {
		if (this.el.length) {
			this.toggleSection();
		}
	}
};
