/* jshint expr:true */
import { expect } from 'chai';
import { it, describe } from 'mocha';
import { setupModelTest } from 'ember-mocha';

describe('Unit | Model | job', function() {
  setupModelTest('job', {
      needs: []
  });

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
      'company.name': 'company name',
      'company.link': 'company link',
      'contactEmail': 'an email',
      'salary': 'a salary'
    });
    expect(model.get('isValid')).to.be.true;
  });
});
