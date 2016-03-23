/* jshint expr:true */
import { expect } from 'chai';
import { describeModel, it } from 'ember-mocha';

describeModel(
  'job',
  'Unit | Model | job',
  {
      needs: []
  },
  function() {
    it('should return first paragraph as excerpt', function(){
      let model = this.subject();
      model.set('description','first paragraph\nsecond paragraph');
      expect(model.get('excerpt')).to.equal('first paragraph');
    });
  }
);
