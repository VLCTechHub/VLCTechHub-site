import Ember from 'ember';

export default Ember.Route.extend({
  titleToken: 'Publicar evento',
  model() {
    return this.store.createRecord('event');
  },
  actions: {
    saveEvent: function(newEvent){
      var self = this;
      self.controller.set('saved', false);
      self.controller.set('saveFailed', false);

      newEvent.save().then(function(){
        self.controller.set('saved', true);
        self.controller.set('model', self.store.createRecord('event'));
        self.controller.set('isSaving', false);
      }, function(){
        self.controller.set('saveFailed', true);
        self.controller.set('isSaving', false);
      });
    },
    willTransition: function(){
      this.controller.set('saved', false);
      this.controller.set('saveFailed', false);
    }
  },
});
