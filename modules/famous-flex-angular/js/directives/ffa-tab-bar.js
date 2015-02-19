angular.module('famousFlexAngular')
.directive('ffaTabBar', ['$famous', '$famousDecorator', function($famous, $famousDecorator) {

  var tabBar;

  return {
	template: '<div></div>',
	restrict: 'E',
	transclude: true,
	scope: true,
	controller: function($scope,$element,$attrs,$transclude) {
		$scope.myItems = $scope.$eval($attrs.radio) || {};
                $scope.$watch('myItems', function() {
			tabBar.setItems($scope.myItems);
		},true);
		//$transclude(function(clone) {
		//	console.log($element);
		//});
	}, 
	compile: function(tElem, tAttrs, transclude) {
	  return {
	    pre: function(scope, element, attrs) {
            	var isolate = $famousDecorator.ensureIsolate(scope);
            	var options = scope.$eval(attrs.faOptions) || {};
		var radio = scope.$eval(attrs.radio);
		var TabBar = $famous['famous-flex/widgets/TabBar'];
	 	isolate.renderNode = new TabBar(options);
		tabBar = isolate.renderNode;

		isolate.renderNode.setItems(radio);

            	$famousDecorator.addRole('renderable',isolate);
            	isolate.show();
		console.log(isolate);

	    	},
	    post: function(scope,element,attrs) {
	       		var isolate = $famousDecorator.ensureIsolate(scope);
            	    	transclude(scope, function(clone) {
              			//element.find('div').append(clone);
				//console.log(angular.element(element).children()[0]);//filter('div.item'));
				//var temp = element.children();
				//angular.forEach(temp[0].children, function(e) {
				//	console.log(e);
				//});
				//var temp2 = temp[0].children;
				//console.log(temp2.namedItem(0));
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
