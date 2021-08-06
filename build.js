const Metalsmith = require('metalsmith')
const markdown = require('metalsmith-markdown')
const layouts = require('metalsmith-layouts')
const permalinks = require('@metalsmith/permalinks')
const inplace = require('metalsmith-in-place')
const collections = require('metalsmith-collections')
const pagination = require('metalsmith-pagination')
const dataLoader = require('metalsmith-data-loader')
const uglify = require('metalsmith-uglify')
const sass = require('metalsmith-sass')
const writemetadata = require('metalsmith-writemetadata')
const nunjucksDate = require('nunjucks-moment-timezone-filter')
const moment = require('moment')
const git = require('git-rev-sync')
const rss = require('./lib/rss.js')
const events = require('./lib/events.js')
const jobs = require('./lib/jobs.js')

moment.locale('es')

function fromNow(date) {
  return moment(date).fromNow()
}

const envBuild = (process.env.NODE_ENV || 'dev').trim().toLowerCase()

let apiRoot = 'http://localhost:5000/v2'

if (envBuild === 'production') {
  apiRoot = 'https://api.vlctechhub.org/v2'
} else if (envBuild === 'docker') {
  apiRoot = 'http://api:5000/v2'
}

const version = git.short()

Metalsmith(__dirname)
  .metadata({
    seo: {
      ogTitle: 'VLCTechHub',
      ogDescription:
        'VLCTechHub es el hub de eventos y empleo tecnológico en Valencia: eventos de programación, coding dojos, talleres, workshops o quedadas informales para fomentar una comunidad o compartir información de base tecnológica en Valencia.',
      ogUrl: 'https://vlctechhub.org/',
    },
    apiRoot: apiRoot,
    version: git.short(),
    nonce: Buffer.from(Math.random().toString()).toString('base64'),
  })
  .source('./data')
  .destination('./dist')
  .clean(true)
  .use(events.upcoming({ apiRoot: apiRoot, collection: 'events' }))
  .use(events.past({ apiRoot: apiRoot, collection: 'pastevents' }))
  .use(jobs({ apiRoot: apiRoot, collection: 'jobs' }))
  .use(
    collections({
      jobs: { sortBy: 'publishedAt', reverse: true },
      events: { sortBy: 'startDate' },
      pastevents: { sortBy: 'startDate', reverse: true },
    })
  )
  .use(
    pagination({
      'collections.pastevents': {
        perPage: 30,
        layout: 'past-events.njk',
        first: 'events/past/index.html',
        noPageOne: true,
        path: 'events/past/page/:num/index.html',
      },
    })
  )
  .use(
    dataLoader({
      dataProperty: 'datasource',
      removeSource: true,
    })
  )
  .use(markdown())
  .use(
    inplace({
      engineOptions: {
        filters: { date: nunjucksDate.dateFilter, newDate: nunjucksDate.newDate, fromNow: fromNow },
      },
    })
  )
  .use(
    layouts({
      engineOptions: {
        filters: { date: nunjucksDate.dateFilter, newDate: nunjucksDate.newDate, fromNow: fromNow },
      },
      directory: 'templates/',
    })
  )
  .use(permalinks({}))
  .use(
    sass({
      outputDir: 'assets/css/',
    })
  )
  .use((files, metalsmith, done) => {
    //fingerprint css based on commit
    files[`assets/css/vlctechhub-${version}-min.css`] = files['assets/css/main.css']
    done()
  })
  .use(
    uglify({
      // build + fingerprint js based on commmit
      es: true,
      concat: {
        file: `vlctechhub-${version}-min.js`,
        root: 'assets/js',
      },
      removeOriginal: true,
    })
  )
  .use(
    rss({
      collection: 'events',
      description: 'El feed de los próximos eventos.',
      customTitleFn: (item) => {
        let title = moment(item.titlte).format('dddd DD [de] MMMM') + ' | ' + item.title
        if (item.twitter.handle) {
          title = title + ' por @' + item.twitter.handle
        }
        return title[0].toUpperCase() + title.slice(1)
      },
      pubDateAttributeName: 'startDate',
      destination: 'events/upcoming/feed.xml',
    })
  )
  .use(
    rss({
      collection: 'jobs',
      description: 'El feed de las ofertas de trabajo.',
      customTitleFn: (item) => {
        let title = item.title + ' | ' + item.companyName
        return title
      },
      pubDateAttributeName: 'publishedAt',
      destination: 'job/board/feed.xml',
    })
  )
  .use(
    writemetadata({
      collections: {
        events: { output: { path: '.events-published.json' }, ignorekeys: ['contents', 'next', 'previous'] },
        jobs: { output: { path: '.jobs-published.json' }, ignorekeys: ['contents', 'next', 'previous'] },
      },
    })
  )
  .build(function (err) {
    if (err) {
      throw err
    }
  })
