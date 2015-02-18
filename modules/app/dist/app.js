//var LayoutController = require('famous-flex/LayoutController');
//var CollectionLayout = require('famous-flex/layouts/CollectionLayout');
//var ListLayout = require('famous-flex/layouts/ListLayout');
//var WheelLayout = require('famous-flex/layouts/WheelLayout');
//var GridLayout = require('famous-flex/layouts/GridLayout');
//var NavBarLayout = require('famous-flex/layouts/NavBarLayout');
//require('famous-angular');
//require('bootstrap.min.css');
require('bootstrap-webpack');

angular.module('app',['famousFlexAngular'])
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

}])
.controller('FlexScrollViewCtrl', ['$scope', '$famous', function($scope,$famous) {
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
}]);
