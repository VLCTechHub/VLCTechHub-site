import Ember from 'ember';

export default Ember.Route.extend({
  model: function(){
    return [{title: 'latest titulo', date: new Date(), url: 'http://www.wikipedia.org', description: 'description here'}];

    // return this.store.findAll('event');
  }
});
