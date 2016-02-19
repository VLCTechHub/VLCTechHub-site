import Ember from 'ember';
import moment from 'moment';

export default Ember.Controller.extend({
  mobileMenuExpanded: false,
  currentMonth: Ember.computed(function(){
    return moment().format('MM');
  }),
  currentYear: Ember.computed(function(){
    return moment().format('YYYY');
  })
});
