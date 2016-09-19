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
  isValid: Ember.computed('title', 'description', 'salary',
             'how_to_apply', 'company.name', 'company.link', function() {
    var requiredFields = ['title', 'description', 'salary', 'how_to_apply', 'company.name', 'company.link'];
    return requiredFields.every((key) => !Ember.isEmpty(this.get(key)));
  }),
});
