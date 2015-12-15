import Ember from 'ember';

export default Ember.Component.extend({
  classNames: ['form-item'],
  classNameBindings: ['isOneColumn:pure-u-1', 'isThreeColumns:pure-u-1-3'],
  elementClass: Ember.computed('columns', function(){
    if(!this.get('columns') || this.get('columns') === '1') return 'pure-input-1';
    if(this.get('columns') === '3') return '';
  }),
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
  isOneColumn: Ember.computed('columns', function(){
    return !this.get('columns') || (this.get('columns') === '1');
  }),
  isThreeColumns: Ember.computed('columns', function(){
    return this.get('columns') === '3';
  }),
  didInsertElement: function(){
    if(!this.get('isTime')) return;

    var input = Ember.$("input[name='" +  this.get('name') + "']");
    input.timepicker({'minTime': '9:00', 'maxTime': '21:00', 'forceRoundTime': false, step: 30, timeFormat: 'H:i', 'roundingFunction' : function(i) { return i; } });
  }
});
