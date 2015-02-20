angular.module('app')
.controller('BodyCtrl', ['$scope', '$state', 'stateNames', function($scope,$state,stateNames) {
    $scope.stateNames = stateNames;
    $scope.setPage = function (page) {
      $state.transitionTo(page);
    };
}]);
