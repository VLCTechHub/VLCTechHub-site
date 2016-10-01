import Ember from 'ember';

export default Ember.Route.extend({
  titleToken: 'Publicar evento',
  model() {
    return this.store.createRecord('event');
  },
  actions: {
   willTransition: function(){
      this.controller.reset();
    }
  },
});
