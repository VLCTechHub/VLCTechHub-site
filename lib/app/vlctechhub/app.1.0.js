window.App = Ember.Application.create();

Ember.Handlebars.registerBoundHelper('prettyDate', function(aDate) {
  return moment(aDate).format('DD.MM.YY - HH:mm');
});

App.Router.map(function() {
  this.resource('pastEvents');
  this.resource('newEvent');
});

App.BaseURL = 'http://localhost:5000/v0/';

App.IndexRoute = Ember.Route.extend({
	model: function(){
		return Ember.$.getJSON(App.BaseURL + 'events/upcoming');
	}
});

App.PastEventsRoute = Ember.Route.extend({
	model: function(){
		return Ember.$.getJSON(App.BaseURL + 'events/past');
	}
});

App.NewEventController = Ember.Controller.extend({
	actions: {
		create: function() { this.createEvent(); }
	},

	getNewEventDate: function(){
		var date = this.get('date').split('/');
		if(date.length < 3) return;
		var time = this.get('time') || '00:00';
		return "%@-%@-%@T%@:00-01:00".fmt(date[2],date[1],date[0], time);
	},

	createEvent:function(){

		this.resetMessages();

		var newEvent = {
			title: this.get('title'),
			description: this.get('description'),
			link: this.get('link'),
			date: this.getNewEventDate()
		}

		Ember.$.post(App.BaseURL + 'events/new', newEvent).then(this.showSuccessMessage.bind(this), this.showErrorMessage.bind(this));
	},

	resetModel: function(){
		this.set('title', '');
		this.set('description', '');
		this.set('link', '');
		this.set('date', '');
		this.set('time', '');
	},

	resetMessages: function(){
		this.set('success', false);
		this.set('error', false);
	},

	showSuccessMessage: function() {
		this.set('success', true);
		this.resetModel();
	},

	showErrorMessage: function() {
		this.set('error', true);
	}
});