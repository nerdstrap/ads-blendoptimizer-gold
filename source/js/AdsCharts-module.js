ads.charts = {
	pieChart: {
		el: $(".js-savings-amount").find(".c-piechart"),
		makePercent: function (el, delay) {
			delay = delay || "1ms";
			setTimeout(function () {
				el.css({"stroke-dasharray": "80, 100", "background": "#333333"});
			}, delay);
		},
		init: function () {
			this.el.each(function () {
				ads.charts.pieChart.makePercent($(this));
			});
		}
	},
	barChart: {
		el: $(".js-bar-chart-amount"),
		makeIntoNum: function (string) {
			return parseFloat(string.replace(/\$/, "").replace(/,/, ""));
		},
		makePercent: function (num1, num2, notToExceed100) {
			var percent = this.makePercentValue(num1, num2);
			notToExceed100 = notToExceed100 || false;
			return ((percent > 100) ? 100 : percent) + "%";
		},
		makePercentValue: function (num1, num2) {
			return (this.makeIntoNum(num1) / this.makeIntoNum(num2)) * 100;
		},
		calcBarWidth: function (el, delay) {
			delay = delay || "1ms";

			setTimeout(function () {
				el.css("max-width", ads.charts.barChart.makePercent(el.attr("data-amount").trim(), el.attr("data-total").trim()));
			}, delay);
		},
		init: function () {
			this.el.each(function () {
				ads.charts.barChart.calcBarWidth($(this));
			});
		}
	},
	init: function () {
		if (ads.charts.barChart.el.length) {
			this.barChart.init();
		}

		if (ads.charts.pieChart.el.length) {
			this.pieChart.init();
		}
	}
};
