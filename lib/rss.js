const Feed = require('feed').Feed;
const marked = require('marked');
const moment = require('moment');

module.exports = (options = {}) => {
  const {
    encoding,
    description,
    destination,
    collection,
    customTitleFn,
    pubDateAttributeName,
  } = {
    encoding: 'utf8',
    description: '',
    destination: 'feed.xml',
    collection: 'posts',
    customTitleFn: null,
    pubDateAttributeName: 'date',
    ...options
  }

  return function(files, metalsmith, done) {
    const metadata = metalsmith.metadata();
    const collectionItems = metadata.collections[collection];

    const feed = new Feed({
        title: 'VLCTechHub Feed',
        description,
        language: 'es',
        link: metadata.seo.ogUrl,
        generator: 'VLCTechHub'
      });

    collectionItems.forEach(item => {
      feed.addItem({
        title: customTitleFn? customTitleFn(item) : item.title,
        description: item.seo.ogDescription,
        content: marked(item.seo.ogDescription, { sanitize: true, smartLists: true }),
        id: metadata.seo.ogUrl + item.path,
        link: metadata.seo.ogUrl + item.path,
        date: new Date(item[pubDateAttributeName]),
      });
   })
    files[destination] = {
      contents: Buffer.from(feed.rss2()),
      encoding
    }

    return done();
  }
}
