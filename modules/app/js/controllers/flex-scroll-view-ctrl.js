angular.module('app')
.controller('FlexScrollViewCtrl', ['$scope', '$state', '$famous', function($scope,$state,$famous) {
    $scope.setPage = function (page) {
      $state.transitionTo(page);
    };

    $scope.direction = 0;

    $scope.myOptions = {
       layout: $famous['famous-flex/layouts/CollectionLayout'], //GridLayout, //GridLayout, //WheelLayout, //ListLayout, //CollectionLayout,
       layoutOptions: {
        itemSize: [100,100],
        margins: [10,10,10,10],
        spacing: [10,10],
       },
       flow: true,
       direction: $scope.direction
    };

    $scope.changeDirection = function() {
        $scope.direction = ($scope.direction + 1) % 2;
        $scope.myOptions.direction = $scope.direction;
    };

    $scope.grids = [{bgColor: "orange"}, {bgColor: "red"}, {bgColor: "green"}, {bgColor: "yellow"}, {bgColor: "pink"}, {bgColor: "blue"}];
    $scope.availableLayouts = ['Collection','Grid','Wheel','List'];
    $scope.selectedLayout = 'Collection';

    $scope.updateLayout = function() {
        $scope.myOptions.layout = $famous['famous-flex/layouts/' + $scope.selectedLayout + 'Layout'];
    };

    $scope.addSquare = function() {
        $scope.grids.push({bgColor: "red"});
    };

}]);
