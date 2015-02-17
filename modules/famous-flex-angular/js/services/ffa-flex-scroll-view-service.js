angular.module('famousFlexAngular')
.factory('ffaFlexScrollViewService', function() {
  
  return Mapping;

  var Mapping = function(scrollView) {
    this.ids = [];
    this.scrollView = scrollView;
  };
  
  // nonnegative: add at index i
  // negative: -1 add at end
  // negative: -2 add in end-1
  Mapping.prototype.add = function(x,index) {
    var myIndex = this.getIndex(x);
    if (!myIndex) {
      this.insertBefore(x,index);  
    } else {
      if (myIndex !== index) {
        this.removeIndex(myIndex);
        this.insertBefore(index,x);
      }
    }
  };

  Mapping.prototype.getIndex = function(x) {
    var value = this.ids.indexOf(x.id);
    if (value === -1) return undefined;
    return value;
  }  
  Mapping.prototype.toArrayIndex = function(index) {
    if (index === undefined) return this.ids.length;
    if (index < 0) return Math.max(0,this.ids.length + index + 1);
    return index;
   };
  
  Mapping.prototype.remove = function(x) {
    var myIndex = this.getIndex(x);
    if (myIndex !== undefined) {
      this.removeIndex(myIndex);
    }
  };

  Mapping.prototype.removeIndex = function(index) {
    this.ids.splice(this.toArrayIndex(index),1); 
    this.scrollView.remove(index); 
  };
  
  Mapping.prototype.insertBefore = function(x,index) {
    this.ids.splice(this.toArrayIndex(index),0,x.id);
    this.scrollView.insert(index,x);
  };

  Mapping.prototype.insertAfter = function(x,index) {
    this.ids.splice(this.toArrayIndex(index)+1,0,x.id);  
    this.scrollView.insert(index+1,x);
  };
});
