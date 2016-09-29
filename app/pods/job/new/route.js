import Ember from 'ember';

export default Ember.Route.extend({
  model() {
    return this.store.createRecord('job');
  },

  actions: {
    willTransition() {
      this.get('controller.model').rollbackAttributes();
      this.get('controller').hideMessages();
    }
  }

});
