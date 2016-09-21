import Ember from 'ember';

export default Ember.Controller.extend({
  saved: false,
  saveFailed: false,
  actions: {
    save: function() {
      var newJob = this.get('model');

      return newJob.save()
        .then(() => this.showSuccess())
        .catch(() => this.showFailure());
    }
  },
  showSuccess: function() {
    this.enableMessage('saved')
  },

  showFailure: function() {
    this.enableMessage('saveFailed')
  },

  enableMessage: function(prop) {
    this.hideMessages();
    this.set(prop, true);
    window.scrollTo(0,0);
  },

  hideMessages: function(){
    this.set('saved', false);
    this.set('saveFailed', false);
  }
});
