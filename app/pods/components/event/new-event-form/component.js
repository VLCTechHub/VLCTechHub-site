import Ember from 'ember';
import moment from 'moment';

export default Ember.Component.extend({
  event: null,
  isSaving: false,
  buttonText: Ember.computed('isSaving', function(){
    var text = 'Publicar';
    if(this.get('isSaving')) {
      text = 'Publicando...';
    }
    return text;
  }),
  isButtonDisabled: Ember.computed('event.isValid', 'isSaving', function(){
    if(!this.get('event.isValid') || this.get('isSaving')) return true;
    return false;
  }),
  isChromeExtensionHintVisible: Ember.computed('event.link', function(){
    var supportedSites = ['http://www.meetup.com/', 'http://www.eventbrite.es/e/'];
    var link = this.get('event.link') || '';
    return supportedSites.some(function(site){ return link.indexOf(site) === 0; });
  }),
  actions: {
    submitAction: function(params) {
      if(!this.get('isSaving')){
        this.set('isSaving', true);
        this.sendAction('submitAction', params);
      }
    }
  }
});
