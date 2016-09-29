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


    it('should fill the event with form data', function(){
      let job = Ember.Object.create({
        company: Ember.Object.create({})
      });

      this.set('job', job);
      this.render(hbs`{{job/new-form job=job}}`);

      this.$('input[name="title"]').val('a title').change();
      expect(this.get('job.title')).to.equal('a title');

      this.$('textarea[name="description"]').val('a description').change();
      expect(this.get('job.description')).to.equal('a description');

      this.$('input[name="tag"]').val('a, b, c').blur();
      expect(this.get('job.tags')).to.eql(['a','b','c']);

      this.$('input[name="salary"]').val('a salary').change();
      expect(this.get('job.salary')).to.eql('a salary');

      this.$('input[name="how-to-apply"]').val('how to apply').change();
      expect(this.get('job.how_to_apply')).to.eql('how to apply');

      this.$('input[name="link"]').val('offer link').change();
      expect(this.get('job.link')).to.eql('offer link');

      this.$('input[name="email"]').val('email').change();
      expect(this.get('job.contactEmail')).to.eql('email');

      this.$('input[name="company-name"]').val('company name').change();
      expect(this.get('job.company.name')).to.eql('company name');

      this.$('input[name="company-link"]').val('company link').change();
      expect(this.get('job.company.link')).to.eql('company link');

      this.$('input[name="company-twitter"]').val('company twitter').change();
      expect(this.get('job.company.twitter')).to.eql('company twitter');

    });
  }
);
