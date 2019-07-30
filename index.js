const Metalsmith = require('metalsmith');
const markdown = require('metalsmith-markdown');
const layouts = require('metalsmith-layouts');
const permalinks = require('metalsmith-permalinks');
const inplace = require('metalsmith-in-place');
const sass = require('metalsmith-sass');

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
    filters: { toUpper, spaceToDash }
  }
};

const layoutConfig = {
  engineOptions: {
    filters: { toUpper, spaceToDash }
  },
  directory: 'templates/pages'
};

// Fake file:

// {
//   title: String, // Name of the page
//     file: String, // Fake file path, provide a .md for markdown content
//       contents: String, // Contents of the page
//       }


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
   /* MongoClient.connect(mongoUrl, (error, db) => {
      if (error) return done(error);
      db.collection('pages').find({}).toArray((docError, pages) => {
        if (docError) return done(docError);
        pages.forEach((page) => {
          page.contents = new Buffer(page.contents);
          files[page.file] = page;
        });
        done();
      });
    }) */
    let eventPages= [{
      title: 'event created from api',
      file: 'events/event-from-api.md',
      contents: 'This is a **content** of event 1 created from api',
      layout: 'event.njk'
    }];

    eventPages.forEach(page => {
      page.contents = new Buffer(page.contents);
      files[page.file] = page;
    });
    done();
  } )
  .use(markdown())
  .use(inplace(inplaceConfig))
  .use(layouts(layoutConfig))
  .use(permalinks({}))
  .use(sass({}))
  .build(function(err, files) {
    if (err) { throw err; }
  });

