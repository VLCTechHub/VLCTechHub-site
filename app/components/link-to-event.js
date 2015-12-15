import Ember from 'ember';

export default Ember.Component.extend({
  tagName: 'a',
  classNames: ['muted'],
  attributeBindings: ['href', 'target'],
  target: '_blank',
  href: Ember.computed.alias('event.link')
});
