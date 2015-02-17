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
			
