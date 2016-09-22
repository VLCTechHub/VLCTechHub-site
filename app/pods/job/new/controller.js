import Ember from 'ember';

export default Ember.Controller.extend({
  saved: false,
  saveFailed: false,

  saveJob: function() {
    var job = this.get('model');
    return job.save()
      .then(() => this.showSuccess())
      .then(() => this.resetModel())
      .catch(() => this.showFailure());
  },

  resetModel: function() {
    this.set('model', this.get('store').createRecord('job'));
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
