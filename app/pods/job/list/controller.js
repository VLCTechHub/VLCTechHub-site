import Ember from 'ember';

export default Ember.Controller.extend({
  sortCriteria: ['published_at:desc'],
  jobs: Ember.computed.sort('model', 'sortCriteria')
});
