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
    // Replace this with your real tests.
    it('scrolls up to to after saving', function() {
      let controller = this.subject();
      let scrollTo = window.scrollTo;
      let triggered = false;
      window.scrollTo = function() {
        triggered = true;
      }
      controller.postSave(true);
      window.scrollTo = scrollTo;
      expect(triggered).to.be.true;
    });
  }
);
