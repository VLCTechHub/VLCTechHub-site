import Ember from 'ember';

export default Ember.Component.extend({
  tagName: 'ul',
  classNames: ['event-cards'],
  events: Ember.computed(() => [])
});
