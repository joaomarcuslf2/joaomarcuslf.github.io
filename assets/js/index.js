var toggleSideBarMenu = function () {
  document.getElementById('appContainer').className.toggle('open');
};

var toggleNavigation = function () {
  document.querySelector('.navigation').className.toggle(' open-nav');
  document.querySelector('.open-nav-btn').className.toggle(' is-open');
  document.getElementById('overlay').className.toggle('open overlay open-overlay no-overflow');
  document.getElementById('appContainer').className.toggle('open');
};

document
  .querySelector('.open-btn')
  .addEventListener('click', toggleSideBarMenu, false);

document
  .querySelector('.open-nav-btn')
  .addEventListener('click', toggleNavigation, false);

document
  .querySelector('#overlay')
  .addEventListener('click', toggleNavigation, false);

var linkItem = document.querySelectorAll('.link-item');

for (var i = 0; i < linkItem.length; i++) {
  linkItem[i].addEventListener('click', toggleNavigation, false);
}
