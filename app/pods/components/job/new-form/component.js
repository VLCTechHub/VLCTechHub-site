import Ember from 'ember';

export default Ember.Component.extend({
  job: null,
  onSubmit: Ember.K,
  actions: {
    submit: function() {
      return this.get('onSubmit')();
    }
  }
});
