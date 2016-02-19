/* jshint expr:true */
import { expect } from 'chai';
import {
  describeComponent,
  it
} from 'ember-mocha';
import hbs from 'htmlbars-inline-precompile';

describeComponent(
  'application/main-menu',
  'Integration: ApplicationMainMenuComponent',
  {
    integration: true
  },
  function() {
    it('renders', function() {
      // Set any properties with this.set('myProperty', 'value');
      // Handle any actions with this.on('myAction', function(val) { ... });
      // Template block usage:
      // this.render(hbs`
      //   {{#application/main-menu}}
      //     template content
      //   {{/application/main-menu}}
      // `);

      this.render(hbs`{{application/main-menu}}`);
      expect(this.$()).to.have.length(1);
    });
  }
);
