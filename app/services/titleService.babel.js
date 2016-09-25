angular
	.module('joaomarcuslfWebApp')
	.factory('titleService', ['$rootScope', ($rootScope) => {
	  let _setTitle = (title) => {
	  	$rootScope.pageTitle = "@joaomarcuslf - " + title;
	  };

	  return {
	  	setTitle: _setTitle
	  };
	}]);