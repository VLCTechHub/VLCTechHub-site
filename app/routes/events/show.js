export default Ember.Route.extend({
  model: function(params) {
    return { status: 404 };
  }
});