import Ember from 'ember';
import moment from 'moment';

export default Ember.Route.extend({
  model: function(params) {
    var events = this.store.query('event', { 'filter':'archive', 'month': params.month, 'year': params.year });
    return {
      year: params.year,
      month: params.month,
      monthName: moment.months(parseInt(params.month) - 1),
      events: events
    };
  }
});
