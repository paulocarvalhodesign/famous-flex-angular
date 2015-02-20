//var LayoutController = require('famous-flex/LayoutController');
//var CollectionLayout = require('famous-flex/layouts/CollectionLayout');
//var ListLayout = require('famous-flex/layouts/ListLayout');
//var WheelLayout = require('famous-flex/layouts/WheelLayout');
//var GridLayout = require('famous-flex/layouts/GridLayout');
//var NavBarLayout = require('famous-flex/layouts/NavBarLayout');
//require('famous-angular');
//require('bootstrap.min.css');
require('bootstrap-webpack');

angular.module('app',['famousFlexAngular','ui.router'])
.constant('appPath','../modules/app')
.constant('stateNames',['date-picker','grid-layout','tab-bar','flex-scroll-view','layout-controller','nav-bar'].sort())
.config(['$stateProvider', 'appPath', 'stateNames', function($stateProvider,appPath,stateNames) {

  var generateState = function(name) {
    return {name: name, url: '/' + name, templateUrl: appPath + '/partials/' + name + '.html'};
  };

  $stateProvider.state(generateState('home'));
  for (var i = 0; i < stateNames.length; i++) {
	$stateProvider.state(generateState(stateNames[i]));
  }  
}])
.run(['$state', function($state) {
  $state.transitionTo('home');
}]);


//date-picker.html             grid-layout.html             index-layout-controller.html index.html
//demo1.html                   index-flex-scroll-view.html  index-navbar.html            tab-bar.html

angular.module('app')
.controller('BodyCtrl', ['$scope', '$state', 'stateNames', function($scope,$state,stateNames) {
    $scope.stateNames = stateNames;
    $scope.setPage = function (page) {
      $state.transitionTo(page);
    };
}]);

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
