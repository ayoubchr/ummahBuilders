(function () {
	'use strict';

	var T = window.UB_TRANSLATIONS;
	var LANGS = ['nl', 'en', 'fr', 'ar'];
	var RTL = { ar: true };

	// Look up "pillars.0.1" style keys in a language object.
	function lookup(obj, key) {
		return key.split('.').reduce(function (o, k) { return o == null ? o : o[k]; }, obj);
	}

	function initialLang() {
		var fromUrl = new URLSearchParams(location.search).get('lang');
		if (LANGS.indexOf(fromUrl) !== -1) return fromUrl;
		try {
			var stored = localStorage.getItem('ub_lang');
			if (LANGS.indexOf(stored) !== -1) return stored;
		} catch (e) {}
		var browser = (navigator.language || 'nl').slice(0, 2).toLowerCase();
		return LANGS.indexOf(browser) !== -1 ? browser : 'nl';
	}

	function apply(lang) {
		var t = T[lang];
		var root = document.documentElement;
		root.lang = lang;
		root.dir = RTL[lang] ? 'rtl' : 'ltr';

		document.querySelectorAll('[data-i18n]').forEach(function (el) {
			var value = lookup(t, el.getAttribute('data-i18n'));
			if (value != null) el.innerHTML = value;
		});
		document.querySelectorAll('[data-i18n-attr]').forEach(function (el) {
			var parts = el.getAttribute('data-i18n-attr').split(':');
			var value = lookup(t, parts[1]);
			if (value != null) el.setAttribute(parts[0], value);
		});
		document.querySelectorAll('[data-lang]').forEach(function (btn) {
			btn.setAttribute('aria-pressed', btn.getAttribute('data-lang') === lang ? 'true' : 'false');
		});

		try { localStorage.setItem('ub_lang', lang); } catch (e) {}
		var url = new URL(location.href);
		if (lang === 'nl') url.searchParams.delete('lang'); else url.searchParams.set('lang', lang);
		history.replaceState(null, '', url);
	}

	document.querySelectorAll('[data-lang]').forEach(function (btn) {
		btn.addEventListener('click', function () { apply(btn.getAttribute('data-lang')); });
	});

	// Mobile menu.
	var toggle = document.querySelector('.menu-toggle');
	var nav = document.getElementById('nav');
	toggle.addEventListener('click', function () {
		var open = nav.classList.toggle('is-open');
		toggle.setAttribute('aria-expanded', open ? 'true' : 'false');
	});
	nav.addEventListener('click', function (e) {
		if (e.target.tagName === 'A') {
			nav.classList.remove('is-open');
			toggle.setAttribute('aria-expanded', 'false');
		}
	});

	document.getElementById('year').textContent = new Date().getFullYear();
	apply(initialLang());
})();
