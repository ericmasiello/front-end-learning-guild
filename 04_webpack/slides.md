# Webpack

---

## Agenda

1. Overview of front-end tooling
2. Webpack
3. Getting started
4. Webpack configuration
5. Environment builds
6. Plugins
7. Webpack Dev Server

---

## Overview of front-end tooling

--

### Why do we need front-end tooling?

* Minification (HTML, CSS, JS, images)
* Transpilation (SCSS => CSS, JSX => JS, etc.)
* Linting
* Bundling

Note:
Why do we create bundles?

--

### Popular front-end tools
* Grunt
* Gulp
* Browserify
* Webpack
* Rollup, SystemJS, & many, many more.

Note:
* Grunt popularized front-end tooling. Configuration based, lots of plugins available, etc. Brought a lot of maturity to the front-end tooling world
* Gulp offered much of the same but works off this notion of streams, where your data starts in one state and is translated via various tools into its final output without needing to save temporary intermediary data like Grunt
* Browserify was the first to say, let's bring the rich ecosystem of npm to the front end. Browserify enabled common JS (require syntax) on the front-end
* Webpack followed a similar model as Browserify but had a far more
robust plugin model. You could achieve with just webpack what would
have required both Browserify and Grunt/Gulp

--

### What about Babel?
* "Transpilier"
* Converts unsupported code into Javascript that's executable in the browser or Node environment
* Used alongside other tools like Webpack

---

## Webpack

* *It's just a bundler.*
* Creates a dependency graph via an entry point
* Define a bundle

`(entry.js => A.js => B.js & C.js) = bundle.js`

--

### Getting started

```
npm install -D webpack
```

--

### Webpack configuration

```js
const path = require('path');

module.exports = {
  // Here the application starts executing
  entry: './app/entry', 
  output: {
    // options related to how webpack emits results
    path: path.resolve(__dirname, 'dist'),
    filename: 'bundle.js',
  }
};
```
--

### Exercise

1. Go to `04_webpack/01_basic_bundling/`
2. Install Webpack
3. Create a configuration that will build the bundle
4. Open the `index.html` page to verify it works

**Hint:** Look at `index.html` first to determine where the bundle should live and what it should be called

--

### Understanding the bundle

TODO: https://webpack.js.org/concepts/manifest/

---

## Webpack: The Advanced Stuff

--

## What haven't we done yet?

1. No Transpilation
2. No Loaders
3. No Plugins
4. No Babel

--

--

### Loaders

--

### Babel

--

### Sourcemaps

How do I debug this crap?

--

### Plugins

* How do you build CSS?
* How do you build images?

--

---

## Webpack Dev Server

--

### Hot Module Replacement

---

## Custom environment based builds

`webpack --env=dev`
`webpack -p`

---

## Resources & Credits 📚

* [Webpack documentation](https://webpack.js.org/)

---

## Questions? 🙋🏾‍♀️ 🙆🏻‍♂️ 🙋🏻‍♀️

