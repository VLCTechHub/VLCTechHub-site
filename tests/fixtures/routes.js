import config from '../../config/environment';

export function addRoutes(server, routes) {
  routes.forEach(r => server.map(r));
  server.prepareBody = (body) => JSON.stringify(body);
  server.prepareHeaders = (headers) => headers['content-type'] = 'application/json';
}

export function eventRoutes(){
  var event = {
      'id': 1,
      'slug': 'slug-1',
      'title': 'a title',
      'description': 'an event description',
      'link': 'a link',
      'hashtag':'#hashtag',
      'date':'2001-01-01T12:00:00Z'
    }

  this.get(`${config.APP.API_HOST}/v1/events`, function(request){
    return [200, {}, {'events':[event]}]
  });

  this.get(`${config.APP.API_HOST}/v1/events/slug-1`, function(request){
    return [200, {}, {'event': event}]
  });
}

export function jobRoutes(){
  this.get(`${config.APP.API_HOST}/v1/jobs`, function(request){
    var job = {
      'id': 1,
      'title': 'a title',
      'description': 'a job description',
      'link': 'a link',
      'company': {
        'name': 'awesome inc.',
        'link': 'www.awesome.inc'
      },
      'how_to_apply': 'this is how to apply',
      'salary': 'a good salary',
      'published_at':'2001-01-01T12:00:00Z'
    }
    return [200, {}, {'jobs':[job]}]
  });
}
