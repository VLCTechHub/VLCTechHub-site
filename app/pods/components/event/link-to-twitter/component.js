import Ember from 'ember';

export default Ember.Component.extend({
  tagName: 'a',
  classNames: ['black'],
  attributeBindings: ['href', 'target', 'text'],
  target: '_blank',
  text: Ember.computed.alias('event.hashtag'),
  href: Ember.computed('event.hashtag', function(){
    var handler = this.get('event.hashtag');
    var userURL = 'https://twitter.com/';
    var hashtagURL = 'https://twitter.com/hashtag/';
    var uriHandler = handler.substring(1, handler.length);
    if(handler.indexOf('#') === 0) {
      return hashtagURL + uriHandler;
    }
    return userURL + uriHandler;
  })
});
