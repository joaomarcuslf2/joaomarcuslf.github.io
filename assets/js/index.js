import './pollyfils';

const closeNavigation = () => {
  const navigation = document.querySelector('.navigation');
  const openNavBtn = document.querySelector('.open-nav-btn');
  const overlay = document.querySelector('#overlay');
  const appContainer = document.getElementById('appContainer');

  navigation.className = navigation
    .className
    .split(' open-nav')
    .join('');
  openNavBtn.className = openNavBtn
    .className
    .split(' is-open')
    .join('');
  appContainer.className = 'open';
  overlay.className = '';
};

const toggleSideBarMenu = () => {
  const appContainer = document.getElementById('appContainer');

  if (appContainer.className === 'open') {
    appContainer.className = '';
  } else {
    appContainer.className = 'open';
  }
};

const toggleNavigation = () => {
  const navigation = document.querySelector('.navigation');
  const openNavBtn = document.querySelector('.open-nav-btn');
  const overlay = document.querySelector('#overlay');
  const appContainer = document.getElementById('appContainer');

  if (navigation.className.includes('open-nav')) {
    closeNavigation();
  } else {
    navigation.className += ' open-nav';
    openNavBtn.className += ' is-open';
    overlay.className = 'open overlay open-overlay no-overflow';
    appContainer.className += ` ${overlay.className}`;

    openNavBtn.blur();
  }
};

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
  .forEach(element => element.addEventListener('click', closeNavigation, false));
