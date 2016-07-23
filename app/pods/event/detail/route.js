import Ember from 'ember';

export default Ember.Route.extend({
  model: function(params) {
    console.log('buscando' + params.slug);
    return this.store.find('event', params.slug);
  }
});
