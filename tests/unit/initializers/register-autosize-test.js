/* jshint expr:true */
import { expect } from 'chai';
import {
  describe,
  it,
  beforeEach
} from 'mocha';
import Ember from 'ember';
import { initialize } from 'vlc-tech-hub/initializers/register-autosize';
import sinon from 'sinon';

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
    sinon.stub(application, 'inject');
    initialize(application);

    let container = 'component:event/form-field';
    let name = 'autosize';
    let injected = 'autosize:main'
    expect(application.inject.calledWith(container, name, injected)).to.be.true;
  });
});
