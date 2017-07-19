import Ember from 'ember';

export function initialize() {
  Ember.LinkComponent.reopen({
    attributeBindings: ['data-count']
  });
}

export default {
  name: 'modify-link-to',
  initialize
};
