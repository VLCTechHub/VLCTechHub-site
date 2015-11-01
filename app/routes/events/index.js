import Ember from 'ember';

export default Ember.Route.extend({
  model: function(){
    return [{title: 'titulo', description: 'descr', date: new Date(), link: 'http://www.wikipedia.org'}];
  }
});
