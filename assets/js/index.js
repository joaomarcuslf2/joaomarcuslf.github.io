var toggleClass = function (element, className) {
  let classNames = element.className.split(' ');
  let index = classNames.indexOf(className);
  if (index === -1) {
    classNames.push(className);
  } else {
    classNames.splice(index, 1);
  }
  element.className = classNames.filter(item => item !== '').join(' ');
}

var toggleSideBarMenu = function () {
  toggleClass(document.getElementById('appContainer'), 'open')
};

var toggleNavigation = function () {
  toggleClass(document.querySelector('.navigation'), 'open-nav')
  toggleClass(document.querySelector('.open-nav-btn'), 'is-open')
  toggleClass(document.getElementById('appContainer'), 'open')

  var classses = 'open overlay open-overlay no-overflow'.split(' ');
  var overlay = document.getElementById('overlay');

  for (var i = 0; i < classses.length; i++) {
    toggleClass(overlay, classses[i])
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
  .addEventListener('click', toggleNavigation, false);

var linkItem = document.querySelectorAll('.link-item');

for (var i = 0; i < linkItem.length; i++) {
  linkItem[i].addEventListener('click', toggleNavigation, false);
}
