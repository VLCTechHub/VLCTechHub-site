/* jshint expr:true */
import { expect } from 'chai';
import {
  describeComponent,
  it
} from 'ember-mocha';
import hbs from 'htmlbars-inline-precompile';

describeComponent(
  'event/event-row',
  'Integration: EventEventRowComponent',
  {
    integration: true
  },
  function() {
    it('should render an event', function() {
      var event = Ember.Object.create({
        date: new Date(2001, 0, 1),
        title: 'a title',
        description: 'a description',
        link: 'a link'
      });
      this.set('model', event);
      this.render(hbs`{{event/event-row item=model}}`);
      var renderedText = this.$('ul.event-one-line').text();
      expect(renderedText).to.contain('a title');
      expect(renderedText).to.contain('lun. 01 ene. 00:00h');
      expect(renderedText).not.to.contain('a description');
    });

    it('should render a selected event as expanded', function(){
      var event = Ember.Object.create({
        id: '1',
        date: new Date(2001, 0, 1),
        title: 'a title',
        description: 'a description',
        link: 'a link'
      });
      var selected = Ember.Object.create({ id: event.get('id') });

      this.set('model', event);
      this.set('selected', selected);
      this.render(hbs`{{event/event-row item=model selectedItem=selected}}`);
      var renderedText = this.$('ul.event-one-line').text();
      expect(renderedText).to.contain('a title');
      expect(renderedText).to.contain('lun. 01 ene. 00:00h');
      expect(renderedText).to.contain('a description');
    });

    it('should shorten long event titles', function(){
      var event = Ember.Object.create({
        date: new Date(2001, 0, 1),
        title: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt.',
      });

      this.set('model', event);
      this.render(hbs`{{event/event-row item=model}}`);
      var renderedText = this.$('ul.event-one-line').text();
      expect(renderedText).to.contain('Lorem ipsum dolor sit amet, consectetur adipiscing elit...');
    });

    it('should trigger expand action on clicking the title', function(){
      var event = Ember.Object.create({
        id: '1',
        date: new Date(2001, 0, 1),
        title: 'a title',
        description: 'a description',
      });

      this.set('model', event);
      this.render(hbs`{{event/event-row item=model expandAction='expand'}}`);
      let expandTrigged = false;
      this.on('expand', e => { expandTrigged = true; expect(e).to.equal(event) });

      this.$('.event-title').click();
      expect(expandTrigged).to.be.true;
    });

    it('should trigger collapse action on clicking the title if event was selected', function(){
      var event = Ember.Object.create({
        id: '1',
        date: new Date(2001, 0, 1),
        title: 'a title',
        description: 'a description',
      });
      var selected = Ember.Object.create({id: event.get('id')});

      this.set('model', event);
      this.set('selected', selected);
      this.render(hbs`{{event/event-row item=model selectedItem=selected collapseAction='collapse'}}`);
      let collapseTrigged = false;
      this.on('collapse', e => { collapseTrigged = true; expect(e).to.equal(event) });

      this.$('.event-title').click();
      expect(collapseTrigged).to.be.true;
    });
  }
);
