import Ember from 'ember';

export default Ember.Component.extend({
	event:null,
	selected:null,
	isExpanded: Ember.computed('event', 'selected', function(){
		if(this.get('event') === null || this.get('selected') === null) { return false; }
		return this.get('event.id') === this.get('selected.id');
	}),
	hasHashtag: Ember.computed('event', function(){
		return !Ember.isEmpty(this.get('event.hashtag'));
	}),
	actions: {
		toggleExpand: function(event){
			var action = this.get('isExpanded')? 'collapseAction':'expandAction';
			this.sendAction(action, event);
		}
	}
});
