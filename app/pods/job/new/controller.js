import Ember from 'ember';

export default Ember.Controller.extend({
  saved: false,
  saveFailed: false,
  actions: {
    save: function() {
      var newJob = this.get('model');

      return newJob.save()
        .then(() => this.set('saved', true))
        .catch(() => this.set('saveFailed', true));
    }
  }
});
