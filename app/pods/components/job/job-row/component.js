import Ember from 'ember';

export default Ember.Component.extend({
  item: null,
  selectedItem:null,
  isExpanded: Ember.computed('item', 'selectedItem', function(){
    if(this.get('item') === null || this.get('item') === null) { return false; }
    return this.get('selectedItem.id') === this.get('item.id');
  }),
  actions: {
    toggleExpand: function(item){
      var action = this.get('isExpanded')? 'collapseAction':'expandAction';
      this.sendAction(action, item);
    }
  }
});
