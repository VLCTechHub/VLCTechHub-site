import Ember from 'ember';

export default Ember.Controller.extend({
  queryParams: ['view'],
  isListVisible: Ember.computed('view', function() {
    return this.get('view') !== 'calendar';
  }),
  isCalendarVisible: Ember.computed('view', function() {
    return this.get('view') === 'calendar';
  }),
  isAnnouncementVisible: Ember.computed(function() {
    var endDate = new Date(2018, 6, 3);
    var now = new Date();
    return now < endDate;
  })
});
