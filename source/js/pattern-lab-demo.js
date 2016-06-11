// popup modal
ads.modal.init();

// sccordion toggle and global states
ads.toggleState.init();

// form events
ads.formFunctions.init();

// js-form elements init
ads.charts.init();

// toggle sections by checkbox
ads.formFunctions.checkboxToggleSection.init();

// page wizard setup for menu
ads.pageWizard.init();

function top_level_func_for_cb() {
	return ['Lorem ipsum #1', 'Lorem ipsum #2', 'Lorem ipsum #3', 'Lorem ipsum #4', 'Lorem ipsum #5', 'Lorem ipsum #6'];
}

var array = ['Lorm ipsum #1', 'Lorem ipsum #2'];
ads.formFunctions.autocomplete.defaultCB(array);
