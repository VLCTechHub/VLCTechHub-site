import Ember from 'ember';

export function format([date, format='LL']) {
  return window.moment(date).format(format);
}

export default Ember.Helper.helper(format);
