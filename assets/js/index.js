import 'whatwg-fetch';

function toggleSideBarMenu() {
	let appContainer = document.getElementById('appContainer');

	if (appContainer.className === 'open') {
		appContainer.className = '';
	} else {
		appContainer.className = 'open';
	}
}

function toggleNavigation() {
	let appContainer = document.querySelector('.navigation');
	let openNavBtn = document.querySelector('.open-nav-btn');

	if (appContainer.className.includes('open-nav')) {
		appContainer.className = appContainer.className.split(' open-nav').join('');
		openNavBtn.className = openNavBtn.className.split(' is-open').join('');
	} else {
		appContainer.className += ' open-nav';
		openNavBtn.className += ' is-open';

		openNavBtn.blur();
	}
}

document
	.querySelector('.open-btn')
	.addEventListener('click', toggleSideBarMenu, false);


document
	.querySelector('.open-nav-btn')
	.addEventListener('click', toggleNavigation, false);