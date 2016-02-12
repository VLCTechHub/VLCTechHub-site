import Ember from 'ember';

export default Ember.Route.extend({
  model: function(params){
    return this.modelFor('event.archive').findBy('id', params.event_id);
  },
  setupController: function(controller, model) {
    this.controllerFor('event.archive').set('selected', model);
    this._super.apply(this, arguments);
  }
});
