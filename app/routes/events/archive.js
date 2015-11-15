import Ember from 'ember';

export default Ember.Route.extend({
  model: function(params) {
    return this.store.query('event', { 'filter':'archive', 'month': params.month, 'year': params.year });
  }
});
