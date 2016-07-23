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


describe('Acceptance: Upcoming events', function() {
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


  it('can visit /events/upcoming', function() {

    visit('/events/upcoming');

    andThen(function() {
      expect(currentPath()).to.equal('event.upcoming');

      let event = find('.event-card').first();
      expect(event.find('.event-title').text()).to.contain('a title');
    });
  });

  it('can visit /events/slug', function() {

    visit('/events/slug-1');

    andThen(function() {
      expect(find('.event-detail').text()).to.contain('an event description');
    });
  });

  it('renders how many job offers are', function(){
    visit('/events/upcoming');

    andThen(function() {
      let menu = find('.menu .btn-menu');
      let NUMBER_OF_JOB_OFFERS_IN_FIXTURES = 1;
      expect(menu.text()).to.contain('Empleo  ' + NUMBER_OF_JOB_OFFERS_IN_FIXTURES);
    });
  });
});

