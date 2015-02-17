angular.module('famousFlexAngular')
.directive('ffaFlexScrollView', ['$famous', '$famousDecorator', 'ffaFlexScrollViewService', function($famous, $famousDecorator, ffaFlexScrollViewService) {
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

		var FlexScrollView = $famous['famous-flex/FlexScrollView'];
	 	isolate.renderNode = new FlexScrollView(options);

			var scopeTracker = new ffaFlexScrollViewService(isolate.renderNode);

			$famousDecorator.sequenceWith(scope,scopeTracker.add,scopeTracker.remove,scopeTracker.add);
/*		
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
