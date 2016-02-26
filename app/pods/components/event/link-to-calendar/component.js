import Ember from 'ember';

export default Ember.Component.extend({
  tagName: 'a',
  classNames: ['link-to-calendar'],
  attributeBindings: ['href', 'title', 'target'],
  title: 'Añadir a Google Calendar',
  target: '_blank',
  href: Ember.computed('title', 'uri', 'date', function() {
    var zeroPad = function(number) {
      return ("0" + number).slice(-2);
    };
    var isoDate = function(date) {
      return date.getUTCFullYear() + zeroPad(date.getUTCMonth() + 1) + zeroPad(date.getUTCDate()) + 'T' +
        zeroPad(date.getUTCHours()) + zeroPad(date.getUTCMinutes()) + zeroPad(date.getUTCSeconds()) + 'Z';
    };

    var title = encodeURIComponent(this.get('title'));
    var details = encodeURIComponent('Más info: ' + this.get('uri'));
    var startDate = new Date(this.get('date'));
    var endDate = new Date(this.get('date'));
    endDate.setHours(endDate.getHours() + 1);
    var dates = isoDate(startDate) + '/' + isoDate(endDate);

    var url = 'https://www.google.com/calendar/event?action=TEMPLATE&text=' + title + '&dates=' + dates + '&details='+ details;
    return url;
  })
});
