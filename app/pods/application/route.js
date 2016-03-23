import Ember from 'ember';

export default Ember.Route.extend({
  title: function(tokens) {
    tokens.unshift('VLCTechHub');
    return tokens.reverse().join(' | ');
  },
  headTags: function() {
    return [{
      type: 'meta',
      tagId: 'meta-description-tag',
      attrs: {
        name: 'description',
        content: "VLCTechHub es el hub de eventos y empleo tecnológico en Valencia: eventos de programación, coding dojos, talleres, workshops o quedadas informales para fomentar una comunidad o compartir información de base tecnológica en Valencia o Castellón."
      }
    }];
  },
  model: function(){
    return Ember.Object.create({
      jobs: this.store.findAll('job')
    });
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
