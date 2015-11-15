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
  },
  createRecord: function(store, type, snapshot) {
    var data = this.serialize(snapshot);
    var url = this.completeURL('new');

    return new Ember.RSVP.Promise(function(resolve, reject) {
      Ember.$.ajax({
        type: 'POST',
        url: url,
        dataType: 'json',
        data: data
      }).then(function(data) {
        Ember.run(null, resolve, data);
      }, function(jqXHR) {
        jqXHR.then = null; // tame jQuery's ill mannered promises
        Ember.run(null, reject, jqXHR);
      });
    });
  }
});
