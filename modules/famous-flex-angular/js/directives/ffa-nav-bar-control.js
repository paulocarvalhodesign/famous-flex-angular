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
            				content: '<button type="button" class="btn btn-danger">' + content + '</button>'
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
						var divs = clone.find('div');
						var title;
						angular.forEach(divs, function(div) {
						  switch(div.className) {
						    case 'title':
						      title = _createTitle(div.innerHTML);
						      break;
						  }
						});
						var buttons = clone.find('button');
						var rightItems = [];
						var leftItems = [];
						console.log(clone);
						console.log(title);
						angular.forEach(buttons, function(button) {
							switch(button.className) {
							  case 'left':
							    leftItems.push(_createButton(button.innerHTML));
							    break;
							  case 'right':
							    rightItems.push(_createButton(button.innerHTML));
							    break;
							}
						});
                				var isolate = $famousDecorator.ensureIsolate(scope);
						console.log(rightItems);
						isolate.renderNode.setDataSource({
							background: _createBackground(),
							title: title,
							rightItems: rightItems,
							leftItems: leftItems
						});
					});


					$famousDecorator.registerChild(scope, element, isolate);
				}
			};
		}
	};
}]);
			
