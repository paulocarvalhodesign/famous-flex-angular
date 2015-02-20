angular.module('app')
.controller('TabBarCtrl', ['$scope', function($scope) {
  $scope.myTabBarOptions = {
    createRenderables: {
        background: true,
        selectedItemOverlay: true
    }
  };
  
  $scope.items = ['One','Two','Three','Four'];
  $scope.addItem = function() {
        $scope.items.push($scope.items.length);
  }
}]);
