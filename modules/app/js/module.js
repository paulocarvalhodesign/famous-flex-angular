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
