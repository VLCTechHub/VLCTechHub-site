import Ember from 'ember';

export default Ember.Route.extend({
  moment: Ember.inject.service(),
  beforeModel: function() {
    this.get('moment').changeLocale('es');
    this.get('moment').changeTimeZone('Europe/Madrid');
    this.transitionTo('event.upcoming');
  },
  model: function() {}
});
