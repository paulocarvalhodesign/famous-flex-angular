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
			console.log('options changed. direction =' + $scope.options.direction);
			$scope.postma.setDirection($scope.options.direction);
			//console.log(Object.keys($scope.isolate));//.renderNode);
			//console.log($scope.postma);
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
		scope.postma = isolate.renderNode;
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
