/* jshint expr:true */
import { expect } from 'chai';
import {
  describeModule,
  it
} from 'ember-mocha';

describeModule(
  'route:event/archive/month/detail',
  'EventArchiveMonthDetailRoute',
  {
    // Specify the other units that are required for this test.
    // needs: ['controller:foo']
  },
  function() {
    it('should create meta description based on model.excerpt', function(){
      let route = this.subject();
      let model = Ember.Object.create({excerpt: 'this is the excerpt'});
      sinon.stub(route, 'modelFor').returns(model);

      let tags = route.headTags();
      let description = tags.find(t => t.attrs.name == 'description');
      expect(description.attrs.content).to.eql('this is the excerpt');
    });
  }
);
