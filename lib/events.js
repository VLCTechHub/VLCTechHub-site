const http = require('http')
const https = require('https')

const createTwitterInfo = function(txt) {
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

module.exports = (options = {}) => {
  const { apiRoot, collection, layout } = {
    apiRoot: 'uri-goes-here',
    collection: 'events',
    layout: 'event.njk',
    ...options
  }

  return function(files, metalsmith, done) {
    let url = `${apiRoot}/events/upcoming`

    console.log('Consuming', url)

    let protocol = apiRoot.startsWith('https://') ? https : http
    const req = protocol.get(url, res => {
      let body = ''
      res.on('data', chunk => {
        body += chunk
      })
      res.on('end', () => {
        let events = JSON.parse(body)
        events.forEach(e => {
          let page = {
            file: 'events/' + e.slug + '.md',
            layout: layout,
            collection: collection,
            title: e.title,
            contents: Buffer.from(e.description),
            startDate: e.date.toString(),
            twitter: createTwitterInfo(e.hashtag),
            slug: e.slug,
            sourceUrl: e.link,
            pageTitle: e.title,
            seo: {
              ogTitle: e.title,
              ogDescription: e.description,
              ogUrl: apiRoot + 'events/' + e.slug + '/'
            }
          }
          files[page.file] = page
        })
        done()
      })
    })
    req.on('error', error => {
      console.error(error)
    })
    req.end()
  }
}
