import Ember from 'ember';

export default Ember.Route.extend({
  title: function(tokens) {
    tokens.unshift('VLCTechHub');
    return tokens.reverse().join(' | ');
  },
  actions: {
    toggleMobileMenu: function(){
      this.controller.toggleProperty('mobileMenuExpanded');
    },
    loading: function(){
      if(!Ember.isEmpty(this.controller)) {
        this.controller.set('mobileMenuExpanded', false);
      }
      return true;
    },
    didTransition: function(){
      this.controller.set('mobileMenuExpanded', false);
    }
  }
});
