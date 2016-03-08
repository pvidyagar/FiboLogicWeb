var app = angular.module("myApp", [ 'ui.router', 'ui.bootstrap',
		'profileCntrl', 'bodyCntrl', 'signinCntrl', 'signupCntrl' ])
app.config([ '$stateProvider', '$urlRouterProvider', '$locationProvider',
		function($stateProvider, $urlRouterProvider, $locationProvider) {

			$urlRouterProvider.otherwise('/body');

			$stateProvider.state('body', {
				url : '/body',
				templateUrl : 'partials/homeBody.html',
				controller : 'bodyController'
			}).state('profile', {
				url : '/profile',
				templateUrl : 'partials/userProfile.html',
				controller : 'profileController'
			})
		} ]);

app.run([ '$rootScope', function($rootScope) {
	$rootScope.test = "";
	$rootScope.registeredEmail = " ";
	$rootScope.Password = "";
} ]);

app
		.directive(
				'fileModel',
				[ '$parse', function($parse) {
					return {
						restrict : 'A',
						link : function(scope, element, attrs) {
							var model = $parse(attrs.fileModel);
							var modelSetter = model.assign;

							element.bind('change', function() {
								scope.$apply(function() {
									modelSetter(scope, element[0].files[0]);
								});
							});
						}
					};
				} ],
				'modal',
				function() {
					return {

						template : '<div class="modal fade">'
								+ '<div class="modal-dialog">'
								+ '<div class="modal-content">'
								+ '<div class="modal-header">'
								+ '<button type="button" class="close" data-dismiss="modal" aria-hidden="true">&times;</button>'
								+ '<h4 class="modal-title">{{ title }}</h4>'
								+ '</div>'
								+ '<div class="modal-body" ng-transclude></div>'
								+ '</div>' + '</div>' + '</div>',
						restrict : 'E',
						transclude : true,
						replace : true,
						scope : true,
						link : function postLink(scope, element, attrs) {
							scope.title = attrs.title;

							scope.$watch(attrs.visible, function(value) {
								if (value == true)
									$(element).modal('show');
								else
									$(element).modal('hide');
							});

							$(element).on('shown.bs.modal', function() {
								scope.$apply(function() {
									scope.$parent[attrs.visible] = true;
								});
							});

							$(element).on('hidden.bs.modal', function() {
								scope.$apply(function() {
									scope.$parent[attrs.visible] = false;
								});
							});
						}
					};
				});

app.controller("mainController", [ '$scope', '$http', '$uibModal',
		'$rootScope', function($scope, $http, $uibModal, $rootScope) {

			$scope.login = function(size, role) {

				$rootScope.test = role;

				var modalInstance = $uibModal.open({
					templateUrl : 'partials/signIn.html',
					controller : 'signInController',
					size : size
				});
			};

			$scope.reg = function() {
				var modalInstance = $uibModal.open({
					templateUrl : 'partials/regForm.html',
					controller : 'registrationController'
				});
			};

			angular.element(document).ready(function() {
				showImages();
			});
			var showImages = function() {
				$http.get('/menu').success(function(response) {
					$scope.image = response;
				});
			};

			$scope.search = function(name) {
				console.log("got it");
				$http.get('/byType/' + name).success(function(response) {
					$scope.image = response;
				});
			};

			$scope.searchAll = function() {

				$http.get('/getall/').success(function(response) {
					$scope.image = response;
				});
			};
			$scope.showDetails = function(id) {
				$http.get('/showDetails/' + id).success(function(response) {
					$scope.view = response;
				});
			};
			$scope.showContact = false;
			$scope.clickContact = function() {
				$scope.showContact = !$scope.showContact;

			};
		} ]);

app.controller("registrationController", [
		'$scope',
		'$http',
		'$uibModal',
		function($scope, $http, $uibModal) {
			$scope.regForm = true;
			$scope.recipe = {};
			$scope.image = {};
			$scope.recipe.image = {};

			$(function() {

				$(":file").change(function() {
					$scope.showImage = true;
					if (this.files && this.files[0]) {
						var reader = new FileReader();
						reader.onload = imageIsLoaded;
						reader.readAsDataURL(this.files[0]);
					}
				});
			});

			function imageIsLoaded(e) {
				$('#imageData').attr('src', e.target.result);
				$scope.recipe.image = e.target.result;
				$scope.recipe.imageName = $scope.myFile.name;
			}
			;

			$scope.addRecipe = function() {
				$http.post('/recipeimage', $scope.recipe).success(
						function(response) {
							console.dir($scope.recipe);
							$scope.recipe = " ";
						});
			}
			$scope.closeMe = function() {
				$('.modal-backdrop').remove();
				console.log("Inside closeMe");
				$scope.regForm = false;
			}
			$scope.toggleDetail = function() {
				$scope.more = !$scope.more;
			}

		} ]);
