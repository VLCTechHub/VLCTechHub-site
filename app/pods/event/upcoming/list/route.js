import Ember from 'ember';

export default Ember.Route.extend({
  model: function(){
    return this.modelFor('event.upcoming');
  },
  actions: {
    expand: function(event){
      this.transitionTo('event.upcoming.list.detail', event);
    },
    collapse: function(){
      this.transitionTo('event.upcoming.list');
    },
    willTransition: function(){
      this.controller.set('selected', null);
    }
  }
});
