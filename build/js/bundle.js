/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};

/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {

/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;

/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};

/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);

/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;

/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}


/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;

/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;

/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "/build/js";

/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = __webpack_require__(1);


/***/ },
/* 1 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	__webpack_require__(2);

	var _portfolio = __webpack_require__(3);

	var _portfolio2 = _interopRequireDefault(_portfolio);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function closeNavigation() {
			var navigation = document.querySelector('.navigation');
			var openNavBtn = document.querySelector('.open-nav-btn');
			var overlay = document.querySelector('#overlay');
			var appContainer = document.getElementById('appContainer');

			navigation.className = navigation.className.split(' open-nav').join('');
			openNavBtn.className = openNavBtn.className.split(' is-open').join('');
			appContainer.className = 'open';
			overlay.className = '';
	}

	function toggleSideBarMenu() {
			var appContainer = document.getElementById('appContainer');

			if (appContainer.className === 'open') {
					appContainer.className = '';
			} else {
					appContainer.className = 'open';
			}
	}

	function toggleNavigation() {
			var navigation = document.querySelector('.navigation');
			var openNavBtn = document.querySelector('.open-nav-btn');
			var overlay = document.querySelector('#overlay');
			var appContainer = document.getElementById('appContainer');

			if (navigation.className.includes('open-nav')) {
					closeNavigation();
			} else {
					navigation.className += ' open-nav';
					openNavBtn.className += ' is-open';
					overlay.className = 'open overlay open-overlay no-overflow';
					appContainer.className += ' ' + overlay.className;

					openNavBtn.blur();
			}
	}

	document.querySelector('.open-btn').addEventListener('click', toggleSideBarMenu, false);

	document.querySelector('.open-nav-btn').addEventListener('click', toggleNavigation, false);

	document.querySelector('#overlay').addEventListener('click', closeNavigation, false);

	document.querySelectorAll('.link-item').forEach(function (element) {
			return element.addEventListener('click', closeNavigation, false);
	});

	var portfolioContainer = document.querySelector('.portfolio-container');

	_portfolio2.default.items.map(function (item) {
			var img = document.createElement('img');
			var figure = document.createElement('figure');
			var label = document.createElement('h2');
			var p = document.createElement('p');
			var referenceLink = document.createElement('a');

			img.src = '/build/img/portfolio/' + item.img;
			figure.className = 'image is-16by9 portfolio-image';
			p.className = 'panel-block';
			label.innerText = item.label;
			referenceLink.href = item.link;
			referenceLink.className = 'button is-primary is-outlined is-medium	is-fullwidth';

			figure.append(img);
			referenceLink.append(label);
			p.append(referenceLink);
			p.append(figure);

			portfolioContainer.append(p);
	});

/***/ },
/* 2 */
/***/ function(module, exports) {

	'use strict';

	if (!Array.prototype.map) {
			Array.prototype.map = function (callback, thisArg) {
					var T = void 0,
					    A = void 0,
					    k = void 0;
					if (this == null) {
							throw new TypeError(' this is null or not defined');
					}
					var O = Object(this);
					var len = O.length >>> 0;
					if (typeof callback !== 'function') {
							throw new TypeError(callback + ' is not a function');
					}
					if (arguments.length > 1) {
							T = thisArg;
					}
					A = new Array(len);
					k = 0;
					while (k < len) {
							var kValue = void 0,
							    mappedValue = void 0;
							if (k in O) {
									kValue = O[k];
									mappedValue = callback.call(T, kValue, k, O);
									A[k] = mappedValue;
							}
							k++;
					}

					return A;
			};
	}

	if (!Array.prototype.forEach) {
			Array.prototype.forEach = function (fn, scope) {
					for (var i = 0, len = this.length; i < len; ++i) {
							fn.call(scope, this[i], i, this);
					}
			};
	}

	if (!NodeList.prototype.forEach) {
			NodeList.prototype.forEach = Array.prototype.forEach;
	}

	if (!Element.prototype.append) {
			Element.prototype.append = Element.prototype.appendChild;
	}

/***/ },
/* 3 */
/***/ function(module, exports) {

	module.exports = {
		"items": [
			{
				"img": "react-layout-test.jpeg",
				"label": "React Layout test",
				"link": "https://github.com/joaomarcuslf/react-layout-test",
				"description": "React layout using Flux arch, and ITCSS with flexbox and SCSS for responsive layout"
			},
			{
				"img": "github-react-api.jpeg",
				"label": "Githup React API",
				"link": "https://github.com/joaomarcuslf/github-react-api",
				"description": "React Client consuming the Github API using Flux arch, ITCSS, Flexbox and tests with Mocha"
			},
			{
				"img": "banner-alien.jpeg",
				"label": "OuterWorldCodes",
				"link": "https://github.com/joaomarcuslf/my-personal-webapp",
				"description": "Personal Web application using Rails and CSS trasitions"
			},
			{
				"img": "fastformater.png",
				"label": "FastFormater Gem",
				"link": "https://github.com/joaomarcuslf/fast_formater",
				"description": "Simple Json and XML formatter made with Ruby"
			},
			{
				"img": "fileminer.png",
				"label": "FileMiner",
				"link": "https://github.com/joaomarcuslf/file-mining",
				"description": "File reader and fetcher using Ruby and Rspec"
			},
			{
				"img": "gemlist.png",
				"label": "Gem List",
				"link": "https://github.com/joaomarcuslf/data_struct_list",
				"description": "Data-structure implemantation using Ruby and Rspec"
			},
			{
				"img": "hellslist.png",
				"label": "Hell's list",
				"link": "https://github.com/joaomarcuslf/sexta-feira-13",
				"description": "Complex dynamic allocation data-structure project made with C"
			},
			{
				"img": "todoapp.png",
				"label": "Todo App",
				"link": "https://github.com/joaomarcuslf/my-todo-list",
				"description": "Simple Todo List made with Rails"
			}
		]
	};

/***/ }
/******/ ]);