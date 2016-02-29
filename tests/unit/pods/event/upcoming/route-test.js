/* jshint expr:true */
import { expect } from 'chai';
import {
  describeModule,
  it
} from 'ember-mocha';

let originalTransitionTo;

describeModule(
  'route:event/upcoming',
  'EventUpcomingRoute',
  {
    // Specify the other units that are required for this test.
    //needs: ['controller:event/upcoming']
  },
  function() {
    it('should transition to detail on expand', function() {
      let route = this.subject();
      sinon.stub(route,'transitionTo');

      route.send('expand', Ember.Object.create({id: 'an id' }));

      let destination = 'event.upcoming.detail';
      expect(route.transitionTo.calledWith(destination)).to.be.true;
    });

    it('should transition to general list on collapse', function() {
      let route = this.subject();
      sinon.stub(route, 'transitionTo');

      route.send('collapse', Ember.Object.create({id: 'an id' }));

      let destination = 'event.upcoming';
      expect(route.transitionTo.calledWith(destination)).to.be.true;
    });
  }
);
