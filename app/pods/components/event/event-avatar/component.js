import Ember from 'ember';

export default Ember.Component.extend({
  event: null,
  classNames: "event-avatar",
  hasLinktoTwitter: false,
  avatar: Ember.computed('event.hashtag', function() {
    var handle = this.get('event.hashtag') || '';
    if(handle.indexOf('@') === 0) {
      return 'http://res.cloudinary.com/vlctechhub/image/twitter_name/w_240/' +
              handle.substring(1) +
              '.jpg';
    }
    return 'http://dummyimage.com/256x256/000/fff.gif&text=%23' + handle.substring(1);
  }),
  href: Ember.computed('event.hashtag', function(){
    var handler = this.get('event.hashtag');
    if(Ember.isEmpty(handler)) { return ''; }
    var userURL = 'https://twitter.com/';
    var hashtagURL = 'https://twitter.com/hashtag/';
    var uriHandler = handler.substring(1, handler.length);
    if(handler.indexOf('#') === 0) {
      return hashtagURL + uriHandler;
    }
    return userURL + uriHandler;
  })
});
