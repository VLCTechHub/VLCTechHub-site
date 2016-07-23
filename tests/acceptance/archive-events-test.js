  /* jshint expr:true */
import {
  describe,
  it,
  beforeEach,
  afterEach
} from 'mocha';
import { expect } from 'chai';
import startApp from '../helpers/start-app';
import Ember from 'ember';
import Pretender from 'pretender';
import {addRoutes, eventRoutes, jobRoutes} from "../fixtures/routes";


describe('Acceptance: Archive events', function() {
  let application;
  let server;

  beforeEach(function() {
    application = startApp();
    server = new Pretender();
    addRoutes(server, [eventRoutes, jobRoutes]);
  });

  afterEach(function() {
    server.shutdown();
    Ember.run(application, 'destroy');
  });


  it('can visit /events/archive', function() {

    visit('/events/archive');

    andThen(function() {
      expect(currentPath()).to.equal('event.archive.month.index');

      let event = find('.item').first();
      expect(event.find('.item-title').text()).to.contain('a title');
    });
  });

  it('can visit /events/archive/:year/:month/:id', function() {

    visit('/events/archive/2001/01/1');

    andThen(function() {
      let event = find('.item').first();
      expect(event.find('.item-summary').text()).to.contain('an event description');
    });
  });
});

