const Metalsmith = require('metalsmith');
const markdown = require('metalsmith-markdown');
const layouts = require('metalsmith-layouts');
const permalinks = require('metalsmith-permalinks');
const inplace = require('metalsmith-in-place');
const collections = require('metalsmith-collections');
const sass = require('metalsmith-sass');
const http = require('http');
const nunjucksDate = require('nunjucks-date');

const toUpper = function(string) {
  "use strict";
  return string.toUpper();
}

const spaceToDash = function(string) {
  "use strict";
  return string.replace(/\s+/g, "-");
}

const inplaceConfig = {
  engineOptions: {
    filters: { toUpper, spaceToDash , date: nunjucksDate }
  }
};

const layoutConfig = {
  engineOptions: {
    filters: { toUpper, spaceToDash }
  },
  directory: 'templates/pages'
};


Metalsmith(__dirname)
  .metadata({
    title: "My Static Site & Blog",
    description: "It's about saying »Hello« to the World.",
    generator: "Metalsmith",
    url: "http://www.metalsmith.io/"
  })
  .source('./pages')
  .destination('./dist')
  .clean(true)
  .use((files, metalsmith, done) => {
    let url = 'http://vlctechhub-api.herokuapp.com/v1/events?category=next'
    const req = http.get(url, (res) => {
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
            date: e.date,
            layout: 'event.njk',
            hashtag: e.hashtag,
            slug: e.slug,
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
  })
  .use(collections())
  .use(markdown())
  .use(inplace(inplaceConfig))
  .use(layouts(layoutConfig))
  .use(permalinks({}))
  .use(sass({}))
  .build(function(err, files) {
    if (err) { throw err; }
  });

