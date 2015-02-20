angular.module('app')
.controller('GridCtrl', ['$scope', '$famous', function($scope,$famous) {
    $scope.direction = 1;
    $scope.changeDirection = function() {
        $scope.direction = ($scope.direction === 1 ? 0 : 1);
    };

    $scope.myGridLayoutOptions = {
       layout: $famous['famous-flex/layouts/CollectionLayout'], //GridLayout, //GridLayout, //WheelLayout, //ListLayout, //CollectionLayout,
       //size: [undefined, undefined],
       layoutOptions: {
        cells: [3,3],
        //itemSize: [100,100],
        margins: [10,10,10,10],
        spacing: [10,10],
        //justify: false
       },
       flow: true,
       direction: $scope.direction
    };

    $scope.grids = [{bgColor: "orange"}, {bgColor: "red"}, {bgColor: "green"}, {bgColor: "yellow"}, {bgColor: "pink"}, {bgColor: "blue"}];

}]);
