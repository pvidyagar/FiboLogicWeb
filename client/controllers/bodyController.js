angular.module('bodyCntrl', [])

.controller("bodyController", ['$scope', function($scope) {

    $scope.showContact = false;
    $scope.clickContact = function() {
        $scope.showContact = !$scope.showContact;
    };
}]);
