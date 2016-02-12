import Ember from 'ember';
import config from './config/environment';

var Router = Ember.Router.extend({
  location: config.locationType
});

Router.map(function() {
  this.route('index', {path: '/'});

  this.route('event', { path: 'events' }, function(){
    this.route('upcoming', function(){
      this.route('detail', { path: '/:event_id'});
    });
    this.route('archive', { path: '/archive/:year/:month' }, function(){
      this.route('detail', { path: '/:event_id'});
    });
    this.route('latest');
    this.route('new');
  })
});

export default Router;
