import Ember from 'ember';
import config from './config/environment';

var Router = Ember.Router.extend({
  location: config.locationType
});

Router.map(function() {
  this.route('index', {path: '/'});
  this.route('events', function() {
    this.route('upcoming');
    this.route('latest');
    this.route('new');
    this.route('archive', { path: '/archive/:year/:month' });
  });
});

export default Router;
