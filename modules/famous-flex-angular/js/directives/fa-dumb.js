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
			
