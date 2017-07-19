import Ember from 'ember';

export default Ember.Route.extend({
  titleToken: 'Próximos eventos',
  model: function(){
    return this.store.query('event', { 'category': 'next' });
  }
});
