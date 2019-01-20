const path = require('path')
const { exists, writeFile, ensureDir } = require('fs-extra')

const getRedirect = toPath => {
  let url = toPath.trim()

  const hasProtocol = url.includes('://')
  if (!hasProtocol) {
    const hasLeadingSlash = url.startsWith('/')
    if (!hasLeadingSlash) {
      url = `/${url}`
    }

    const resemblesFile = url.includes('.')
    if (!resemblesFile) {
      url = `${url}/`.replace(/\/\/+/g, '/')
    }
  }

  return `<!DOCTYPE html>
  <html lang="en">
    <meta property="og:title" content="VLCTechHub" />
    <meta property="og:description" content="VLCTechHub es el hub de eventos y empleo tecnológico en Valencia" />
    <meta name="twitter:card" content="summary" />
    <meta name="twitter:site" content="@vlctechhub" />
    <meta name="twitter:title" content="VLCTechHub" />
    <meta name="twitter:description" content="VLCTechHub es el hub de eventos y empleo tecnológico en Valencia" />
    <title>Redirecting&hellip;</title>
    <link rel="canonical" href="${url}">
    <script>location="${url}"</script>
    <meta http-equiv="refresh" content="0; url='${url}'">
    <meta name="robots" content="noindex">
    <h1>Redirecting&hellip;</h1>
    <a href="${url}">Click here if you are not redirected.</a>
  </html>`
}

const writeRedirectsFile = async (redirects, folder, pathPrefix) => {
  if (!redirects.length) return

  for (const redirect of redirects) {
    const { fromPath, toPath } = redirect

    const FILE_PATH = path.join(
      folder,
      fromPath.replace(pathPrefix, ''),
      'index.html'
    )

    const fileExists = await exists(FILE_PATH)
    if (!fileExists) {
      try {
        await ensureDir(path.dirname(FILE_PATH))
      } catch (err) {
        // ignore if the directory already exists;
      }

      const data = getRedirect(toPath)
      await writeFile(FILE_PATH, data)
    }
  }
}

exports.onPostBuild = ({ store }) => {
  const { redirects, program, config } = store.getState()

  let pathPrefix = ''
  if (program.prefixPaths) {
    pathPrefix = config.pathPrefix
  }

  const folder = path.join(program.directory, 'public')
  return writeRedirectsFile(redirects, folder, pathPrefix)
}
