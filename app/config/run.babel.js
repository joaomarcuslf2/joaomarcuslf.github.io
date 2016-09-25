angular
	.module('joaomarcuslfWebApp')
	.run(['$rootScope', '$location',($rootScope, $location) => {
		    $rootScope.$on("$locationChangeStart", function(event, next, current) {
		        if($location.$$path === '/home' || $location.$$path === '') {
		        	$rootScope.pageTitle = "Home"
		        	$rootScope.page = 'home';
		        } else if($location.$$path === '/about') {
							$rootScope.pageTitle = "About"
		        	$rootScope.page = 'about';
		        } else if($location.$$path === '/portfolio') {
		        	$rootScope.pageTitle = "Portfolio"
		        	$rootScope.page = 'portfolio';
		        } else if($location.$$path === '/404') {
		        	$rootScope.pageTitle = "404"
		        	$rootScope.page = 'error';
		        } else {
		        	$location.path("/404");
		        }
		    });
		}]);