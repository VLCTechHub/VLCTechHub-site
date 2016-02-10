import Ember from 'ember';

export default Ember.Component.extend({
  tagName: 'a',
  classNames: ['ml1'],
  attributeBindings: ['href', 'target', 'title'],
  title: 'Ver fuente',
  target: '_blank',
  href: Ember.computed.alias('event.link')
});
