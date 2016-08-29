angular
	.module('joaomarcuslfWebApp')
	.run(function($rootScope, $location) {
	    $rootScope.$on("$locationChangeStart", function(event, next, current) { 
	        if($location.$$path === '/home') {
	        	$rootScope.pageTitle = "Home"
	        	$rootScope.page = 'home';
	        } else if($location.$$path === '/about') {
						$rootScope.pageTitle = "About"
	        	$rootScope.page = 'about';
	        } else if($location.$$path === '/portifolio') {
	        	$rootScope.pageTitle = "Portifolio"
	        	$rootScope.page = 'portifolio';
	        } else if($location.$$path === '/404') {
	        	$rootScope.pageTitle = "404"
	        	$rootScope.page = '404';
	        } else {
	        	$location.path("/404");
	        }
	    });
	});