/* jshint expr:true */
import { expect } from 'chai';
import {
  describeModule,
  it
} from 'ember-mocha';
import Ember from 'ember';

describeModule(
  'controller:job/list',
  'JobListController',
  {
    // Specify the other units that are required for this test.
    // needs: ['controller:foo']
  },
  function() {
    it('sorts jobs by publish_at desc', function() {
      let jobJanuary = Ember.Object.create({
        published_at: new Date(2001, 0, 1),
        isPublished: true,
        title: 'january job offer'
      });
      let jobFebruary = Ember.Object.create({
        published_at: new Date(2001, 1, 1),
        isPublished: true,
        title: 'february job offer'
      });
      let controller = this.subject();
      controller.set('model', [jobJanuary, jobFebruary]);
      expect(controller.get('jobs').length).to.eq(2);
      expect(controller.get('jobs.firstObject.title')).to.eq('february job offer');
    });
  }
);
