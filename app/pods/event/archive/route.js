import Ember from 'ember';
import moment from 'moment';

export default Ember.Route.extend({
  model: function(params) {
    this.set('date', { year: params.year, month: params.month });
    const queryParams = { 'month': params.month , 'year': params.year };

    return this.store.query('event', queryParams).then(
      events => ({
        year: params.year,
        month: params.month,
        monthName: moment.months(parseInt(params.month) - 1),
        events: events })
      );
  },
  actions: {
    expand(event){
      this.transitionTo('event.archive.detail', this.get('date.year'), this.get('date.month'), event);
    },

    collapse(params){
      this.transitionTo('event.archive', this.get('date.year'), this.get('date.month'));
    },

    willTransition(){
      this.controller.set('selected', null);
    }
  }
});
