import DS from 'ember-data';

export default DS.Adapter.extend({
  host: 'http://vlctechhub-api.herokuapp.com/v0',
  findAll: function(store, type, sinceToken) {
    var url = this.host + '/events/upcoming';
    return $.get(url);
  }
});
