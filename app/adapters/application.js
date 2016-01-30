import DS from 'ember-data';

export default DS.RESTAdapter.extend({
  host: window.VlcTechHub.API_HOST,
  namespace: 'v1'
});
