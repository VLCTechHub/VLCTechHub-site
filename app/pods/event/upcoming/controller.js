import Ember from 'ember';

export default Ember.Controller.extend({
  queryParams: ['view'],
  isListVisible: Ember.computed('view', function() {
    return this.get('view') !== 'calendar';
  }),
  isCalendarVisible: Ember.computed('view', function() {
    return this.get('view') === 'calendar';
  })
});
