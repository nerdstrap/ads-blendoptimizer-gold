ads.myaccount = {
	init: function () {
		ads.myaccount.manageMyFamily.init();
	}
};

ads.myaccount.manageMyFamily = {
	button: $(".js-manage-my-family-btn"),
	inputs: $(".js-toggleCheckbox__input"),
	checkbox: $(".js-toggleCheckbox").find(".c-checkbox__input"),
	clickEvent: function () {
		this.checkbox.on("change", function () {
			if (!$(".js-toggleCheckbox").find(".c-checkbox__input:checked").length) {
				ads.myaccount.manageMyFamily.button.attr("disabled", "disabled");
			} else {
				ads.myaccount.manageMyFamily.toggleDisabled();
			}
		});
	},
	checkIfValuesExist: function () {
		this.hasValues = "";

		$(".js-toggleCheckbox__input").each(function () {
			if ($(this).attr("disabled") != "disabled") {
				ads.myaccount.manageMyFamily.hasValues += $(this).val();
			}
		});

		return (this.hasValues != "");
	},
	toggleDisabled: function () {
		if (ads.myaccount.manageMyFamily.checkIfValuesExist()) {
			ads.myaccount.manageMyFamily.button.removeAttr("disabled");
		} else {
			ads.myaccount.manageMyFamily.button.attr("disabled", "disabled");
		}
	},
	checkDisabled: function () {
		this.inputs.on("change", function () {
			ads.myaccount.manageMyFamily.checkIfValuesExist();
			ads.myaccount.manageMyFamily.toggleDisabled();
		});
	},
	init: function () {
		if (this.button.length && ads.formFunctions.checkboxToggleSection.el.length) {
			this.checkDisabled();
			this.clickEvent();
		}
	}
};
