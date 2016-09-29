import Ember from 'ember';
import moment from 'moment';

export default Ember.Controller.extend({
  mobileMenuExpanded: false,
  currentMonth: Ember.computed(function(){
    return moment().format('MM');
  }),
  currentYear: Ember.computed(function(){
    return moment().format('YYYY');
  }),
  totalJobs: Ember.computed('model.jobs.@each', function(){
    return this.get('model.jobs').filterBy('isPublished').get('length');
  })
});
