import Ember from 'ember';

export default Ember.Route.extend({
  titleToken: 'Próximos eventos',
  model: function(){
    return this.store.query('event', { 'category': 'next' });
  },
  actions: {
    expand: function(event){
      this.transitionTo('event.upcoming.detail', event);
    },
    collapse: function(){
      this.transitionTo('event.upcoming');
    }
    ,
    willTransition: function(){
      this.controller.set('selected', null);
    }
  }
});
