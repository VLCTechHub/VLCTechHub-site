export function initialize(appInstance) {
  let moment = appInstance.lookup('service:moment');
  moment.changeLocale('es');
  moment.changeTimeZone('Europe/Madrid');
}

export default {
  name: 'config-moment',
  initialize: initialize
};
