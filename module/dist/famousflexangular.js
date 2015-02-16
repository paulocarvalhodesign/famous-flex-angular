var ffa = angular.module('famousFlexAngular',['famous.angular']);

ffa.config(function($famousProvider) {
  $famousProvider.registerModule('famous-flex/FlexScrollView',require('famous-flex/FlexScrollView'));
  $famousProvider.registerModule('famous-flex/FlowLayoutNode',require('famous-flex/FlowLayoutNode'));
  $famousProvider.registerModule('famous-flex/LayoutContext',require('famous-flex/LayoutContext'));
  $famousProvider.registerModule('famous-flex/LayoutController',require('famous-flex/LayoutController'));
  $famousProvider.registerModule('famous-flex/LayoutNode',require('famous-flex/LayoutNode'));
  $famousProvider.registerModule('famous-flex/LayoutNodeManager',require('famous-flex/LayoutNodeManager'));
  $famousProvider.registerModule('famous-flex/LayoutUtility',require('famous-flex/LayoutUtility'));
  $famousProvider.registerModule('famous-flex/ScrollController',require('famous-flex/ScrollController'));
  $famousProvider.registerModule('famous-flex/ScrollView',require('famous-flex/ScrollView'));
  $famousProvider.registerModule('famous-flex/VirtualViewSequence',require('famous-flex/VirtualViewSequence'));
  $famousProvider.registerModule('famous-flex/helpers/LayoutDockHelper',require('famous-flex/helpers/LayoutDockHelper'));
  $famousProvider.registerModule('famous-flex/layouts/CollectionLayout',require('famous-flex/layouts/CollectionLayout'));
  $famousProvider.registerModule('famous-flex/layouts/CoverLayout',require('famous-flex/layouts/CoverLayout'));
  $famousProvider.registerModule('famous-flex/layouts/CubeLayout',require('famous-flex/layouts/CubeLayout'));
  $famousProvider.registerModule('famous-flex/layouts/GridLayout',require('famous-flex/layouts/GridLayout'));
  $famousProvider.registerModule('famous-flex/layouts/HeaderFooterLayout',require('famous-flex/layouts/HeaderFooterLayout'));
  $famousProvider.registerModule('famous-flex/layouts/ListLayout',require('famous-flex/layouts/ListLayout'));
  $famousProvider.registerModule('famous-flex/layouts/NavBarLayout',require('famous-flex/layouts/NavBarLayout'));
  $famousProvider.registerModule('famous-flex/layouts/ProportionalLayout',require('famous-flex/layouts/ProportionalLayout'));
  $famousProvider.registerModule('famous-flex/layouts/TabBarLayout',require('famous-flex/layouts/TabBarLayout'));
  $famousProvider.registerModule('famous-flex/layouts/TableLayout',require('famous-flex/layouts/TableLayout'));
  $famousProvider.registerModule('famous-flex/layouts/WheelLayout',require('famous-flex/layouts/WheelLayout'));
  $famousProvider.registerModule('famous-flex/widgets/DatePicker',require('famous-flex/widgets/DatePicker'));
  $famousProvider.registerModule('famous-flex/widgets/DatePickerComponents',require('famous-flex/widgets/DatePickerComponents'));
  $famousProvider.registerModule('famous-flex/widgets/TabBar',require('famous-flex/widgets/TabBar'));
  //console.log($famousProvider.$get());
});

//var LayoutController = require('famous-flex/LayoutController');
//var CollectionLayout = require('famous-flex/layouts/CollectionLayout');
//var ListLayout = require('famous-flex/layouts/ListLayout');
//var WheelLayout = require('famous-flex/layouts/WheelLayout');
//var GridLayout = require('famous-flex/layouts/GridLayout');
//var NavBarLayout = require('famous-flex/layouts/NavBarLayout');
//require('bootstrap.min.css');

angular.module('famousFlexAngular')
.directive('faDumb', ['$famous', '$famousDecorator', function($famous, $famousDecorator) {
  return {
	template: '<div></div>',
	restrict: 'E',
	transclude: true,
	scope: true,
	compile: function(tElem, tAttrs, transclude) {
	  var mySelection = 1;

	  return {
	    pre: function(scope, element, attrs) {
            	var isolate = $famousDecorator.ensureIsolate(scope);
            	var options = scope.$eval(attrs.faOptions) || {};

		var LayoutController = $famous['famous-flex/LayoutController'];
	 	isolate.renderNode = new LayoutController(options);

	    		var _children = [];

            		var updateLayout = function () {
              			scope.$$postDigest(function(){
                			_children.sort(function (a, b) {
                  			return a.index - b.index;
                			});
	        			isolate.renderNode.setDataSource(function(_children) {
                	  			var _ch = [];
                  				angular.forEach(_children, function(c, i) {
                    					_ch[i] = c.renderGate;//._object._child._object;
                  				});
                  				return _ch;
                			}(_children));
              			});
				console.log(isolate.renderNode);
            		};

                       $famousDecorator.sequenceWith(
                                scope,
                                function(data) {
                                        _children.push(data);
                                        updateLayout();
                                },
                                function(childScopeId) {
                                        _children = function(_children) {
                                                var _ch = [];
                                                angular.forEach(_children, function(c) {
                                                        if (c.id !== childScopeId) {
                                                                _ch.push(c);
                                                        }
                                                });
                                                return _ch;
                                        }(_children);
                                        updateLayout();
                                },
                                updateLayout
                        );


            	$famousDecorator.addRole('renderable',isolate);
            	isolate.show();
		console.log(isolate);

	    	},
	    post: function(scope,element,attrs) {
	       		var isolate = $famousDecorator.ensureIsolate(scope);
            	    	transclude(scope, function(clone) {
              			element.find('div').append(clone);
            		});
            	    	$famousDecorator.registerChild(scope, element, isolate);
	    }
	  }
	}
  }
}])
.directive('faNavbar', ['$famous', '$famousDecorator', function($famous, $famousDecorator) {
	return {
		restrict: 'AE',
		transclude: true,
		compile: function(tElem,tAttrs,transclude) {
			
			var Surface = $famous['famous/core/Surface'];
			var LayoutController = $famous['famous-flex/LayoutController'];
			var NavBarLayout = $famous['famous-flex/NavBarLayout'];
	
			var _createLayoutController = function(options) {
				var layoutController = new LayoutController({
					layout: NavBarLayout,
					layoutOptions: {
						margins: [8],
						itemSpacer: 5
					}
				});
				return layoutController;
			};

			var _createBackground = function() {
				var background = new Surface({classes: ['navbar', 'navbar-inverse']});
				return background;
			};

			var _createTitle = function(myTitle) {
				var title = new Surface({content: myTitle || 'famous-flex', classes: ['title']});
				return title;
			};

   			var _createButton = function(content) {
        			return new Surface({
            				size: [50, undefined],
            				content: '<button type="button" class="btn btn-default">' + content + '</button>'
        			});
    			};

			var rightItems = [];

			return {
				pre: function(scope,elem,attrs) {
                			var isolate = $famousDecorator.ensureIsolate(scope);
                			var options = scope.$eval(attrs.faOptions) || {};
                			isolate.renderNode = _createLayoutController(options);

			                $famousDecorator.addRole('renderable',isolate);
                			isolate.show();
                			console.log(isolate);
				},
				post: function(scope,element,attrs) {
                			var isolate = $famousDecorator.ensureIsolate(scope);
	
					transclude(scope, function(clone) {
						var title = clone.find('div.title');
						var buttons = clone.find('button.left');
						var rightItems = [];
						console.log(title);
						angular.forEach(buttons, function(button) {
							rightItems.push(_createButton('hello'));//button);
						});
                				var isolate = $famousDecorator.ensureIsolate(scope);
						console.log(rightItems);
						isolate.renderNode.setDataSource({
							background: _createBackground(),
							title: _createTitle(),
							rightItems: rightItems
						});
					});


					$famousDecorator.registerChild(scope, element, isolate);
				}
			};
		}
	};
}]);
			

angular.module('famousFlexAngular')
.directive('ffaLayoutController', ['$famous', '$famousDecorator', function($famous, $famousDecorator) {
  return {
	template: '<div></div>',
	restrict: 'E',
	transclude: true,
	scope: true,
	compile: function(tElem, tAttrs, transclude) {
	  var mySelection = 1;

	  return {
	    pre: function(scope, element, attrs) {
            	var isolate = $famousDecorator.ensureIsolate(scope);
            	var options = scope.$eval(attrs.faOptions) || {};

		var LayoutController = $famous['famous-flex/LayoutController'];
	 	isolate.renderNode = new LayoutController(options);

	    		var _children = [];

            		var updateLayout = function () {
              			scope.$$postDigest(function(){
                			_children.sort(function (a, b) {
                  			return a.index - b.index;
                			});
	        			isolate.renderNode.setDataSource(function(_children) {
                	  			var _ch = [];
                  				angular.forEach(_children, function(c, i) {
                    					_ch[i] = c.renderGate;//._object._child._object;
                  				});
                  				return _ch;
                			}(_children));
              			});
				console.log(isolate.renderNode);
            		};

                       $famousDecorator.sequenceWith(
                                scope,
                                function(data) {
                                        _children.push(data);
                                        updateLayout();
                                },
                                function(childScopeId) {
                                        _children = function(_children) {
                                                var _ch = [];
                                                angular.forEach(_children, function(c) {
                                                        if (c.id !== childScopeId) {
                                                                _ch.push(c);
                                                        }
                                                });
                                                return _ch;
                                        }(_children);
                                        updateLayout();
                                },
                                updateLayout
                        );


            	$famousDecorator.addRole('renderable',isolate);
            	isolate.show();
		console.log(isolate);

	    	},
	    post: function(scope,element,attrs) {
	       		var isolate = $famousDecorator.ensureIsolate(scope);
            	    	transclude(scope, function(clone) {
              			element.find('div').append(clone);
            		});
            	    	$famousDecorator.registerChild(scope, element, isolate);
	    }
	  }
	}
  }
}]);

angular.module('famousFlexAngular')
.directive('resizable', function($window) {
        return function($scope) {
          $scope.initializeWindowSize = function() {
            $scope.windowHeight = $window.innerHeight;
            $scope.windowWidth = $window.innerWidth;
          };
        
          angular.element($window).bind('resize', function() {
            $scope.initializeWindowSize();
            $scope.$apply();
          });
        }
});
