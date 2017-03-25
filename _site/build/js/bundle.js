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

	var closeNavigation = function closeNavigation() {
	  var navigation = document.querySelector('.navigation');
	  var openNavBtn = document.querySelector('.open-nav-btn');
	  var overlay = document.querySelector('#overlay');
	  var appContainer = document.getElementById('appContainer');

	  navigation.className = navigation.className.split(' open-nav').join('');
	  openNavBtn.className = openNavBtn.className.split(' is-open').join('');
	  appContainer.className = 'open';
	  overlay.className = '';
	};

	var toggleSideBarMenu = function toggleSideBarMenu() {
	  var appContainer = document.getElementById('appContainer');

	  if (appContainer.className === 'open') {
	    appContainer.className = '';
	  } else {
	    appContainer.className = 'open';
	  }
	};

	var toggleNavigation = function toggleNavigation() {
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
	};

	document.querySelector('.open-btn').addEventListener('click', toggleSideBarMenu, false);

	document.querySelector('.open-nav-btn').addEventListener('click', toggleNavigation, false);

	document.querySelector('#overlay').addEventListener('click', closeNavigation, false);

	document.querySelectorAll('.link-item').forEach(function (element) {
	  return element.addEventListener('click', closeNavigation, false);
	});

/***/ },
/* 2 */
/***/ function(module, exports) {

	'use strict';

	/* eslint no-tabs: 0 */
	/* eslint indent: 0 */
	/* eslint no-undef: 0 */
	/* eslint no-plusplus: 0 */
	/* eslint prefer-template: 0 */
	/* eslint prefer-const: 0 */
	/* eslint one-var: 0 */
	/* eslint no-extend-native: 0 */
	/* eslint func-names: 0 */
	/* eslint one-var-declaration-per-line: 0 */
	/* eslint no-bitwise: 0 */
	/* eslint space-in-parens: 0 */
	/* eslint keyword-spacing: 0 */
	/* eslint space-before-function-paren: 0 */

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

/***/ }
/******/ ]);