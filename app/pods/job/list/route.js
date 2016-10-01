import Ember from 'ember';

export default Ember.Route.extend({
  titleToken: function(){
    return 'Empleos tecnológicos';
  },
  headTags: function() {
    return [{
      type: 'meta',
      tagId: 'meta-description-tag',
      attrs: {
        name: 'description',
        content: "VLCTechHub es el hub de eventos tecnológicos en Valencia. Encuentra tu nuevo empleo en VLCTechHub. Oferta empleos de software orientados a programadores, diseñadores, administradores de sistemas..."
      }
    }];
  },
  model: function() {
    return this.modelFor('application').get('jobs');
  },
  actions: {
   willTransition: function(){
      this.controller.set('selected', null);
    }
  }
});
