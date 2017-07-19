import Ember from 'ember';

export default Ember.Route.extend({
  beforeModel: function() {
    this.transitionTo('event.upcoming', {queryParams:{view: 'list'}});
  },
  model: function() {}
});
