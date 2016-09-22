/* jshint expr:true */
import { expect } from 'chai';
import {
  describeComponent,
  it
} from 'ember-mocha';
import hbs from 'htmlbars-inline-precompile';
import Ember from 'ember';

describeComponent(
  'job/new-form',
  'Integration: JobNewFormComponent',
  {
    integration: true
  },
  function() {
    it('should render a form with disabled submit button', function() {
      this.render(hbs`{{job/new-form}}`);
      expect(this.$('form')).to.have.length(1);
      expect(this.$('.button.-primary:disabled')).to.have.length(1);
    });


    it('should enable submit button when model is valid', function(){
      var job = Ember.Object.create({
        isValid: true
      });

      this.set('job', job);
      this.render(hbs`{{job/new-form job=job}}`);
      expect(this.$('.button.-primary:disabled')).to.have.length(0);
    });

    it('on submit should call onSubmit', function(){
      var job = Ember.Object.create({
        isValid: true
      });
      this.set('job', job);
      this.set('myAction', () => {
        var wasCalled = true;
        expect(wasCalled).to.be.true;
      });
      this.render(hbs`{{job/new-form job=job onSubmit=(action myAction)}}`);

      this.$('.button.-primary').click();
    });

  }
);
