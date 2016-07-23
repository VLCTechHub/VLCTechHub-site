import Ember from 'ember';
import DS from 'ember-data';
import moment from 'moment';

export default DS.Model.extend({
  title: DS.attr('string'),
  description: DS.attr('string'),
  link: DS.attr('string'),
  date: DS.attr('date'),
  hashtag: DS.attr('string'),
  slug: DS.attr('string'),
  isPastEvent: Ember.computed('date', function(){
    if(this.get('date') < Date.now() ) { return true; }
    return false;
  }),
  time: Ember.computed('date', {
    get() {
      if(Ember.isEmpty(this.get('date'))) { return null; }
      return this.get('date').toISOString().substring(11,16);
    },
    set(key, value) {
      var timeRegex = /([01]\d|2[0-3]):([0-5]\d)/;
      var isValid = timeRegex.test(value);
      if (!isValid) { return '';}
      var formattedDate = moment(this.get('date')).format('YYYY-MM-DD');
      var datetime = `${formattedDate} ${value}`;
      this.set('date', new Date(moment.tz(datetime,'YYYY-MM-DD HH:mm','Europe/Madrid')));
      return value;
    }
  }),
  excerpt: Ember.computed('description', function(){
    let exp = new RegExp('.*');
    return exp.exec(this.get('description'))[0];
  }),
  isValid: Ember.computed('title', 'description', 'link', 'date', 'time', function(){
    var required = ['title', 'description', 'link', 'date', 'time' ];
    var isValid = required.every(function(property) {
      return !Ember.isEmpty(this.get(property));
    }, this);
    return isValid;
  }),
  calendarURL: Ember.computed('title', 'link', 'date', function() {
    var zeroPad = function(number) {
      return ("0" + number).slice(-2);
    };
    var isoDate = function(date) {
      return date.getUTCFullYear() + zeroPad(date.getUTCMonth() + 1) + zeroPad(date.getUTCDate()) + 'T' +
        zeroPad(date.getUTCHours()) + zeroPad(date.getUTCMinutes()) + zeroPad(date.getUTCSeconds()) + 'Z';
    };

    var title = encodeURIComponent(this.get('title'));
    var details = encodeURIComponent('Más info: ' + this.get('link'));
    var startDate = new Date(this.get('date'));
    var endDate = new Date(this.get('date'));
    endDate.setHours(endDate.getHours() + 1);
    var dates = isoDate(startDate) + '/' + isoDate(endDate);

    var url = 'https://www.google.com/calendar/event?action=TEMPLATE&text=' + title + '&dates=' + dates + '&details='+ details;
    return url;
  })
});
