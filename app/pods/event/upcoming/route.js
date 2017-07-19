import Ember from 'ember';

export default Ember.Route.extend({
  menu: Ember.inject.service(),
  titleToken: 'Próximos eventos',
  model: function(){
    return this.store.query('event', { 'category': 'next' });
  },
  activate() {
    this.get('menu').set('actionComponent', 'common/create-event-button');
  },
  deactivate() {
    this.get('menu').set('actionComponent', null);
  }
});
