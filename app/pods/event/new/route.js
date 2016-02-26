import Ember from 'ember';

export default Ember.Route.extend({
  titleToken: 'Publicar evento',
  model() {
    return this.store.createRecord('event');
  },
  actions: {
    saveEvent: function(newEvent){
      var self = this;
      self.controller.preSave();
      newEvent.save().then(function() {
        self.controller.set('model', self.store.createRecord('event'));
        self.controller.postSave(true);
      }, function(){
        self.controller.postSave(false);
      });
    },
    willTransition: function(){
      this.controller.reset();
    }
  },
});
