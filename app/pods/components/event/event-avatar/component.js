import Ember from 'ember';

export default Ember.Component.extend({
  event: null,
  classNames: "",
  hasLinktoTwitter: false,
  avatar: Ember.computed('event.hashtag', function() {
    var handle = this.get('event.hashtag');
    if(handle.indexOf('@') === 0) {
      return 'https://avatars.io/twitter/' + handle;
    }
    return 'http://dummyimage.com/256x256/000/fff&text=0x23' + handle.substring(1);
  }),
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
