import Ember from 'ember';
import config from './config/environment';

var Router = Ember.Router.extend({
  location: config.locationType
});

Router.map(function() {
  this.route('index', {path: '/'});

  this.route('event', { path: 'events' }, function(){
    this.route('archive', function(){
      this.route('month', { path: '/:year/:month'}, function(){
        this.route('detail', { path: '/:event_id'});
      });
    });
    this.route('new');
    this.route('upcoming');
    this.route('detail', { path: '/:slug' });
  });

  this.route('job', function() {
    this.route('list', { path: '/board' },  function() {
      this.route('detail', { path: '/:job_id' });
    });
    this.route('new');
  });
});

export default Router;
