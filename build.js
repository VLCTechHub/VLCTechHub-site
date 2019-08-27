const Metalsmith = require('metalsmith');
const markdown = require('metalsmith-markdown');
const layouts = require('metalsmith-layouts');
const permalinks = require('metalsmith-permalinks');
const inplace = require('metalsmith-in-place');
const collections = require('metalsmith-collections');
const uglify = require('metalsmith-uglify');
const sass = require('metalsmith-sass');
const nunjucksDate = require('nunjucks-moment-timezone-filter');
const moment = require('moment');
const git = require('git-rev-sync');
const apiFiles = require('./lib/apiFileGenerator.js');

moment.locale('es');

function fromNow(date) {
  return moment(date).fromNow();
}

const devBuild = ((process.env.NODE_ENV || '').trim().toLowerCase() !== 'production');
const apiRoot = devBuild ? 'http://localhost:5000/v1' : 'https://vlctechhub-api.herokuapp.com/v1';
const version = git.short();

Metalsmith(__dirname)
  .metadata({
    seo: {
      ogTitle: "VLCTechHub",
      ogDescription: "VLCTechHub es el hub de eventos y empleo tecnológico en Valencia: eventos de programación, coding dojos, talleres, workshops o quedadas informales para fomentar una comunidad o compartir información de base tecnológica en Valencia.",
      ogUrl: 'https://vlctechhub.org/'
    },
    apiRoot: apiRoot,
    version: git.short(),
    nonce: Buffer.from(Math.random().toString()).toString('base64')
  })
  .source('./data')
  .destination('./dist')
  .clean(true)
  .use((files, metalsmith, done) => {
    apiFiles.generateEventFiles(apiRoot, files, metalsmith, done);
  })
  .use((files, metalsmith, done) => {
    apiFiles.generateJobFiles(apiRoot, files, metalsmith, done);
  })
  .use(collections({
      jobs: { sortBy: 'publishedAt', reverse: true },
      upcomingEvents: { sortBy: 'startDate' }
    })
  )
  .use(markdown({ sanitize: true }))
  .use(inplace({
    engineOptions: {
      filters: { date: nunjucksDate.dateFilter, newDate: nunjucksDate.newDate, fromNow: fromNow }
    }
  }))
  .use(layouts({
    engineOptions: {
      filters: { date: nunjucksDate.dateFilter, newDate: nunjucksDate.newDate, fromNow: fromNow }
    },
    directory: 'templates/'
  }))
  .use(permalinks({}))
  .use(sass({
    outputDir: 'assets/css/',
    outFile: 'foobar.css'
  }))
  .use((files, metalsmith, done) => { //fingerprint css based on commit
    files[`assets/css/vlctechhub-${version}-min.css`] = files['assets/css/main.css'];
    done();
  })
  .use(uglify({ // build + fingerprint js based on commmit
    es: true,
    concat: {
      file: `vlctechhub-${version}-min.js`,
      root: 'assets/js'
    },
    removeOriginal: true
  }))
  .build(function(err, files) {
    if (err) { throw err; }
  });
