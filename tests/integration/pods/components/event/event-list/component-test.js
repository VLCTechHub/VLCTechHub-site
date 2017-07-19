import { expect } from 'chai';
import { describe, it } from 'mocha';
import { setupComponentTest } from 'ember-mocha';
import hbs from 'htmlbars-inline-precompile';

describe('Integration | Component | event/event list', function() {
  setupComponentTest('event/event-list', {
    integration: true
  });

  it('renders', function() {
    // Set any properties with this.set('myProperty', 'value');
    // Handle any actions with this.on('myAction', function(val) { ... });
    // Template block usage:
    // this.render(hbs`
    //   {{#event/event-list}}
    //     template content
    //   {{/event/event-list}}
    // `);

    this.render(hbs`{{event/event-list}}`);
    expect(this.$()).to.have.length(1);
  });
});
