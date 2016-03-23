import Ember from 'ember';
import DS from 'ember-data';
import moment from 'moment';

export default DS.Model.extend({
  title: DS.attr('string'),
  description: DS.attr('string'),
  link: DS.attr('string'),
  date: DS.attr('date'),
  hashtag: DS.attr('string'),
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
  })
});
