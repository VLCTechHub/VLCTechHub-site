# VlcTechHub Client

VlcTechHub is a repository of technical events based in Valencia.
The site is divided in a backend project exposing an api written in ruby, and a frontend application written in javascript.

This is the repository for the frontend application. Backend application can be found at [VLCTechHub-api](https://github.com/VLCTechHub/VLCTechHub-api)

## Prerequisites

You will need the following things properly installed on your computer:

* [Git](http://git-scm.com/)
* [Node.js](http://nodejs.org/)
* [npm](https://www.npmjs.com/)


## Installation

* `git clone <repository-url>` this repository
* `cd VLCTechHub` change into the new directory
* `npm install -g bower` install bower
* `npm install -g ember-cli` install ember-cli
* `npm install`
* `bower install`

## Test

* `npm install -g phantomjs`
* `ember test` or `ember test --server` for liverload

## Running / Development

* `ember serve`
* Visit your app at [http://localhost:4200](http://localhost:4200).

__Note__: When run on linux, you might have a watch problem. You may need to [increment the number of files that can be watched by your user](https://discourse.roots.io/t/gulp-watch-error-on-ubuntu-14-04-solved/3453/2).

## Deploy

  Production runs on surge.sh server

 * `npm install -g surge`
 * `npm run deploy`

  To send a message to slack about the new release, set the environment variable `SLACK_VLCTECHHUB_TOKEN` with the Slack token. It will send the message to #vlctechhub channel.

## Further Reading / Useful Links

* [ember.js](http://emberjs.com/)
* [ember-cli](http://www.ember-cli.com/)
* Development Browser Extensions
  * [ember inspector for chrome](https://chrome.google.com/webstore/detail/ember-inspector/bmdblncegkenkacieihfhpjfppoconhi)
  * [ember inspector for firefox](https://addons.mozilla.org/en-US/firefox/addon/ember-inspector/)

--

[![Build Status](https://travis-ci.org/VLCTechHub/VLCTechHub.svg?branch=master)](https://travis-ci.org/VLCTechHub/VLCTechHub)


