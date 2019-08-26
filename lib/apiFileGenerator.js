const http = require('http');
const https = require('https');
const marked = require('marked');

const createTwitterInfo = function(txt) {
  let twitter = {};
  if(txt && txt[0] === '@') {
    twitter.handle = txt.substring(1);
  }
  else if(txt && txt[0] === '#') {
    twitter.hashtag = txt.substring(1);
  }
  else {
    twitter.hashtag = txt;
  }
  return twitter;
}

module.exports = {
  generateEventFiles: function(apiRoot, files, metalsmith, done) {
    let url = `${apiRoot}/events/?category=next`;

    console.log('Consuming', url);

    let protocol = apiRoot.startsWith('https://')? https : http;
      const req = protocol.get(url, (res) => {
        let body = '';
        res.on('data', (chunk) => {
          body += chunk;
        });
        res.on('end', () => {
          let events = JSON.parse(body).events;
          events.forEach(e => {
            let page = {
              file: 'events/' + e.slug + '.md',
              title: e.title,
              contents: Buffer.from(e.description),
              startDate: e.date.toString(),
              layout: 'event.njk',
              twitter: createTwitterInfo(e.hashtag),
              slug: e.slug,
              sourceUrl: e.link,
              pageTitle: e.title,
              seo: {
                ogTitle: e.title,
                ogDescription: e.description,
                ogUrl: apiRoot + 'events/' + e.slug +'/'
              },
              collection: 'upcomingEvents'
            }
            files[page.file] = page;
          });
          done();
        });
      })
      req.on('error', (error) => {
        console.error(error)
      })
      req.end();
  },
  generateJobFiles: function(apiRoot, files, metalsmith, done) {
    let url = `${apiRoot}/jobs/`;

    console.log('Consuming', url);

    let protocol = apiRoot.startsWith('https://')? https : http;
      const req = protocol.get(url, (res) => {
        let body = '';
        res.on('data', (chunk) => {
          body += chunk;
        });
        res.on('end', () => {
          let jobs = JSON.parse(body).jobs;
          jobs.forEach(e => {
            let page = {
              file: 'job/board/' + e.id + '.md',
              title: e.title,
              contents: Buffer.from(e.description),
              howToApply: marked(e.how_to_apply || '', { sanitize: true, smartLists: true }),
              salary: e.salary,
              publishedAt: e.published_at.toString(),
              sourceUrl: e.link,
              tags: e.tags,
              slug: e.id,
              companyName: e.company.name,
              layout: 'job.njk',
              pageTitle: e.title,
              seo: {
                ogTitle: e.title,
                ogDescription: e.description,
                ogUrl: apiRoot + 'job/board/' + e.id +'/'
              },
              collection: 'jobs'
            }
            files[page.file] = page;
          });
          done();
        });
      })
      req.on('error', (error) => {
        console.error(error)
      })
      req.end();
  }
}
