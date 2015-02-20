angular.module('app')
.controller('DatePickerCtrl', ['$scope', function($scope) {
  $scope.myDatePickerOptions = {
    date: new Date(),
    wheelLayout: {
      itemSize: 50,
      diameter: 300
    },
    createRenderables: {
        top: true,
        middle: true,
        bottom: true
    }
  };
}]);
