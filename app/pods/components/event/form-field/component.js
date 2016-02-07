import Ember from 'ember';

export default Ember.Component.extend({
  elementClass: 'field block col-12 mb3',
  isTextarea: Ember.computed('type', function(){
    return this.get('type') === 'textarea';
  }),
  isDate: Ember.computed('type', function(){
    return this.get('type') === 'date';
  }),
  isTime: Ember.computed('type', function(){
    return this.get('type') === 'time';
  }),
  isInput: Ember.computed('type', function(){
    return !this.get('isTextarea') && !this.get('isDate') && !this.get('isTime');
  }),
  didInsertElement: function(){
    if(!this.get('isTime')) return;

    var input = Ember.$("input[name='" +  this.get('name') + "']");
    input.timepicker({'minTime': '9:00', 'maxTime': '21:00', 'forceRoundTime': false, step: 30, timeFormat: 'H:i', 'roundingFunction' : function(i) { return i; } });
  }
});
