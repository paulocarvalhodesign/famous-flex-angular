angular.module('famousFlexAngular')
.directive('ffaTabBar', ['$famous', '$famousDecorator', function($famous, $famousDecorator) {

  var tabBar;

  return {
	template: '<div></div>',
	restrict: 'E',
	transclude: true,
	scope: true,
	controller: ['$scope','$element', '$attrs', '$transclude', function($scope,$element,$attrs,$transclude) {
		//$transclude(function(clone) {
		//	console.log($element);
		//});
	}], 
	compile: function(tElem, tAttrs, transclude) {
	  return {
	    pre: function(scope, element, attrs) {
            	var isolate = $famousDecorator.ensureIsolate(scope);
            	var options = scope.$eval(attrs.faOptions) || {};

		var TabBar = $famous['famous-flex/widgets/TabBar'];
	 	isolate.renderNode = new TabBar(options);
		tabBar = isolate.renderNode;

		isolate.renderNode.setItems([
			'one', 'two', 'three'
		]);

            	$famousDecorator.addRole('renderable',isolate);
            	isolate.show();
		console.log(isolate);

	    	},
	    post: function(scope,element,attrs) {
	       		var isolate = $famousDecorator.ensureIsolate(scope);
            	    	transclude(scope, function(clone) {
              			element.find('div').append(clone);
				//console.log(jQuery(element).filter('div.item'));
				var temp = element.children();
				var items = temp[0].children();
				for (item in items) {
					console.log(item);
				};
				console.log(items.length);
				console.log(items.item());
				//console.log(jQuery(element).find('div.item'));
				//console.log(angular.element(element).find('div').children());
				//console.log(angular.element(element.find('div')));
				//var temp = element.find('div');
				//console.log(jQuery(clone).filter(":div"));
				//var temp = element.find('div')[0];
				//console.log(clone.filter(':div')); 
				//console.log(jQuery(clone).find('div'));//filter(':div'));
				//console.log(jQuery(clone).find('div'));
				//console.log(element.find('div')[0].children());
				//console.log(clone);
				
            		});
            	    	$famousDecorator.registerChild(scope, element, isolate);
	    }
	  }
	}
  }
}]);
