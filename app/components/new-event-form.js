import Ember from 'ember';

export default Ember.Component.extend({
  time: '',
  isValid: true,
  actions: {
    create: function() { this.createEvent(); }
  },
  formattedDate: Ember.computed('model.date', function(){
    var date = moment(this.get('model.date'));
    return date.format('YYYY-MM-DD');
  }),
  formattedTime: Ember.computed('time', function(){
    return this.get('time') || '00:00';
  }),
  eventDateTime: Ember.computed('model.date', 'time', function(){
    var datetime = "%@T%@:00".fmt(this.get('formattedDate'), this.get('formattedTime'));
    return new Date(moment.tz(datetime,'Europe/Madrid').toISOString());
  }),
  createEvent: function() {
    if(this.validate()){
      this.set('model.date', this.get('eventDateTime'));
      this.get('model').save().then(function(){
        this.set('isSaved', true);
        this.clearData();
      }, function() {
        this.set('isValid', false);
      });
    }
  },
  validate: function() {
    var required = ['model.title', 'model.description', 'model.link', 'time', 'model.date'];
    var isValid = required.every(function(key){
      return this.get(key) !== null;
    }, this);

    isValid = isValid && this.validateTimeFormat();

    this.set('isValid', isValid);
    return isValid;
  },
  validateTimeFormat: function() {
    var timeRegex = /([01]\d|2[0-3]):([0-5]\d)/;
    return timeRegex.test(this.get('time'));
  },
  clearData: function() {
    var keys = ['model.title', 'model.description', 'model.link', 'time', 'model.date', 'model.hashtag'];
    keys.forEach(function(key){
      this.set(key, null);
    }, this);
  }
});
