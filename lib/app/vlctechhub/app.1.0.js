//var baseURL = 'http://api.vlctechhub.org/v0/';
var baseURL = 'http://localhost:5000/v0/';

Ember.onLoad('Ember.Application', function(Application) {

});

window.App = Ember.Application.create();

Ember.Handlebars.registerBoundHelper('prettyDate', function(aDate) {
  return moment(aDate).tz('Europe/Madrid').format('DD MMMM YY - HH:mm[h]');
});

Ember.Handlebars.registerBoundHelper('linkify', function (text) {
    text = text.replace(/\n/g, "<br />");
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

Ember.MonthButton = Ember.View.extend({  
    tagName : "input",
    type : "radio",
    classNames: ["month-picker-label"],
    attributeBindings : [ "name", "type", "value", "checked:checked:" ],
    click : function(evt) {
      	this.set("selection", this.$().val());
        this.get('controller').send('setMonth', this.get('selection'));
    },
    checked : function() {
        return this.get("value") == this.get("selection");   
    }.property()
});

Ember.YearButton = Ember.View.extend({  
    tagName : "input",
    type : "radio",
    classNames: ["year-picker-label"],
    attributeBindings : [ "name", "type", "value", "checked:checked:" ],
    click : function(evt) {
      	this.set("selection", this.$().val());
        this.get('controller').send('setYear', this.get('selection'));
    },
    checked : function() {
        return this.get("value") == this.get("selection");   
    }.property()
});
    
App.Router.map(function() {
  this.resource("events", { path: "/" }, function() {
    this.route("new", { path: "/new" });
    this.route("past", { path: "/past" });
  });
  this.resource('archive', { path: '/archive' }, function(){
  	this.route('month', { path: '/:year/:month' });
  });
});

App.BaseURL = baseURL;

App.IndexRoute = Ember.Route.extend({});

App.EventsRoute = Ember.Route.extend({
	model: function(){
		return Ember.$.getJSON(App.BaseURL + 'events/upcoming');
	}
});

App.EventsPastRoute = Ember.Route.extend({
	model: function(){
		console.log('events past')
		return Ember.$.getJSON(App.BaseURL + 'events/past');
	}
});

App.ArchiveRoute = Ember.Route.extend({
	beforeModel: function() {
		now = new Date();
		this.transitionTo('archive.month', now.getFullYear(), now.getMonth() + 1);
	},
	model: function() { return [] }
});

App.ArchiveMonthRoute = Ember.Route.extend({
	model: function(params){
		//console.log('route', params.year);
		this.set('year', params.year);
		return Ember.$.getJSON(App.BaseURL + 'events/past');
	},
	year: function(){

	}
});

App.ArchiveMonthController = Ember.ArrayController.extend({
	actions: {
		setMonth: function(month){
			console.log('controller received ', month);
		}
	},
	month: function(){
		return 'jul';
	}.property()
});

App.EventsNewView = Ember.View.extend({
    templateName: 'events/new',
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


App.EventsNewController = Ember.Controller.extend({
	actions: {
		create: function() { this.createEvent(); },
		reset: function() { this.resetMessages(); }
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