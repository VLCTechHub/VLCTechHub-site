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
    beforeEach(function() {
      originalTransitionTo = this.subject().transitionTo;
    });

    afterEach(function(){
      this.subject.transitionTo = originalTransitionTo;
    });

    it('redirects to current year, month archive route', function() {
      let route = this.subject();
      let trigged = false;
      route.transitionTo = function (route, year, month) {
        trigged = true;
        expect(route).to.eql('event.archive.month');
        expect(year).to.eql(moment().format('YYYY'));
        expect(month).to.eql(moment().format('MM'));
      }
      route.beforeModel();
      expect(trigged).to.be.true;
    });
  }
);
