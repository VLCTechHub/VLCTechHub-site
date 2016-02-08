import DS from 'ember-data';
import ENV from 'vlc-tech-hub/config/environment';

export default DS.RESTAdapter.extend({
  host: ENV.APP.API_HOST,
  namespace: 'v1'
});
