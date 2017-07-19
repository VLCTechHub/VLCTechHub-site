import Ember from 'ember';

export default Ember.Component.extend({
  tagName: 'header',
  classNames: ['menu', '-desktop'],
  totalJobs: 0,
  actionComponent: null,
  isAgendaActive: Ember.computed('currentPath', function() {
    return this.get('currentPath') === 'events.upcoming';
  })
});
