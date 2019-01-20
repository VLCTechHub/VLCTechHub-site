# VLCTechHub Site

A listing of the technical events and jobs in the Valencia area.

This PoC site is statically built with [Gatsby](https://www.gatsbyjs.org/) using the [VLCTechHub API](https://github.com/VLCTechHub/VLCTechHub-api) as its data source for the technical events and jobs.

## Development environment

Setting up a development environment to work on the site is pretty straightforward:

```
$ npm install
$ npm run develop
```

## Deployment

The site is currently published through [Surge](https://surge.sh) at [https://vlctechhub-gatsby.surge.sh](https://vlctechhub-gatsby.surge.sh).

You can build and deploy the site easily once you have configured your [Surge](https://surge.sh) account:

```
$ npm run build
$ npx surge --domain https://vlctechhub-gatsby.surge.sh public/
```
