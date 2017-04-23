/* jshint expr:true */
import { expect } from 'chai';
import { setupComponentTest } from 'ember-mocha';
import { describe, it } from 'mocha';
import hbs from 'htmlbars-inline-precompile';

describe('Integration: EventFormFieldComponent', function() {
  setupComponentTest('event/form-field', {
    integration: true
  });

  describe('textarea', function() {
    it('renders a textarea', function() {
      this.render(hbs`{{event/form-field type='textarea' name='a-name' label='a label'}}`);
      expect(this.$('label').text()).to.eq('a label');
      expect(this.$('textarea[name="a-name"]')).to.have.length(1);
    });

    it('renders a growing textarea with autosize injected property', function(){
      let wasCalled = false;
      this.set('autosize', function(){ wasCalled = true; });
      this.render(hbs`{{event/form-field type='textarea' autosize=autosize}}`);

      expect(wasCalled).to.be.true;
    });
  });
});
