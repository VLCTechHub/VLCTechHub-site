const http = require('http')
const https = require('https')
const marked = require('marked')
const sanitize = require('sanitize-html')
const moment = require('moment')

const createTwitterInfo = function (txt) {
  let twitter = {}
  if (txt && txt[0] === '@') {
    twitter.handle = txt.substring(1)
  } else if (txt && txt[0] === '#') {
    twitter.hashtag = txt.substring(1)
  } else {
    twitter.hashtag = txt
  }
  return twitter
}

const events = function (options, files, metalsmith, done) {
  const { apiRoot, resource, collection, layout } = {
    apiRoot: 'uri-goes-here',
    layout: 'event.njk',
    ...options,
  }

  let url = `${apiRoot}/events/${resource}`

  console.log('Consuming', url)

  let protocol = apiRoot.startsWith('https://') ? https : http
  const req = protocol.get(url, (res) => {
    let body = ''
    res.on('data', (chunk) => {
      body += chunk
    })
    res.on('end', () => {
      let events = JSON.parse(body)
      events.forEach((e) => {
        let page = {
          id: e.id,
          file: 'events/' + e.slug + '.njk',
          layout: layout,
          collection: collection,
          title: e.title,
          contents: Buffer.from(sanitize(marked(e.description || '', { smartLists: true }))),
          startDate: e.date.toString(),
          isToday: moment().isSame(e.date, 'day'),
          isThisWeek: moment().isSame(e.date, 'week'),
          organizer: e.hashtag,
          twitter: createTwitterInfo(e.hashtag),
          slug: e.slug,
          sourceUrl: e.link,
          pageTitle: e.title,
          seo: {
            ogTitle: e.title,
            ogDescription: e.description,
            ogUrl: apiRoot + 'events/' + e.slug + '/',
          },
        }
        files[page.file] = page
      })
      done()
    })
  })
  req.on('error', (error) => {
    console.error(error)
  })
  req.end()
}

module.exports.upcoming = (options = {}) => {
  const config = {
    resource: 'upcoming',
    collection: 'events',
    ...options,
  }

  return function (files, metalsmith, done) {
    return events(config, files, metalsmith, done)
  }
}

module.exports.past = (options = {}) => {
  const config = {
    resource: 'past',
    collection: 'pastevents',
    layout: 'past-event.njk',
    ...options,
  }

  return function (files, metalsmith, done) {
    return events(config, files, metalsmith, done)
  }
}
