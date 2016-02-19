import Ember from 'ember';
import moment from 'moment';

export default Ember.Route.extend({
  redirect(model, transition) {
    var year = moment().format('YYYY');
    var month = moment().format('MM');
    this.transitionTo('event.archive.month', year, month);
  }
});
