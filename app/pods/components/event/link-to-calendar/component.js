import Ember from 'ember';

export default Ember.Component.extend({
  tagName: 'a',
  classNames: ['link-to-calendar'],
  classNameBindings: ['event.isPastEvent:hide'],
  attributeBindings: ['href', 'title', 'target'],
  title: 'Añadir a Google Calendar',
  target: '_blank',
  href: Ember.computed('event', function() {
    var zeroPad = function(number) {
      return ("0" + number).slice(-2);
    };
    var isoDate = function(date) {
      return date.getUTCFullYear() + zeroPad(date.getUTCMonth() + 1) + zeroPad(date.getUTCDate()) + 'T' +
        zeroPad(date.getUTCHours()) + zeroPad(date.getUTCMinutes()) + zeroPad(date.getUTCSeconds()) + 'Z';
    };

    var title = encodeURIComponent(this.get('event.title'));
    var details = encodeURIComponent('Más info: ' + this.get('event.link'));
    var startDate = new Date(this.get('event.date'));
    var endDate = new Date(this.get('event.date'));
    endDate.setHours(endDate.getHours() + 1);
    var dates = isoDate(startDate) + '/' + isoDate(endDate);

    var url = 'http://www.google.com/calendar/event?action=TEMPLATE&text=' + title + '&dates=' + dates + '&details='+ details;
    return url;
  })
});
