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
