/* jshint expr:true */
import moment from 'moment';
import { expect } from 'chai';
import {
  describeModule,
  it
} from 'ember-mocha';

describeModule(
  'route:event/archive',
  'EventArchiveRoute',
  {
    // Specify the other units that are required for this test.
    // needs: ['controller:foo']
  },
  function() {
    it('redirects to current year, month archive route', function() {
      let route = this.subject();
      sinon.stub(route, 'transitionTo');
      let currentTransiton = { targetName: 'anything.not.to.month.detail'}
      route.beforeModel(currentTransiton);

      let destination = 'event.archive.month';
      let year = moment().format('YYYY');
      let month = moment().format('MM');
      expect(route.transitionTo.calledWith(destination, year, month)).to.be.true;
    });

    it('does not redirect if current transition is month detail', function(){

      let route = this.subject();
      sinon.stub(route, 'transitionTo');
      let currentTransiton = { targetName: 'event.archive.month.detail'}
      route.beforeModel(currentTransiton);

      let destination = 'event.archive.month';
      let year = moment().format('YYYY');
      let month = moment().format('MM');
      expect(route.transitionTo.calledWith(destination, year, month)).to.be.false;

    })
  }
);
