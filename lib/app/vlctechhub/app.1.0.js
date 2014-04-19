window.VTH = Ember.Application.create();


VTH.Router.map(function() {
  //this.resource('events', { path: '/' });
});

VTH.BaseURL = 'http://localhost:5000/v0/';

VTH.IndexRoute = Ember.Route.extend({
	model: function(){
		return Ember.$.getJSON(VTH.BaseURL + 'events/upcoming');
	}
})

VTH.IndexController = Ember.ArrayController.extend({

});