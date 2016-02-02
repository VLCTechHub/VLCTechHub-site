/* jshint expr:true */
import { expect } from 'chai';
import {
  describeComponent,
  it
} from 'ember-mocha';
import hbs from 'htmlbars-inline-precompile';
import Ember from 'ember';
import { openDatepicker } from 'ember-pikaday/helpers/pikaday';

describeComponent(
  'new-event-form',
  'Integration: NewEventFormComponent',
  {
    integration: true
  },
  function() {
    it('should render a form with disabled submit button', function() {
      this.render(hbs`{{new-event-form}}`);
      expect(this.$('form')).to.have.length(1);
      expect(this.$('.btn-primary:disabled')).to.have.length(1);
    });


    it('should enable submit button when model is valid', function(){

      let event = Ember.Object.create({
        isValid: true
      });

      this.set('model', event);
      this.render(hbs`{{new-event-form event=model}}`);
      this.$('input[name="title"]').val('a title').change();
      expect(this.$('.btn-primary:disabled')).to.have.length(0);
      expect(this.get('model.title')).to.equal('a title');

    });

    it('should fill the event with form data', function(){
      let event = Ember.Object.create({});

      this.set('model', event);
      this.render(hbs`{{new-event-form event=model}}`);

      this.$('input[name="title"]').val('a title').change();
      expect(this.get('model.title')).to.equal('a title');

      this.$('textarea[name="description"]').val('a description').change();
      expect(this.get('model.description')).to.equal('a description');

      this.$('input[name="link"]').val('a link').change();
      expect(this.get('model.link')).to.equal('a link');

      this.$('input[name="hashtag"]').val('a hashtag').change();
      expect(this.get('model.hashtag')).to.equal('a hashtag');

      var datePicker = openDatepicker(this.$('input[name="date"]'));
      var now = new Date();
      datePicker.selectDate(now);
      //we ignore time as it is a separate property
      expect(this.get('model.date').toDateString()).to.equal(now.toDateString());

      this.$('input[name="time"]').val('a time').change();
      expect(this.get('model.time')).to.equal('a time');

    });

    it('on submit should send an action with an event with all the values', function(){
      let event = Ember.Object.create({
        title: 'a title',
        isValid: true
      });
      this.set('model', event);
      this.render(hbs`{{new-event-form event=model submitAction='myAction'}}`);
      let trigged = false;
      this.on('myAction', e => { trigged = true; expect(e).to.equal(event) });
      this.$('.btn-primary').click();
      expect(trigged).to.be.true;
    });

    it('should show the chrome extention hint if link is supported', function(){
      this.render(hbs`{{new-event-form}}`);
      var supportedLink = 'http://www.meetup.com/anything';
      this.$('input[name="link"]').val('supportedLink').change();
      expect(this.$('form').text()).to.contain('prueba la extension de Chrome');
    });
  }
);
