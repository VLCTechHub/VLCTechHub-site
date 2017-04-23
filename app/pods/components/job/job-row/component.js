import Ember from 'ember';

export default Ember.Component.extend({
  item: null,
  selectedItem:null,
  onExpand: Ember.K,
  onCollapse: Ember.K,
  isExpanded: Ember.computed('item', 'selectedItem', function(){
    if(this.get('item') === null || this.get('selectedItem') === null) { return false; }
    return this.get('selectedItem.id') === this.get('item.id');
  }),
});
