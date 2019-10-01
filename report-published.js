const fs = require('fs')
const fetch = require('node-fetch')

const devBuild = (process.env.NODE_ENV || '').trim().toLowerCase() !== 'production'
const apiRoot = devBuild ? 'http://localhost:5000/v2' : 'https://api.vlctechhub.org/v2'

fs.readFile('dist/.events-published.json', async (err, data) => {
  try {
    if (err) throw err

    const publishedEvents = JSON.parse(data).map(event => ({ id: event.id }))

    const response = await fetch(`${apiRoot}/events/posted`, {
      method: 'patch',
      headers: { 'Content-type': 'application/json', Accept: 'application/json', 'Accept-Charset': 'utf-8' },
      body: JSON.stringify({ events: publishedEvents })
    })

    if (response.status !== 204) {
      console.error(`Invalid response status ${response.status}.`)
      const json = await response.json()
      throw json.error
    }

    console.log('Events have been succesfully reported.')
  } catch (err) {
    console.error(err)
  }
})

fs.readFile('dist/.jobs-published.json', async (err, data) => {
  try {
    if (err) throw err

    const publishedJobs = JSON.parse(data).map(job => ({ id: job.id }))

    const response = await fetch(`${apiRoot}/jobs/posted`, {
      method: 'patch',
      headers: { 'Content-type': 'application/json', Accept: 'application/json', 'Accept-Charset': 'utf-8' },
      body: JSON.stringify({ jobs: publishedJobs })
    })

    if (response.status !== 204) {
      console.error(`Invalid response status ${response.status}.`)
      const json = await response.json()
      throw json.error
    }
    console.log('Job offers have been succesfully reported.')
  } catch (err) {
    console.error(err)
  }
})
