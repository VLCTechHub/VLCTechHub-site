import DS from 'ember-data';
import Ember from 'ember';

export default DS.RESTAdapter.extend({
  baseURL: 'http://vlctechhub-api.herokuapp.com/v0/events',
  completeURL: function(partialURL) {
    return `${this.baseURL}/${partialURL}`;
  },
  urlForQuery: function(query) {
    return this.completeURL(query.filter);
  },
  query: function(store, type, query) {
    if (!query.filter) return [];
    var partialURL = query.filter;
    if (query.filter == 'latest') partialURL = 'past';
    if (query.filter == 'archive') partialURL = `${query.year}/${query.month}`;
    return $.get(this.completeURL(partialURL));
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
