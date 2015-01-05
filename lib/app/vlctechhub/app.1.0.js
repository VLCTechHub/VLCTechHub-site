var baseURL = 'http://vlctechhub-api.herokuapp.com/v0/';
//var baseURL = 'http://api.vlctechhub.org/v0/';
//var baseURL = 'http://localhost:5000/v0/';

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
    this.route("upcoming", { path: "/upcoming"});
    this.route("new", { path: "/new" });
    this.route("past", { path: "/past" });
  });
  this.resource('archive', { path: '/archive' }, function(){
  	this.route('month', { path: '/:year/:month' });
  });
});

App.BaseURL = baseURL;

App.IndexRoute = Ember.Route.extend({});

App.EventsIndexRoute = Ember.Route.extend({
	renderTemplate: function() {
    	this.render('events.upcoming');
  	},
	model: function(){
		return Ember.$.getJSON(App.BaseURL + 'events/upcoming');
	}
});

App.EventsUpcomingRoute = Ember.Route.extend({
	model: function(){
		return Ember.$.getJSON(App.BaseURL + 'events/upcoming');
	}
});

App.EventsPastRoute = Ember.Route.extend({
	model: function(){
		return Ember.$.getJSON(App.BaseURL + 'events/past');
	}
});

App.ArchiveRoute = Ember.Route.extend({
	beforeModel: function(params) {
		var now = new Date();
		this.transitionTo('archive.month', now.getFullYear(), now.getMonth() + 1);
	},
	model: function(params) { return [] }
});

App.ArchiveMonthRoute = Ember.Route.extend({
	actions:{
		changeMonth: function(month){
			this.set('month', month);
			this.transitionTo('archive.month', this.getYear(), this.getMonth());
		},
		changeYear: function(year){
			this.set('year', year);
			this.transitionTo('archive.month', this.getYear(), this.getMonth());
		}
	},
	model: function(params){
		this.updateData(params);
		return this.fetch();
	},
	updateData: function(params){
		this.set('year', params.year);
		this.set('month', params.month);
	},
	fetch: function(){
		var month = this.getMonth().toString();
		var pad = "00";
		month = pad.substring(0, pad.length - month.length) + month;
		return Ember.$.getJSON(App.BaseURL + 'events/' + this.getYear() + '/' + month);
	},
	setupController: function(controller, model){
		controller.set('model', model);
		controller.set('year', this.getYear());
		controller.set('month', this.getMonth());
	},
	getYear: function(){
		var year = parseInt(this.get('year'));
		var valid = [2013, 2014].indexOf(year) > -1;
		return valid ? year : this.getActualYear();
	},
	getActualYear: function(){
	  var now = new Date();
	  return now.getFullYear();
	},
	getMonth: function(){
		var month = parseInt(this.get('month'));
		var valid = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12].indexOf(month) > -1;
		return valid ? month : this.getActualMonth();		
	},
	getActualMonth: function(){
		var now = new Date();
		return now.getMonth() + 1;
	}
});

App.ArchiveMonthController = Ember.ArrayController.extend({
	actions: {
		setMonth: function(month){
			this.set('month', month);
			this.get('target').send('changeMonth', month);
		},
		setYear: function(year){
			this.set('year', year);
			this.get('target').send('changeYear', year);
		}
	}
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
