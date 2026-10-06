(function () {
	'use strict';

	// Links set to #ub-login / #ub-join (in the header or in Elementor buttons)
	// point to the member app configured in the Customizer.
	var appUrl = (window.ubTheme && window.ubTheme.appUrl) || '';
	if (appUrl) {
		var targets = { '#ub-login': '/login', '#ub-join': '/onboarding' };
		document.querySelectorAll('a[href="#ub-login"], a[href="#ub-join"]').forEach(function (link) {
			link.setAttribute('href', appUrl + targets[link.getAttribute('href')]);
		});
	}

	// Mobile menu toggle.
	var toggle = document.querySelector('.ub-menu-toggle');
	var nav = document.getElementById('ub-nav');
	if (toggle && nav) {
		toggle.addEventListener('click', function () {
			var open = nav.classList.toggle('is-open');
			toggle.setAttribute('aria-expanded', open ? 'true' : 'false');
		});
	}
})();
