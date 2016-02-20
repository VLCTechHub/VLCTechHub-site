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
import {addRoutes, eventRoutes} from "../fixtures/routes";

let server;

describe('Acceptance: Archive events', function() {
  let application;

  beforeEach(function() {
    application = startApp();
    server = new Pretender();
    addRoutes(server, [eventRoutes]);
  });

  afterEach(function() {
    server.shutdown();
    Ember.run(application, 'destroy');
  });


  it('can visit /events/archive', function() {

    visit('/events/archive');

    andThen(function() {
      expect(currentPath()).to.equal('event.archive.month.index');

      let event = find('.event').first();
      expect(event.find('.event-title').text()).to.contain('a title');
    });
  });
});

