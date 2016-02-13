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
    beforeEach(function() {
      console.log('beforeEach')
      originalTransitionTo = this.subject().transitionTo;
    });

    afterEach(function(){
      this.subject.transitionTo = originalTransitionTo;
    });

    it('should transition to detail on expand', function() {
      let route = this.subject();
      let trigged = false;
      route.transitionTo = function (route, event) {
        trigged = true;
        expect(route).to.eql('event.upcoming.detail');
      }
      route.send('expand', Ember.Object.create({id: 'an id' }));
      expect(trigged).to.be.true;
    });

    it('should transition to general list on collapse', function() {
      let route = this.subject();
      let trigged = false;
      route.transitionTo = function (route, event) {
        trigged = true;
        expect(route).to.eql('event.upcoming');
      }
      route.send('collapse', Ember.Object.create({id: 'an id' }));
      expect(trigged).to.be.true;
    });
  }
);
