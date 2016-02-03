import config from '../../config/environment';

export function addRoutes(server, routes) {
  routes.forEach(r => server.map(r));
  server.prepareBody = (body) => JSON.stringify(body);
  server.prepareHeaders = (headers) => headers['content-type'] = 'application/json';
}

export function eventRoutes(){
  this.get(`${config.APP.API_HOST}/v1/events`, function(request){
    var event = {
      'id': 1,
      'title': 'a title',
      'description': 'a description',
      'link': 'a link',
      'hashtag':'#hashtag',
      'date':'2001-01-01T12:00:00Z'
    }
    return [200, {}, {'events':[event]}]
  });
}
