angular
	.module('joaomarcuslfWebApp')
	.config(['$routeProvider', ($routeProvider) => {
		    $routeProvider
		    .when("/home", {
		        templateUrl: '/assets/views/home/home.html'
		    })
		    .when("/about", {
		        templateUrl: '/assets/views/about/about.html'
		    })
		    .when("/portfolio", {
		        templateUrl: '/assets/views/portfolio/portfolio.html',
		        controller: 'portfolioController'
		    })
		    .when("/404", {
		        templateUrl: '/assets/views/404/404.html'
		    })
		    .otherwise({ redirectTo: '/home' });
		}]);