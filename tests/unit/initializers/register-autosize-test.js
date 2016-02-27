/* jshint expr:true */
import { expect } from 'chai';
import {
  describe,
  it,
  beforeEach
} from 'mocha';
import Ember from 'ember';
import { initialize } from 'vlc-tech-hub/initializers/register-autosize';

describe('RegisterAutosizeInitializer', function() {
  let application;

  beforeEach(function() {
    Ember.run(function() {
      application = Ember.Application.create();
      application.deferReadiness();
    });
  });

  it('registers autosize:main', function() {
    initialize(application);
    expect(application.hasRegistration('autosize:main')).to.be.true;
  });

  it('injects autosize:main to event/form-field', function() {
    let wasCalled = false;
    application.inject = function(container, name, injected) {
      expect(container).to.eql('component:event/form-field');
      expect(name).to.eql('autosize');
      expect(injected).to.eql('autosize:main');
      wasCalled = true;
    }
    initialize(application);
    expect(wasCalled).to.be.true;
  });
});
