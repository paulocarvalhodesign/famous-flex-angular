angular.module('famousFlexAngular')
.directive('resizable', function($window) {
        return function($scope) {
          $scope.initializeWindowSize = function() {
            $scope.windowHeight = $window.innerHeight;
            $scope.windowWidth = $window.innerWidth;
          };

	  $scope.initializeWindowSize();
	  $scope.$apply();
        
          angular.element($window).bind('resize', function() {
            $scope.initializeWindowSize();
            $scope.$apply();
          });
        }
});
