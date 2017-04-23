import Ember from 'ember';

export default Ember.Controller.extend({
  sortCriteria: ['published_at:desc'],
  jobs: Ember.computed('model', function() {
    return this.get('model').filterBy('isPublished').sortBy('published_at').reverse();
  }),
});
