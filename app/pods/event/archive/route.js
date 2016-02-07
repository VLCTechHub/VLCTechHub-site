import Ember from 'ember';
import moment from 'moment';

export default Ember.Route.extend({
  model: function(params) {
    var self = this;
    var promise = new Promise(function(resolve, reject){
      var queryParams = { 'month': params.month , 'year': params.year };
      self.store.query('event', queryParams).then(function(events){
        resolve({
          year: params.year,
          month: params.month,
          monthName: moment.months(parseInt(params.month) - 1),
          events: events
        });
      });
    });
    return promise;
  }
});
