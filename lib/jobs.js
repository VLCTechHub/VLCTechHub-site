const http = require('http')
const https = require('https')
const marked = require('marked')
const sanitize = require('sanitize-html')

module.exports = (options = {}) => {
  const { apiRoot, collection, layout } = {
    apiRoot: 'uri-goes-here',
    collection: 'jobs',
    layout: 'job.njk',
    ...options,
  }

  return function (files, metalsmith, done) {
    let url = `${apiRoot}/jobs`

    console.log('Consuming', url)

    let protocol = apiRoot.startsWith('https://') ? https : http
    const req = protocol.get(url, (res) => {
      let body = ''
      res.on('data', (chunk) => {
        body += chunk
      })
      res.on('end', () => {
        let jobs = JSON.parse(body)
        jobs.forEach((j) => {
          let page = {
            id: j.id,
            file: 'job/board/' + j.id + '.njk',
            layout: layout,
            collection: collection,
            title: j.title,
            contents: Buffer.from(sanitize(marked(j.description || '', { smartLists: true }))),
            howToApply: sanitize(marked(j.how_to_apply || '', { smartLists: true })),
            salary: j.salary,
            publishedAt: j.published_at.toString(),
            sourceUrl: j.link,
            tags: j.tags,
            slug: j.id,
            companyName: j.company.name,
            pageTitle: j.title,
            seo: {
              ogTitle: j.title,
              ogDescription: j.description,
              ogUrl: apiRoot + 'job/board/' + j.id + '/',
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
}
