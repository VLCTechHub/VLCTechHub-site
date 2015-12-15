import DS from 'ember-data';

export default DS.RESTSerializer.extend({
 normalizeQueryResponse: function(store, primaryModelClass, payload) {
    var payload_with_root = {'events' : payload };
    return this._super(store, primaryModelClass, payload_with_root);
  }
});
