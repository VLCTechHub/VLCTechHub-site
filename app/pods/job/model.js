import DS from 'ember-data';
import Ember from 'ember';

export default DS.Model.extend({
  title: DS.attr('string'),
  description: DS.attr('string'),
  company: DS.attr({'defaultValue': () => {return {}; } }),
  link: DS.attr('string'),
  tags: DS.attr({'defaultValue': () => [] }),
  how_to_apply: DS.attr('string'),
  published_at: DS.attr('date'),
  salary: DS.attr('string'),
  excerpt: Ember.computed('description', function(){
    let exp = new RegExp('.*');
    return exp.exec(this.get('description'))[0];
  }),
  isValid: Ember.computed('title', 'description','company.name', 'company.link', 'contactEmail', 'salary', function() {
    var requiredFields = ['title', 'description', 'company.name', 'company.link', 'contactEmail', 'salary'];
    return requiredFields.every((key) => !Ember.isEmpty(this.get(key)));
  }),
  isPublished: Ember.computed.notEmpty('published_at'),
  contactEmail: Ember.computed.alias('contact_email'),
  contact_email: DS.attr('string')
});
