import Ember from 'ember';

export default Ember.Component.extend({
  elementClass: 'field',
  autosize: Ember.K,
  tagAsString: '',
  isTextarea: Ember.computed('type', function(){
    return this.get('type') === 'textarea';
  }),
  isDate: Ember.computed('type', function(){
    return this.get('type') === 'date';
  }),
  isTime: Ember.computed('type', function(){
    return this.get('type') === 'time';
  }),
  isTag: Ember.computed('type', function(){
    return this.get('type') === 'tag';
  }),
  isInput: Ember.computed('type', function(){
    return !this.get('isTextarea') &&
           !this.get('isDate') &&
           !this.get('isTime') &&
           !this.get('isTag');
  }),
  didUpdateAttrs: function() {
    if(this.get('isTag')) {
      this.set('tagAsString', this.get('value').join(','));
    }
  },
  didInsertElement: function(){
    if(this.get('isTime')) {
      this.initializeTime();
    }
    if(this.get('isTextarea')) {
      this.initializeTextarea();
    }
  },
  initializeTime: function(){
    var input = Ember.$("input[name='" +  this.get('name') + "']");
    input.timepicker({'minTime': '9:00', 'maxTime': '21:00', 'forceRoundTime': false, step: 30, timeFormat: 'H:i', 'roundingFunction' : function(i) { return i; } });
  },
  initializeTextarea: function(){
    var autosize = this.get('autosize');
    autosize(this.$('textarea'));
  },
  actions: {
    setTag: function() {
      var tagAsString = this.get('tagAsString');
      var tags = tagAsString.replace(/\s+/g,'').split(',');
      this.set('value', tags);
    }
  }
});
