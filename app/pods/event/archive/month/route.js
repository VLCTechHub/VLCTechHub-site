import Ember from 'ember';
import moment from 'moment';

export default Ember.Route.extend({
  titleToken: 'Archivo',
  model: function(params) {
    const date = { year: params.year, month: params.month };
    this.set('date', date);

    return this.store.query('event', date).then(
      events => (Ember.Object.create({
        year: params.year,
        month: params.month,
        monthName: moment.months(parseInt(params.month) - 1),
        events: events }))
      );
  },
  actions: {
    expand(event){
      this.transitionTo('event.archive.month.detail', this.get('date.year'), this.get('date.month'), event);
    },

    collapse(params){
      this.transitionTo('event.archive.month', this.get('date.year'), this.get('date.month'));
    },

    willTransition(){
      this.controller.set('selected', null);
    }
  }
});
