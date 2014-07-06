var baseURL = 'http://api.vlctechhub.org/v0/';
//var baseURL = 'http://localhost:5000/v0/';

Ember.onLoad('Ember.Application', function(Application) {

});

window.App = Ember.Application.create();

Ember.Handlebars.registerBoundHelper('prettyDate', function(aDate) {
  return moment(aDate).tz('Europe/Madrid').format('DD MMMM YY - HH:mm[h]');
});

Ember.Handlebars.registerBoundHelper('linkify', function (text) {
    text = text.replace(/(https?:\/\/\S+)/gi, function (s) {
        return '<a href="' + s + '">' + s + '</a>';
    });
 
    text = text.replace(/(^|)@(\w+)/gi, function (s) {
        return '<a href="http://twitter.com/' + s + '">' + s + '</a>';
    });
 
    text = text.replace(/(^|)#(\w+)/gi, function (s) {
        return '<a href="http://search.twitter.com/search?q=' + s.replace(/#/,'%23') + '">' + s + '</a>';
     });
    return new Handlebars.SafeString(text);
});

App.Router.map(function() {
  this.resource('pastEvents');
  this.resource('newEvent');
});

App.BaseURL = baseURL;

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

App.NewEventView = Ember.View.extend({
    templateName: 'newEvent',
    didInsertElement: function() {
        Ember.$("#new-event-start-date").datetimepicker({
        	lang: 'es',
        	timepicker:false,
 			format:'d/m/Y',
 			closeOnDateSelect:true,
 			dayOfWeekStart: 1,
 			yearStart: 2014
        });
        Ember.$("#new-event-start-time").datetimepicker({
        	lang: 'es',
        	datepicker:false,
 			format:'H:i',
 			closeOnDateSelect:true,
 			allowTimes:['09:00','10:00','12:00','17:00', '17:30','18:00','18:30','19:00','20:00']
 	    });    
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
		var datetime = "%@-%@-%@T%@:00".fmt(date[2],date[1],date[0], time);
		return moment.tz(datetime,'Europe/Madrid');
	},

	createEvent:function(){

		this.resetMessages();

		var newEvent = {
			title: this.get('title'),
			description: this.get('description'),
			link: this.get('link'),
			date: this.getNewEventDate().utc().format(),
			hashtag: this.get('hashtag')
		}

		Ember.$.post(App.BaseURL + 'events/new', newEvent).then(this.showSuccessMessage.bind(this), this.showErrorMessage.bind(this));
	},

	resetModel: function(){
		this.set('title', '');
		this.set('description', '');
		this.set('link', '');
		this.set('date', '');
		this.set('time', '');
		this.set('hashtag', '');
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