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

    it('should validate boring required fields', function() {
      var model = this.subject();
      expect(model.get('isValid')).to.be.false;

      model.setProperties({
        'title': 'a title',
        'description': 'a description',
        'salary': 'anything',
        'how_to_apply': 'how to apply',
        'company.name': 'company name',
        'company.link': 'company link'
      });
      expect(model.get('isValid')).to.be.true;
    });
  }
);
