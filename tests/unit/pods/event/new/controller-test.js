/* jshint expr:true */
import { expect } from 'chai';
import {
  describeModule,
  it
} from 'ember-mocha';

describeModule(
  'controller:event/new',
  'EventNewController',
  {
    // Specify the other units that are required for this test.
    // needs: ['controller:foo']
  },
  function() {
    //create a sandbox as we stub global functions
    let sandbox;

    beforeEach(function(){
      sandbox = sinon.sandbox.create();
    });

    afterEach(function(){
      sandbox.restore();
    });

    it('scrolls up to to after saving', function() {
      sandbox.stub(window, 'scrollTo');
      let controller = this.subject();

      controller.postSave(true);

      expect(window.scrollTo.called).to.be.true;
    });
  }
);
