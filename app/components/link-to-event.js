import Ember from 'ember';

export default Ember.Component.extend({
  tagName: 'a',
  classNames: ['ml1'],
  attributeBindings: ['href', 'target'],
  target: '_blank',
  href: Ember.computed.alias('event.link')
});
