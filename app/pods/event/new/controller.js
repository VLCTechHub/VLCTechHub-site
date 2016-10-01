import Ember from 'ember';

export default Ember.Controller.extend({
  actions: {
    saveEvent: function(newEvent){
      var self = this;
      self.preSave();
      newEvent.save().then(function() {
        self.set('model', self.store.createRecord('event'));
        self.postSave(true);
      }, function(){
        self.postSave(false);
      });
    }
  },
  preSave: function(){
    this.set('saved', false);
    this.set('saveFailed', false);
    this.set('isSaving', true);
  },
  postSave: function(success) {
    if(success) {
      this.set('saved', true);
    } else {
      this.set('saveFailed', true);
    }
    this.set('isSaving', false);
    window.scrollTo(0,0);
  },
  reset: function() {
    this.set('saved', false);
    this.set('saveFailed', false);
  }
});
