import { expect } from 'chai';
import { describe, it } from 'mocha';
import { setupComponentTest } from 'ember-mocha';
import hbs from 'htmlbars-inline-precompile';

describe('Integration | Component | common/create job button', function() {
  setupComponentTest('common/create-job-button', {
    integration: true
  });

  it('renders', function() {
    // Set any properties with this.set('myProperty', 'value');
    // Handle any actions with this.on('myAction', function(val) { ... });
    // Template block usage:
    // this.render(hbs`
    //   {{#common/create-job-button}}
    //     template content
    //   {{/common/create-job-button}}
    // `);

    this.render(hbs`{{common/create-job-button}}`);
    expect(this.$()).to.have.length(1);
  });
});
