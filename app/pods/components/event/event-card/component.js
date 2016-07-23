import Ember from 'ember';

export default Ember.Component.extend({
  event: null, 
  avatar: Ember.computed('event.hashtag', function() {
    var handle = this.get('event.hashtag');
    if(handle.indexOf('@') === 0) {
      return 'https://avatars.io/twitter/' + handle;
    }
    return 'http://dummyimage.com/256x256/000/fff&text=0x23' + handle.substring(1);
  })
});
