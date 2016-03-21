import Ember from 'ember';
import moment from 'moment';

export default Ember.Route.extend({
  beforeModel(transition) {
    if(transition.targetName == 'event.archive.month.detail') { return;}

    var year = moment().format('YYYY');
    var month = moment().format('MM');
    this.transitionTo('event.archive.month', year, month);
  }
});
