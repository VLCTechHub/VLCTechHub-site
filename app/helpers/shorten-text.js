import Ember from 'ember';

export function shorten([text, size]) {
  if(text.length <= size) {
    return text;
  }
  return text.substring(0,size) + '...';
}

export default Ember.Helper.helper(shorten);
