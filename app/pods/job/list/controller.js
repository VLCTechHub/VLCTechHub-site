import Ember from 'ember';

export default Ember.Controller.extend({
  sortCriteria: ['published_at:desc'],
  jobs: Ember.computed('model', function() {
    return this.get('model').filterBy('isPublished').sortBy('published_at').reverse();
  }),
  actions: {
     expand: function(job){
      this.transitionToRoute('job.list.detail', job);
    },
    collapse: function(){
      this.transitionToRoute('job.list');
    }
  }
});
