angular.module('famousFlexAngular')
.directive('ffaDatePicker', ['$famous', '$famousDecorator', function($famous, $famousDecorator) {
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

		var DatePicker = $famous['famous-flex/widgets/DatePicker'];
	 	isolate.renderNode = new DatePicker(options);

		isolate.renderNode.setComponents([
		  new DatePicker.Component.FullDay(),
		  new DatePicker.Component.Hour(),
		  new DatePicker.Component.Minute()
		]);

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
