/* jshint expr:true */
import {
  describe,
  it,
  beforeEach,
  afterEach
} from 'mocha';
import { expect } from 'chai';
import startApp from '../helpers/start-app';
import destroyApp from '../helpers/destroy-app';
import Pretender from 'pretender';
import {addRoutes, jobRoutes} from "../fixtures/routes";


describe('Acceptance: JobBoardTest.Js', function() {
  let application;

  beforeEach(function() {
    application = startApp();
    server = new Pretender();
    addRoutes(server, [jobRoutes]);
  });

  afterEach(function() {
    server.shutdown();
    destroyApp(application);
  });

  it('can visit /job/board', function() {
    visit('/job/board');

    andThen(function() {
      expect(currentPath()).to.equal('job.list.index');

      let event = find('.event').first();
      expect(event.find('.event-title').text()).to.contain('a title');
    });
  });

  it('can visit /job/board/id', function() {
    visit('/job/board/1');

    andThen(function() {
      let event = find('.event').first();
      expect(event.find('.event-summary').text()).to.contain('a job description');
    });
  });
});
