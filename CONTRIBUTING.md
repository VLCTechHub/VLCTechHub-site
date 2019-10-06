# Questions

This is the https://vlctechhub.org website repository. If you have any question you can contact with the maintainer team in the slack https://slack.vlctechhub.org, in the channel #vlctechhub

# Bugs and functionality proposals

Do you think you found a bug or you have a new functionality to propose? Let us know!

## :bug: How to report a bug

1. Update to the most recent commit in master. It is possible the bug was already fixed.

2. Search for similar issues in the issues section, it is possible someone already reported the bug.

3. [Open an issue](https://github.com/VLCTechHub/VLCTechHub-site/issues/new). The more info you provide in the description, the easier will be to confirm it is actually a bug. That will let us act faster.

## :heavy_plus_sign: Proposing a new functionality

1. Provide a clear and detailed explanation of the functionality you would like to see implemented. Explain the reason why it is important. Bear in mind that we prefer functionalities that benefit the mayority of users instead of a small group of them.

2. After submiting the issue, it is possible that you try to[create a pull request](https://help.github.com/en/articles/creating-a-pull-request). If you can, start writing some code. There are always more more things to do than time to do them. If you can provide some code, it will make the process faster.

# 🚀 Building the website

VLCTechHub website is developed with the static side generator Metalsmith.

1. **Install yarn**

Yarn is a dependency manager in node. To install it, follow [its instructions](https://yarnpkg.com/en/docs/install).

2. **Clone this repository**

```sh
  git clone git@github.com:VLCTechHub/VLCTechHub-site.git
```

3. **Install dependencies with yarn**

Go into the newly created directory and install the dependencies.

```sh
  cd VLCTechHub-site/
  yarn install
```

4. **Build the site**

The command `build` constructs the site in the _dist_ directory.

```sh
  yarn run build
```

When the site is buld, VLCTechHub API is used. By default it uses the local API, that is, it expects the VLCTechHub api is running on `localhost:5000`.

In order to build the website in production mode, we need to properly set the environment variable `NODE_ENV` with the value `production`:

```sh
 NODE_ENV=production yarn run build
```

5. **Serve the website**

The website is already build! Now we need to run a webserver on the folder _dist_. One easy way is to use the Python one from the command line.

Con Python 2:

```sh
  cd dist/
  python -m SimpleHTTPServer 8080
```

Con Python 3:

```sh
  cd dist/
  python3 -m http.server 8080
```

Now the website is available at `http://localhost:8080`.

# :gift: Contributing with pull requests

We love pull requests! Here you have a brief guide about how to contribute:

1. Fork this repo

2. Introduce your changes following the syntax guidelines:

- Two spaces, no tabs
- Follow the conventions you already see in the code

3. Commit your changes

4. Pushe to your fork and create a pull request. Provide an explanation about why you have done those changes.

## 🎓 Learning MetalSmith and Nunjucks

Metalsmith documentation can be found in [its website](https://metalsmith.io).

The template sysmte used in this repo is [Nunjucks](https://mozilla.github.io/nunjucks/), a simple-yet-powerful template language developed by Mozilla.

Template hierarchies are based in an article about [component-oriented design patterns](https://css-tricks.com/component-led-design-patterns-nunjucks-grunt/) in Nunjucks.

## :woman_technologist: How to create a new page

In order to create a typical page in this repo we need two things: a template and some data to fill the template with. For example, every event page that you see in the built website are the data of one event with the template `templates/event.njk`.

If you are creating a new page, chances are the template you need to use already exists. In that case, you _just_ need to provide the data. The data will be often a markdown file with `.md` extension inside the folder `data`. Bear in mind that the strucutre and naming you choose for the files will determine the final url. It is also possible that the data is provided by a yaml file with extension `.yml` and used in a template.

If the template does not exists, create it inside the folder `templates` and then use it following the above description.

To add or modify css, javascript and/or images use the folder `assets`.
