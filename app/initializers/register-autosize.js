export function initialize(app) {
  app.register('autosize:main', window.autosize, {instantiate: false});
  app.inject('component:event/form-field', 'autosize', 'autosize:main');
}

export default {
  name: 'register-autosize',
  initialize
};
