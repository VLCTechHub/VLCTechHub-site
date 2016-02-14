import Ember from 'ember';

export default Ember.Route.extend({
  titleToken: function(model) {
    return model.get('title');
  },
  model: function(params){
    return this.modelFor('event.archive.month').findBy('id', params.event_id);
  },
  setupController: function(controller, model) {
    this.controllerFor('event.archive.month').set('selected', model);
    this._super.apply(this, arguments);
  }
});
