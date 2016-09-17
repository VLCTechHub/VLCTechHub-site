import Ember from 'ember';

export default Ember.Controller.extend({
  actions: {
    save: function() {
      console.log('SALVARRRRRRRRRRRRRRRRRRrr');
      console.log(this.get('model'), this.get('model').serialize());
      var newJob = this.get('model');

      return newJob.save();
    }
  }
});
