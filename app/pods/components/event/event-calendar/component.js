import Ember from 'ember';
import moment from 'moment';

export default Ember.Component.extend({
  classNames: ['monthly'],
  events: Ember.computed(() => []),
  sanitizedEvents: Ember.computed('events', function() {
    return this.get('events').map((e) => {
      return {
        id: e.get('id'),
        name: this._getEventName(e),
        startdate: moment(e.get('date')).format('YYYY-MM-DD'),
        starttime: moment(e.get('date')).format('HH:mm'),
        url: e.get('slug'),
        color: '#9f4b99'
      };
    });
  }),
  didInsertElement() {
    var events = this.get('sanitizedEvents');
    this.$().monthly({
      weekStart: 'Mon',
      mode: 'event',
      stylePast: true,
      locale: 'es',
      dataType: 'json',
      events: { monthly: events }
    });
  },
  _getEventName(e) {
    if(!e.get('hashtag')) { return e.get('title'); }
    return e.get('hashtag') + ' - ' + e.get('title');
  }
});
