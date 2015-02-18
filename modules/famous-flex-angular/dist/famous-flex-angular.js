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
  //$famousProvider.registerModule('famous-flex/ScrollView',require('famous-flex/ScrollView'));
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
  //$famousProvider.registerModule('famous-flex/layouts/TableLayout',require('famous-flex/layouts/TableLayout'));
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
.directive('ffaFlexScrollView', ['$famous', '$famousDecorator', 'ffaFlexScrollViewService', function($famous, $famousDecorator, ffaFlexScrollViewService) {
  return {
	template: '<div></div>',
	restrict: 'E',
	transclude: true,
	scope: true,
        controller: function( $scope, $element, $attrs, $transclude ) {
		//$attrs.$observe('faOptions', function(value) {
		//	alert('change');
		//},true);
		$scope.options = $scope.$eval($attrs.faOptions) || {};
		$scope.$watch('options', function() {
			alert('options changed. direction =' + $scope.options.direction);
			//$scope.isolate.renderNode.setDirection($scope.options.direction);
			console.log(Object.keys($scope.isolate));//.renderNode);
		},true); // deep watch.
        },
	compile: function(tElem, tAttrs, transclude) {
	  var mySelection = 1;

	  return {
	    pre: function(scope, element, attrs) {
            	var isolate = $famousDecorator.ensureIsolate(scope);
            	var options = scope.$eval(attrs.faOptions) || {};
		
		var FlexScrollView = $famous['famous-flex/FlexScrollView'];
	 	isolate.renderNode = new FlexScrollView(options);
		alert(isolate.renderNode.id);
			ffaFlexScrollViewService.setScrollView(isolate.renderNode);

			$famousDecorator.sequenceWith(scope,ffaFlexScrollViewService.push,ffaFlexScrollViewService.remove,ffaFlexScrollViewService.push);

/*		
	    		var _children = [];

            		var updateLayout = function () {
              			//scope.$$postDigest(function(){
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
              			//});
				console.log(isolate.renderNode);
            		};

			var updateLayout2 = function(data) {
				isolate.renderNode.insert(0,data.renderGate);
			};

                       $famousDecorator.sequenceWith(
                                scope,
                                function(data) {
                                        _children.push(data);
                                        updateLayout2(data);
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
*/
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
.directive('ffaNavBarControl', ['$famous', '$famousDecorator', function($famous, $famousDecorator) {
	return {
		restrict: 'AE',
		transclude: true,
		compile: function(tElem,tAttrs,transclude) {
			
			var Surface = $famous['famous/core/Surface'];
			var LayoutController = $famous['famous-flex/LayoutController'];
			var NavBarLayout = $famous['famous-flex/layouts/NavBarLayout'];

	
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
				var background = new Surface({classes: ['navbar', 'navbar-default']});
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
						console.log(_createTitle());
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

/*
 * ids = array of element, each element the identity of an renderable that has been added to the scrollview
 *       the index of the identity is the position of the renderable in the scrollView
 * 
 * setScrollView - set the scrollview of this service
 * getIndex      - get the position of the renderable 
 * add           - insert a renderable into a given position
 * toArrayIndex  - there is a mismatch between array indexing and the indexing used by the scrollView
 *                 example: insert at non-negative position i <--> insert at index i
 *                          insert at negative position i <--> insert after index i
 * remove        - remove the renderable 
 * removeIndex   - remove the renderable at the given position
 * insertBefore  -  
 */
angular.module('famousFlexAngular')
.factory('ffaFlexScrollViewService', [function() {

  var ids = [];
  var scrollView = undefined;

  var setScrollView = function(x) {
    scrollView = x;
  };

  var getPosition = function(id) {
    var value = ids.indexOf(id);
    return (value === -1 ? undefined : value);
  };
  
  var removeAtPosition = function(index) {
    ids.splice(index,1);
  };
  
  var insertBeforePosition = function(index,id) {
    ids.splice(index,0,id);
  };
    
  var insertAfterPosition = function(index,id) {
    ids.splice(index+1,0,id);
  };
  
  var insertId = function(index,id) {
    if (index < 0) {
      insertAfterPosition(ids.length+index,id);
    } else {
      insertBeforePosition(index,id);
    }
  };
  
  var pushId = function(id) {
    insertId(-1,id);
  };
  
  var removeId = function(id) {
    var position = getPosition(id);
    
    if (position !== undefined) {
      removeAtPosition(position);
    } 
  }

  var getIds = function() {
    return ids;
  };

  var insert = function(index,x) {
    insertId(index,x.id);
    scrollView.insert(index,x.renderGate);
  };

  var remove = function(x) {
    var index = getPosition(x.id);
    if (index !== undefined) {
    	removeAtPosition(index);
        scrollView.remove(index);
    }
  };

  var push = function(x) {
    pushId(x.id);
    scrollView.push(x.renderGate);
    console.log(ids);
  };

  return {
    getIds: getIds,
    setScrollView: setScrollView,
    insert: insert,
    remove: remove,
    push: push
  };
}]);

/*
  var getIndex = function(x) {
    var value = ids.indexOf(x.id);
    if (value === -1) return undefined;
    return value;
  };

  // nonnegative: add at index i
  // negative: -1 add at end
  // negative: -2 add in end-1
  var add = function(x,index) {
        console.log('add');
	console.log(x);
    var myIndex = getIndex(x);
    if (!myIndex) {
      insertBefore(x,index);  
    } else {
      if (myIndex !== index) {
        removeIndex(myIndex);
        insertBefore(index,x);
      }
    }
    console.log(ids);
  };

  var toArrayIndex = function(index) {
    if (index === undefined) return ids.length;
    if (index < 0) return Math.max(0,ids.length + index + 1);
    return index;
   };
  
  var remove = function(x) {
    var myIndex = getIndex(x);
    if (myIndex !== undefined) {
      removeIndex(myIndex);
    }
  };

  var removeIndex = function(index) {
    ids.splice(toArrayIndex(index),1); 
    scrollView.remove(index); 
  };
  
  var insertBefore = function(x,index) {
    ids.splice(toArrayIndex(index),0,x.id);
    console.log(index);
    console.log(x);
    //var Surface = $famous['famous/core/Surface'];
    //var surface = new Surface({content: 'hello', size: [100,100], properties: {backgroundColor: 'red'}});
    scrollView.insert(0,x.renderGate);//surface); //x.renderGate._object._child._object);//index,x);
  };

  var insertAfter = function(x,index) {
    ids.splice(toArrayIndex(index)+1,0,x.id);  
    scrollView.insert(index+1,x);
  };

  return {
    setScrollView: setScrollView,
    add: add,
    remove: remove
  };
}]);

*/
