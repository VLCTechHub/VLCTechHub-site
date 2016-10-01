import Ember from 'ember';

export default Ember.Component.extend({
  event: null,
  isSubmitting: false,
  onSubmit: Ember.K,
  buttonText: Ember.computed('isSubmitting', function(){
    var text = 'Publicar';
    if(this.get('isSubmitting')) {
      text = 'Publicando...';
    }
    return text;
  }),
  isButtonDisabled: Ember.computed('event.isValid', 'isSubmitting', function(){
    if(!this.get('event.isValid') || this.get('isSubmitting')) { return true; }
    return false;
  }),
  isChromeExtensionHintVisible: Ember.computed('event.link', function(){
    var supportedSites = ['http://www.meetup.com/', 'http://www.eventbrite.es/e/'];
    var link = this.get('event.link') || '';
    return supportedSites.some(function(site){ return link.indexOf(site) === 0; });
  }),
  actions: {
    submit: function(params) {
      if(!this.get('isSubmitting')){
        this.set('isSubmitting', true);
        return this.get('onSubmit')(params);
      }
    }
  }
});
