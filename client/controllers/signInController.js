angular.module("signinCntrl", []).controller(
		'signInController',
		[ '$scope', '$uibModal', '$uibModalInstance', '$rootScope',
				function($scope, $uibModal, $uibModalInstance, $rootScope) {
					$scope.emailValue = $rootScope.Email;
					$scope.passwordValue = $rootScope.Password;

					$scope.showSignUp = function(size) {
						$uibModalInstance.close();
						var modalInstance = $uibModal.open({
							templateUrl : 'partials/signUp.html',
							controller : "signUpController",
							size : size
						});

					};

					$scope.loginPage = function() {
						$scope.emailValue = $rootScope.Email;
						$uibModalInstance.close();
						var modalInstance = $uibModal.open({
							templateUrl : 'partials/signIn.html',
							controller : 'signInController',
							size : 'lg'
						});
					};

				}

		]);