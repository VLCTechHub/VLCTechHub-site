import DS from 'ember-data';
import Ember from 'ember';

export default DS.Model.extend({
  title: DS.attr('string'),
  description: DS.attr('string'),
  company: DS.attr(),
  link: DS.attr('string'),
  tags: DS.attr(),
  how_to_apply: DS.attr('string'),
  published_at: DS.attr('date'),
  salary: DS.attr('string'),
  excerpt: Ember.computed('description', function(){
    let exp = new RegExp('.*');
    return exp.exec(this.get('description'))[0];
  }),
});
