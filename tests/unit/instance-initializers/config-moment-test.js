/* jshint expr:true */
import { expect } from 'chai';
import {
  describe,
  it,
  beforeEach
} from 'mocha';
import Ember from 'ember';
import { initialize } from 'vlc-tech-hub/instance-initializers/config-moment';
import startApp from '../../helpers/start-app';
import destroyApp from '../../helpers/destroy-app';

describe('ConfigMomentInstanceInitializer', function() {
  let application;
  let appInstance;

  beforeEach(function() {
    application = startApp();
    appInstance = application.buildInstance();
  });

  afterEach(function() {
    Ember.run(appInstance, 'destroy');
    destroyApp(application);
  });

  it('configures moment locale and timezone', function() {
    initialize(appInstance);

    var moment = appInstance.lookup('service:moment');
    expect(moment.get('locale')).to.eq('es');
    expect(moment.get('timeZone')).to.eq('Europe/Madrid');
  });
});
