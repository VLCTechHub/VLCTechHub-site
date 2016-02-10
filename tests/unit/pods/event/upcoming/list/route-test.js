/* jshint expr:true */
import { expect } from 'chai';
import {
  describeModule,
  it
} from 'ember-mocha';

let originalTransitionTo;

describeModule(
  'route:event/upcoming/list',
  'EventUpcomingListRoute',
  {
    // Specify the other units that are required for this test.
    //needs: ['controller:event/upcoming/list']
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
        expect(route).to.eql('event.upcoming.list.detail');
      }
      route.send('expand', Ember.Object.create({id: 'an id' }));
      expect(trigged).to.be.true;
    });

    it('should transition to general list on collapse', function() {
      let route = this.subject();
      let trigged = false;
      route.transitionTo = function (route, event) {
        trigged = true;
        expect(route).to.eql('event.upcoming.list');
      }
      route.send('collapse', Ember.Object.create({id: 'an id' }));
      expect(trigged).to.be.true;
    });
  }
);
