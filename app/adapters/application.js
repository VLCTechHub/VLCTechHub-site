import DS from 'ember-data';

export default DS.RESTAdapter.extend({
  host: 'http://vlctechhub-api.herokuapp.com/v0'
});
