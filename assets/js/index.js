import 'whatwg-fetch';

function closeNavigation() {
	let navigation = document.querySelector('.navigation');
	let openNavBtn = document.querySelector('.open-nav-btn');
	let overlay = document.querySelector('#overlay');
	let appContainer = document.getElementById('appContainer');

	navigation.className = navigation.className.split(' open-nav').join('');
	openNavBtn.className = openNavBtn.className.split(' is-open').join('');
	appContainer.className = 'open';
	overlay.className = '';
}

function toggleSideBarMenu() {
	let appContainer = document.getElementById('appContainer');

	if (appContainer.className === 'open') {
		appContainer.className = '';
	} else {
		appContainer.className = 'open';
	}
}

function toggleNavigation() {
	let navigation = document.querySelector('.navigation');
	let openNavBtn = document.querySelector('.open-nav-btn');
	let overlay = document.querySelector('#overlay');
	let appContainer = document.getElementById('appContainer');

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

document
	.querySelector('.open-btn')
	.addEventListener('click', toggleSideBarMenu, false);


document
	.querySelector('.open-nav-btn')
	.addEventListener('click', toggleNavigation, false);

document
	.querySelector('#overlay')
	.addEventListener('click', closeNavigation, false);

document
	.querySelectorAll('.link-item')
	.forEach((element) => element.addEventListener('click', closeNavigation, false));

import portfolioItens from './portfolio.json';
let portfolioContainer = document.querySelector('.portfolio-container');


portfolioItens.items.map((item) => {
	let img = document.createElement('img');
	let figure = document.createElement('figure');
	let label = document.createElement('h2');
	let p = document.createElement('p');
	let referenceLink = document.createElement('a');

	img.src = '/build/img/portfolio/' + item.img;
	figure.className = 'image is-16by9 portfolio-image';
	p.className = 'panel-block';
	label.innerText = item.label;
	referenceLink.href = item.link;
	referenceLink.className = 'button is-primary is-outlined is-medium	is-fullwidth';

	figure.append(img);
	referenceLink.append(label);
	p.append(referenceLink, figure);

	portfolioContainer.append(p);
});
