const Metalsmith = require('metalsmith');
const markdown = require('metalsmith-markdown');
const layouts = require('metalsmith-layouts');
const permalinks = require('metalsmith-permalinks');
const inplace = require('metalsmith-in-place');

const toUpper = function(string) {
  "use strict";
  return string.toUpper();
}

const spaceToDash = function(string) {
  "use strict";
  return string.replace(/\s+/g, "-");
}

const templateConfig = {
  engineOptions: {
    filters: { toUpper, spaceToDash }
  }
};

Metalsmith(__dirname)
  .metadata({
    title: "My Static Site & Blog",
    description: "It's about saying »Hello« to the World.",
    generator: "Metalsmith",
    url: "http://www.metalsmith.io/"
  })
  .source('./src')
  .destination('./build')
  .clean(true)
  .use(inplace(templateConfig))
  .use(layouts(templateConfig))
  .use(markdown())
  .use(permalinks({}))
  .build(function(err, files) {
    if (err) { throw err; }
  });

