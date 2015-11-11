import DS from 'ember-data';

export default DS.RESTAdapter.extend({
  host: 'http://vlctechhub-api.herokuapp.com/v0',
  modelName: 'event',
  completeURL: function(partialURL){
    return this._buildURL(this.modelName, partialURL);
  },
  urlForQuery: function(query, modelName) {
    return this.completeURL(query.filter);
  },
  query: function(store, type, query) {
    if (!query.filter) return [];
    var filter = query.filter;
    if (query.filter == 'latest') filter = 'past';
    return $.get(this.completeURL(filter));
  }
});
