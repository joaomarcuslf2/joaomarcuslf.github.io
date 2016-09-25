angular
	.module('joaomarcuslfWebApp')
	.controller('portfolioController', ['$scope', ($scope) => {
		$scope.portfolioItens  = [
			{
				img: 'banner-alien.jpeg',
				label: 'OuterWorldCodes',
				link: 'https://github.com/joaomarcuslf/my-personal-webapp'
			},
			{
				img: 'fastformater.png',
				label: 'FastFormater Gem',
				link: 'https://github.com/joaomarcuslf/fast_formater'
			},
			{
				img: 'fileminer.png',
				label: 'FileMiner',
				link: 'https://github.com/joaomarcuslf/file-mining'
			},
			{
				img: 'gemlist.png',
				label: 'Gem List',
				link: 'https://github.com/joaomarcuslf/data_struct_list'
			},
			{
				img: 'hellslist.png',
				label: "Hell's list",
				link: 'https://github.com/joaomarcuslf/sexta-feira-13'
			},
			{
				img: 'todoapp.png',
				label: "Todo App",
				link: 'https://github.com/joaomarcuslf/my-todo-list'
			},
		];
	}]);