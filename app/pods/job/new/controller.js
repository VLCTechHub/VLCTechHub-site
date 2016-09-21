import Ember from 'ember';

export default Ember.Controller.extend({
  saved: false,
  saveFailed: false,
  actions: {
    save: function() {
      var newJob = this.get('model');
      return newJob.save()
        .then(() => this.showSuccess())
        .then(() => this.resetForm())
        .catch(() => this.showFailure());
    }
  },
  resetForm: function() {
    this.set('model', this.get('store').createRecord('job')));
  },

  showSuccess: function() {
    this.showMessage('saved');
  },

  showFailure: function() {
    this.showMessage('saveFailed');
  },

  showMessage: function(prop) {
    this.hideMessages();
    this.set(prop, true);
    window.scrollTo(0,0);
  },

  hideMessages: function(){
    this.set('saved', false);
    this.set('saveFailed', false);
  }
});
