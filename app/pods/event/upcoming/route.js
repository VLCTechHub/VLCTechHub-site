import Ember from 'ember';

export default Ember.Route.extend({
  titleToken: 'Próximos eventos',
  model: function(){
    return this.store.query('event', { 'category': 'next' });
  },
  setupController(controller, model) {
    this._super(controller, model);
    this.controller.setProperties({
      isListVisible: true,
      isCalendarVisible: false
    });
  },
  actions: {
    showList() {
      this.controller.setProperties({
        isListVisible: true,
        isCalendarVisible: false
      });
    },
    showCalendar() {
      this.controller.setProperties({
        isListVisible: false,
        isCalendarVisible: true
      });
    }
  }
});
