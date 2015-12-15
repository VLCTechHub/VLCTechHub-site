import Ember from 'ember';

export default Ember.Component.extend({
  years: Ember.computed(function(){
    var years = [];
    var currentYear = new Date().getFullYear();
    for(var i=2013; i <= currentYear; i++){
      years.push(i);
    }
    return years;
  })
});
