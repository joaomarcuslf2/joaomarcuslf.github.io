angular
	.module('joaomarcuslfWebApp')
	.controller('flowController', ['$scope', '$rootScope', '$location', 'titleService', ($scope, $rootScope, $location, $titleService) => {
	  let setHide = () => {
	  	$scope.home = false;
	  	$scope.about = false;
	  	$scope.portfolio = false;
	  	$scope.error = false;


	  	//jquery had to be called to close collapse bar
	  	$('.navbar-collapse').collapse('hide');
	  };

	  $rootScope.$on("$locationChangeStart", (event, next, current) => {
	  	setHide();

			switch($location.$$path) {
				case '/home':
					$scope.home = true;
					$titleService.setTitle('Home');
					break;
				case '/about':
					$scope.about = true;    			
					$titleService.setTitle('About');
					break;
				case '/portfolio':
					$scope.portfolio = true;
					$titleService.setTitle('Portfolio');
					break;
				default:
					$scope.error = true;
					$titleService.setTitle('404');
					break;
			}
		});
	}]);